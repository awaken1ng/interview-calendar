import styled from 'styled-components';

import { pallete, MaxWidth } from '../styles';


interface Props {
  // workaround for
  // > Type '{ children: never[]; onPrevWeekClick: () => void; onNextWeekClick: () => void; }' is not assignable to type 'IntrinsicAttributes & Props'.
  // > Property 'children' does not exist on type 'IntrinsicAttributes & Props'.
  children?: React.ReactNode
  onAddClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function Topbar(props: Props) {
  return (
    <Container>
      <Header>Interview Calendar</Header>
      <Button onClick={props.onAddClick}>+</Button>
    </Container>
  )
}


const Container = styled(MaxWidth)`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.header`
  margin: 3rem 2rem;
`;

const Button = styled.div`
  color: ${pallete.red};
  padding: 3rem 2rem;
  user-select: none;
`;
