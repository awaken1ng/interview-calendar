import styled from 'styled-components';

import { pallete, EightColumnGrid } from '../styles';
import { HEIGHT as FOOTER_HEIGHT } from './Footer';

export default function Timeline() {
  // 8 columns (1 for time, 7 for days), 24 rows (for each hour)
  const grid = [];
  for (let index = 0; index < 8 * 24; index++) {
    const isDay = index % 8;
    const isMidnight = index === 0;
    const isLastRow = index > 8 * 23;
    const isWeekEnd = index % 8 === 7;

    if (!isDay) {
      // since we're aligning hour to the grid line,
      // 0:00 would end up out of grid bounds
      if (isMidnight) continue;

      const hour = (index / 8).toString().padStart(2, "0") + ":00";
      grid.push(<Hour key={index}>{hour}</Hour>);
    } else {
      const style: React.CSSProperties = {};
      if (!isLastRow) style.borderBottom = `0.2rem solid ${pallete.border}`;
      if (!isWeekEnd) style.borderRight = `0.2rem solid ${pallete.border}`;

      grid.push(<Day key={index} style={style}></Day>);
    }
  }

  return (
    <Container>
      {grid}
    </Container>
  )
}


const Container = styled(EightColumnGrid)`
  margin-bottom: ${FOOTER_HEIGHT};
`;

const Hour = styled.div`
  display: inline;
  color: #9f9f9f;
  font-size: 85%;
  // align with the grid lines
  margin-top: -1.2rem;

`;

const Day = styled.div`
  height: 4rem;

  // we skipped 0:00, so first cell is empty, start laying out days from second cell
  &:nth-child(1) {
    grid-column: 2 / 3;
  }
`;
