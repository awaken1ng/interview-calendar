import { pallete, EightColumnGrid } from '../styles';


export default function Timeline() {
  // 8 columns (1 for time, 7 for days), 24 rows (for each hour)
  const hours = [];
  for (let index = 0; index < 8 * 24; index++) {
    const isDay = index % 8;
    const isMidnight = index === 0;
    const isFirstHour = index === 1;
    const isLastRow = index > 8 * 23;
    const isWeekEnd = index % 8 === 7;

    if (isDay) {
      const style: React.CSSProperties = {
        height: '4rem',
      };
      if (isFirstHour) style.gridColumn = '2 / 3';
      if (!isLastRow) style.borderBottom = `0.2rem solid ${pallete.border}`;
      if (!isWeekEnd) style.borderRight = `0.2rem solid ${pallete.border}`;

      hours.push(<div key={index} style={style}></div>);
    } else {
      const style: React.CSSProperties = {
        color: '#9f9f9f',
        display: 'inline',
        marginTop: '-1.2rem',
        fontSize: '85%',
      };
      if (isMidnight) continue;

      const hour = (index / 8).toString().padStart(2, "0") + ":00";
      hours.push(<div key={index} style={style}>{hour}</div>);
    }
  }

  return (
    <EightColumnGrid>
      {hours}
    </EightColumnGrid>
  )
}
