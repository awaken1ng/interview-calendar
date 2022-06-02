import styled from 'styled-components';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import ru from 'date-fns/locale/ru'

import { pallete, EightColumnGrid } from '../styles';


function daysOfCurentWeek() {
  const now = new Date();
  const options = { locale: ru };
  const weekStart = startOfWeek(now, options);
  const weekEnd = endOfWeek(now, options);
  return eachDayOfInterval({ start: weekStart, end: weekEnd });
}

interface Props {
  // workaround for
  // > Type '{ children: never[]; onPrevWeekClick: () => void; onNextWeekClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.
  // > Property 'children' does not exist on type 'IntrinsicAttributes & Props'.
  children?: React.ReactNode
  onPrevWeekClick?: React.MouseEventHandler<HTMLDivElement>,
  onNextWeekClick?: React.MouseEventHandler<HTMLDivElement>,
}

export default function WeekSwitcher(props: Props) {
  const now = new Date();
  const week = daysOfCurentWeek();

  const weekDays = week
    .map((date, index) => {
      const dayOfWeekNumber = format(date, 'i');
      const dayOfWeekSingleLetter = format(date, 'EEEEE');
      const style: React.CSSProperties = {};

      // skip the first column and lay out from second column
      if (index === 0) style.gridColumn = '2 / 3';

      return <DayOfWeek key={dayOfWeekNumber} style={style}>
        {dayOfWeekSingleLetter}
      </DayOfWeek>
    });

  const weekDates = week
    .map((date, index) => {
      let dayOfMonth = format(date, 'd');

      let day;
      if (isSameDay(now, date)) {
        day = <Today>{dayOfMonth}</Today>;
      } else {
        day = <Day>{dayOfMonth}</Day>;
      }

      const style: React.CSSProperties = {};
      if (index === 0) style.gridColumn = '2 / 3';

      return <div key={dayOfMonth} style={style}>
        {day}
      </div>
    })

  return (
    <Container>
        {weekDays}

        {weekDates}

        {/* skip first column */}
        <Button onClick={props.onPrevWeekClick} style={{gridColumn: '2 / 3'}}>‹</Button>
        <MonthYear>
          {format(now, 'LLLL yyyy')}
        </MonthYear>
        <Button onClick={props.onNextWeekClick}>›</Button>
      </Container>
  )
}


const Container = styled(EightColumnGrid)`
  background-color: ${pallete.background};

  // avoid border on left and right
  // otherwise we have horizontal overflow
  border-top-width: 0.2rem;
  border-bottom-width: 0.2rem;
  border-left-width: 0;
  border-right-width: 0;
  border-style: solid;
  border-color: ${pallete.border};

  grid-template-rows: repeat(3, 3rem);
`;

const DayOfWeek = styled.div`
  font-size: 62%;
  font-weight: 600;

  // center
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Day = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Today = styled.div`
  // make the element squared
  // so that the border-radius isn't squished
  display: inline-flex;
  height: 100%;
  aspect-ratio: 1;

  // center
  justify-content: center;
  align-items: center;

  border-radius: 100%;
  background-color: ${pallete.red};
  color: white;
`;

const Button = styled.div`
  // center
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${pallete.red};
  user-select: none;
`;

const MonthYear = styled.div`
  grid-column: span 5;
  font-size: 85%;
  display: grid;
  align-content: center;
`;
