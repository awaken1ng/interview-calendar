import styled from 'styled-components';

import { pallete, MaxWidth } from '../styles';


interface Props {
  children?: React.ReactNode
  onAddClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function Topbar({ onAddClick, children }: Props) {
  return (
    <Sticky>
      <SpaceBetween>
        <Header>Interview Calendar</Header>
        <Button onClick={onAddClick}>+</Button>
      </SpaceBetween>
      {children}
    </Sticky>
  )
}

const Sticky = styled(MaxWidth)`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;

  // lift up the topbar so it's above the timeline
  // also requires setting a background,
  // since it's transparent otherwise
  z-index: 1;
  background-color: white;
`;

const SpaceBetween = styled(MaxWidth)`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.header`
  margin: 2.5rem 2rem;
`;

const Button = styled.div`
  color: ${pallete.red};
  padding: 2.5rem 2rem;
  user-select: none;

  &:hover, &:active {
    background-color: ${pallete.background};
  }
`;
