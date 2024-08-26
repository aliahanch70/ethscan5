
import BtcChart from '@/components/Charts/BtcChart'; // Import Client Component

async function getHistoricalData() {
  const response = await fetch('https://api.mobula.io/api/1/market/history?asset=Bitcoin');
  const result = await response.json();
  return result.data.price_history;
}

async function getPriceChange() {
  const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=BTCUSD');
  const result = await response.json();
  return parseFloat(result.result.XXBTZUSD.c[0]);
}

async function getPriceChange24h() {
  const response = await fetch('https://api.mobula.io/api/1/market/data?asset=Bitcoin');
  const result = await response.json();
  return result.data.price_change_24h;
}

export default async function Page() {
  const [historicalData, priceChange24h, lastPrice] = await Promise.all([
    getHistoricalData(),
    getPriceChange24h(),
    getPriceChange(),
  ]);

  // Process and filter history data to include only the last 6 weeks
  const currentTime = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const chartData = [];

  for (let i = 0; i < 6; i++) {
    const weekStart = currentTime - (i + 1) * oneWeek;
    const weekEnd = currentTime - i * oneWeek;

    const weekPrices = historicalData.filter(
      (item: [number, number]) => item[0] >= weekStart && item[0] < weekEnd
    );

    if (weekPrices.length > 0) {
      const lastPriceOfWeek = weekPrices[weekPrices.length - 1][1];
      chartData.unshift({
        date: new Date(weekEnd).toISOString().split('T')[0],
        price: lastPriceOfWeek,
      });
    }
  }

  return (
    <div>
      <BtcChart chartData={chartData} lastPrice={lastPrice} priceChange24h={priceChange24h} />
    </div>
  );
}
