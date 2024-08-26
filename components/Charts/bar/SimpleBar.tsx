'use client';

import { useState, useEffect } from 'react';
import { BarChart, Card, Subtitle, Title } from "@tremor/react";

// Define the structure of your data
interface GasData {
  date: string;
  pgas: string;
}

interface ChartData {
  date: string;
  "Average Pgas": string;
}

// Fetch gas data from the API
const fetchGasData = async (): Promise<GasData[]> => {
  try {
    const response = await fetch('/api/getData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gas data:', error);
    return [];
  }
};

// Calculate average pgas per date
const calculateAveragePgasPerDate = (data: GasData[]): ChartData[] => {
  const datePgasMap: { [key: string]: { total: number; count: number } } = {};

  data.forEach(item => {
    const { date, pgas } = item;
    if (!datePgasMap[date]) {
      datePgasMap[date] = { total: 0, count: 0 };
    }
    datePgasMap[date].total += parseFloat(pgas); // Ensure pgas is a number
    datePgasMap[date].count += 1;
  });

  const chartData: ChartData[] = Object.keys(datePgasMap).map(date => ({
    date,
    "Average Pgas": (datePgasMap[date].total / datePgasMap[date].count).toFixed(2)
  }));

  return chartData;
};

// Value formatter for the chart
const valueFormatter = (number: number) => 
  new Intl.NumberFormat("us").format(number).toString();

// Main component
const SimpleBar = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const gasData = await fetchGasData();
      const processedData = calculateAveragePgasPerDate(gasData);
      setChartData(processedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <Title>Average Pgas per Date</Title>
      <Subtitle>Displaying the average Pgas for each date.</Subtitle>
      {isLoading ? (
        <p>Loading...</p>
      ) : chartData.length > 0 ? (
        <BarChart
          className="mt-6"
          data={chartData}
          index="date"
          categories={["Average Pgas"]}
          colors={["blue"]}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
      ) : (
        <p>No data available</p>
      )}
    </Card>
  );
};

export default SimpleBar;
