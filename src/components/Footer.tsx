import styled from 'styled-components';

import { pallete, MaxWidth } from '../styles';


interface Props {
  // workaround for
  // > Type '{ children: never[]; onPrevWeekClick: () => void; onNextWeekClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.
  // > Property 'children' does not exist on type 'IntrinsicAttributes & Props'.
  children?: React.ReactNode
  onTodayClick?: React.MouseEventHandler<HTMLDivElement>,
  onDeleteClick?: React.MouseEventHandler<HTMLDivElement>,
}

export default function Footer(props: Props) {
  return (
    <Container>
      <Button onClick={props.onTodayClick}>Today</Button>
      <Button onClick={props.onDeleteClick}>Delete</Button>
    </Container>
  )
}


export const HEIGHT = '6rem';

const Container = styled(MaxWidth)`
  // sticky to the bottom
  position: fixed;
  bottom: 0;
  height: ${HEIGHT};

  display: flex;
  justify-content: space-between;
  background-color: ${pallete.background};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  color: ${pallete.red};
  padding: 0 2rem;
  user-select: none;
`;
