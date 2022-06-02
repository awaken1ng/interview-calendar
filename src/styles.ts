import styled from 'styled-components';

export const pallete = {
  red: '#ff3131',
  background: '#f6f6f6',
  border: '#ebebeb',
}

const MAX_WIDTH = 740;
export const MaxWidth = styled.div`
  @media (max-width: ${MAX_WIDTH - 1}px) {
    width: 100%;
  }
  @media (min-width: ${MAX_WIDTH}px) {
    width: ${MAX_WIDTH}px;
  }
`;

export const EightColumnGrid = styled(MaxWidth)`
  display: grid;
  // first column for time on the timeline
  // the other 7 columns for each day of the week
  grid-template-columns: repeat(8, 1fr);
`;
