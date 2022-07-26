import { useState } from 'react';
import styled from 'styled-components';
import { addWeeks, subWeeks, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru'

import Topbar from './components/Topbar';
import WeekSwitcher from './components/WeekSwitcher';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

export type Events = Set<string>; // YYYY/M/D@H

export const locale = ru;
export const dateToKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // `getMonth` is 0-based
  const day = date.getDate();
  const hour = date.getHours();

  return `${year}/${month}/${day}@${hour}`
};

export default function App() {
  const demoEvent1 = new Date();
  demoEvent1.setHours(1);
  const demoEvent2 = new Date();
  demoEvent2.setHours(2);
  const demoEvents = [dateToKey(demoEvent1), dateToKey(demoEvent2)];

  let [weekSelected, setSelectedWeek] = useState(new Date());
  let [dayHourSelected, setSelectedDayHour] = useState<Date | undefined>(undefined);
  let [events, setEvents] = useState(new Set<string>(demoEvents));

  const onAddClick = () => {
    const input = prompt("Enter event time: YYYY-MM-DD HH:mm:ss");
    if (!input) return;

    const date = parseISO(input);
    if (isNaN(date.valueOf())) {
      alert('Invalid date');
      return;
    }

    const key = dateToKey(date);
    if (events.has(key)) {
      alert(`Hour is already scheduled`)
      return;
    }

    const response = window.confirm(`Create an event at ${date}?`);
    if (!response) return;

    setEvents((prev) => new Set(prev.add(key)));
  };
  const onPrevWeekClick = () => setSelectedWeek(subWeeks(weekSelected, 1));
  const onNextWeekClick = () => setSelectedWeek(addWeeks(weekSelected, 1));
  const onTodayClick = () => setSelectedWeek(new Date());
  const onDeleteClick = () => {
    // delete selected event, if there's one
    if (!dayHourSelected) return
    if (!window.confirm(`Delete event at ${dayHourSelected}?`)) return
    const key = dateToKey(dayHourSelected);
    events.delete(key);
    setSelectedDayHour(undefined);
  };
  const onDayClick = (date: Date) => {
    // update selection
    const key = dateToKey(date);
    if (events.has(key)) {
      setSelectedDayHour(date);
    } else {
      setSelectedDayHour(undefined);
    }
  };

  return (
    <Container>
      <Topbar
        onAddClick={onAddClick}
      >
        <WeekSwitcher
          weekSelected={weekSelected}
          onPrevWeekClick={onPrevWeekClick}
          onNextWeekClick={onNextWeekClick}
        >
        </WeekSwitcher>
      </Topbar>

      <Timeline
        weekSelected={weekSelected}
        dayHourSelected={dayHourSelected}
        events={events}
        onDayClick={onDayClick}
      >
      </Timeline>

      <Footer
        isEventSelected={dayHourSelected !== undefined}
        onTodayClick={onTodayClick}
        onDeleteClick={onDeleteClick}
      >
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  font-size: 1.7rem;
  color: black;
  background-color: white;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
