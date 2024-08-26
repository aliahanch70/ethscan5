import { useState, useEffect } from 'react';
import { AreaChart, Card, Title } from '@tremor/react';

const Home = () => {
  const [chartData, setChartData] = useState([]);
  const [dataPoints, setDataPoints] = useState(100); // State for number of data points

  const fetchData = () => {
    fetch('/api/getData')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((item: any) => ({
          date: item.time,
          FastGasPrice: parseFloat(item.fgas),
          SafeGasPrice: parseFloat(item.lgas),
        }));
        setChartData(formattedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const valueFormatter = (number: any )=> {
    return new Intl.NumberFormat('us').format(number).toString();
  };

  const handleDataPointsChange = (event: any) => {
    setDataPoints(parseInt(event.target.value, 10));
  };

  // Filter the chart data based on the selected number of data points
  const displayedData = chartData.slice(-dataPoints);

  return (
    <Card>
      <Title>Gas Prices Over Time</Title>
      <div className="flex justify-between items-center">
        <label htmlFor="dataPoints" className="mr-2">Show:</label>
        <select
          id="dataPoints"
          value={dataPoints}
          onChange={handleDataPointsChange}
          className="p-2 border border-gray-300 rounded text-black	"
        >
          <option value={100}>Last 100 Data Points</option>
          <option value={200}>Last 200 Data Points</option>
        </select>
      </div>
      <AreaChart
        className="mt-4 h-72"
        data={displayedData}
        index="date"
        categories={['FastGasPrice', 'SafeGasPrice']}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
};

export default Home;
