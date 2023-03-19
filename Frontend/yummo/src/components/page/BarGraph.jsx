import React from 'react';

const BarGraph = ({ data }) => {
  const maxValue = Math.max(...data);
  const barWidth = 20;
  const chartHeight = 100;
  
  const bars = data.map((value, index) => {
    const barHeight = value / maxValue * chartHeight;
    const x = index * (barWidth + 10);
    const y = chartHeight - barHeight;
    return (
      <rect
        key={index}
        x={x}
        y={y}
        width={barWidth}
        height={barHeight}
        fill="#00AEB2"
      />
    );
  });

  return (
    <svg viewBox={`0 0 ${data.length * (barWidth + 20)} ${chartHeight}`}>
      {bars}
    </svg>
  );
};

export default BarGraph;
