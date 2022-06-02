import styled from 'styled-components';

import Topbar from './components/Topbar';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import WeekSwitcher from './components/WeekSwitcher';

export default function App() {
  const onAddClick = () => console.log('add');
  const onPrevWeekClick = () => console.log('prev');
  const onNextWeekClick = () => console.log('next');
  const onTodayClick = () => console.log('today');
  const onDeleteClick = () => console.log('delete');

  return (
    <Container>
      <Topbar onAddClick={onAddClick}></Topbar>

      <WeekSwitcher
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
