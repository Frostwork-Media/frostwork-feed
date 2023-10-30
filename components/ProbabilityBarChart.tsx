"use client";

import { BarChart } from "@tremor/react";

export function ProbabilityBarChart({
  chartData,
}: {
  chartData: { name: string; probability: number }[];
}) {
  const longestOptionNameLength = chartData.reduce((acc, option) => {
    if (option.name.length > acc) return option.name.length;
    return acc;
  }, 0);

  const layout = longestOptionNameLength > 35 ? "vertical" : "horizontal";

  return (
    <BarChart
      data={chartData}
      index="name"
      categories={["probability"]}
      colors={["slate"]}
      valueFormatter={valueFormatter}
      showLegend={false}
      layout={layout}
      showGridLines
      autoMinValue={false}
      minValue={0}
      yAxisWidth={layout === "vertical" ? 200 : 35}
    />
  );
}

/**
 * Converts decimal to percentage
 */
function valueFormatter(number: number) {
  return `${number * 100}%`;
}
