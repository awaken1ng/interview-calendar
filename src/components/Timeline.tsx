import styled from 'styled-components';
import { addDays, getISODay, startOfWeek } from 'date-fns';

import { pallete, EightColumnGrid } from '../styles';
import { Events, locale, dateToKey } from '../App';

interface Props {
  // workaround for
  // > Type '{ children: never[]; onPrevWeekClick: () => void; onNextWeekClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.
  // > Property 'children' does not exist on type 'IntrinsicAttributes & Props'.
  children?: React.ReactNode;
  weekSelected: Date;
  dayHourSelected?: Date;
  events: Events;
  onDayClick(date: Date): void;
}

export default function Timeline({ weekSelected, dayHourSelected, events, onDayClick }: Props) {
  const indexToDateAndTime = (index: number) => {
    const clickedDayOfWeekNmber = index % 8;
    const offset = clickedDayOfWeekNmber - getISODay(weekSelected);
    let date = addDays(weekSelected, offset);

    const clickedHour = Math.floor(index / 8);
    date.setHours(clickedHour);

    return date;
  };

  const weekStart = startOfWeek(weekSelected, { locale });
  let dateSelectedKey = undefined;
  if (dayHourSelected) dateSelectedKey = dateToKey(dayHourSelected);

  // 8 columns (1 for time, 7 for days), 24 rows (for each hour)
  const grid = [];
  for (let index = 0; index < 8 * 24; index++) {
    const hour = Math.floor(index / 8);
    const dayOfWeek = index % 8;
    const isDay = dayOfWeek !== 0;
    const isMidnight = index === 0;
    const isLastRow = index > 8 * 23;
    const isWeekEnd = index % 8 === 7;

    if (!isDay) {
      // since we're aligning hour to the grid line,
      // 0:00 would end up out of grid bounds
      if (isMidnight) continue;

      const hhmm = hour.toString().padStart(2, "0") + ":00";
      grid.push(<Hour key={index}>{hhmm}</Hour>);
    } else {
      const style: React.CSSProperties = {};
      if (!isLastRow) style.borderBottom = `0.2rem solid ${pallete.border}`;
      if (!isWeekEnd) style.borderRight = `0.2rem solid ${pallete.border}`;

      const props = {
        key: index,
        style,
        onClick: () => onDayClick(indexToDateAndTime(index))
      }

      const date = addDays(weekStart, dayOfWeek - 1);
      date.setHours(hour);
      const key = dateToKey(date);
      const isSelected = key === dateSelectedKey;
      const isScheduled = events.has(key);

      if (isSelected) {
        grid.push(<SelectedDay {...props}></SelectedDay>)
      } else if (isScheduled) {
        grid.push(<ScheduledDay {...props}></ScheduledDay>)
      } else {
        grid.push(<Day {...props}></Day>);
      }
    }
  }

  return (
    <EightColumnGrid>
      {grid}
    </EightColumnGrid>
  )
}


const Hour = styled.div`
  display: inline;
  color: #9f9f9f;
  font-size: 85%;

  // align with the grid lines
  margin-top: -1.2rem;
`;

const Day = styled.div`
  position: relative;
  height: 4rem;

  // we skipped 0:00, so first cell is empty, start laying out days from second cell
  &:nth-child(1) {
    grid-column: 2 / 3;
  }

  // hack to get an inner border inside the cell
  &:nth-child(n+1):hover::before,
  &:nth-child(n+1):active::before {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: calc(100% - 0.2rem * 2);
    height: calc(100% - 0.2rem * 2);
    background-color: ${pallete.background};
  }
`;

const ScheduledDay = styled(Day)`
  &::before {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: calc(100% - 0.2rem * 2);
    height: calc(100% - 0.2rem * 2);
    background-color: #ebecff;
  }

  &:nth-child(n+1):hover::before,
  &:nth-child(n+1):active::before {
    background-color: #b3b7ff;
  }
`;

const SelectedDay = styled(Day)`
  &::before,
  &:nth-child(n+1):hover::before,
  &:nth-child(n+1):active::before {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: calc(100% - 0.2rem * 2);
    height: calc(100% - 0.2rem * 2);
    background-color: #b3b7ff;
  }
`;
