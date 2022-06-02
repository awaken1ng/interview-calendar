import { useState } from 'react';
import styled from 'styled-components';
import { addWeeks, subWeeks } from 'date-fns';

import Topbar from './components/Topbar';
import WeekSwitcher from './components/WeekSwitcher';
import Timeline from './components/Timeline';
import Footer from './components/Footer';


export default function App() {
  let [selectedWeek, setSelectedWeek] = useState(new Date());

  const onAddClick = () => console.log('add');
  const onPrevWeekClick = () => setSelectedWeek(subWeeks(selectedWeek, 1));
  const onNextWeekClick = () => setSelectedWeek(addWeeks(selectedWeek, 1));
  const onTodayClick = () => setSelectedWeek(new Date());
  const onDeleteClick = () => console.log('delete');

  return (
    <Container>
      <Topbar onAddClick={onAddClick}></Topbar>

      <WeekSwitcher
        selectedWeek={selectedWeek}
        onPrevWeekClick={onPrevWeekClick}
        onNextWeekClick={onNextWeekClick}
      >
      </WeekSwitcher>

      <Timeline></Timeline>

      <Footer
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
