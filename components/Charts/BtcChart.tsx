'use client';

import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Card, SparkAreaChart } from '@tremor/react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BtcChart({
  chartData,
  lastPrice: initialLastPrice,
  priceChange24h: initialPriceChange24h,
}: {
  chartData: { date: string; price: number }[];
  lastPrice: number;
  priceChange24h: number;
}) {
  const { data: latestPriceData } = useSWR('https://api.kraken.com/0/public/Ticker?pair=BTCUSD', fetcher, {
    refreshInterval: 5000, // Re-fetch every 5 seconds
    fallbackData: { result: { XXBTZUSD: { c: [initialLastPrice.toString()] } } },
  });

  const [priceClass, setPriceClass] = useState('');

  const latestLastPrice = parseFloat(latestPriceData?.result?.XXBTZUSD?.c[0] || '0').toFixed(2);

  useEffect(() => {
    // Parse latestLastPrice as a number
    const latestPriceNumber = parseFloat(latestLastPrice);

    if (latestPriceNumber !== initialLastPrice) {
      setPriceClass(latestPriceNumber > initialLastPrice ? 'price-up' : 'price-down');
      setTimeout(() => setPriceClass(''), 500);
    }
  }, [latestLastPrice, initialLastPrice]);
  

  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">
      <div className="flex items-center space-x-2.5">
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">BTC</p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Bitcoin</span>
      </div>
      <SparkAreaChart
        data={chartData}
        categories={['price']}
        index={'date'}
        colors={['emerald']}
        className="h-8 w-20 sm:h-10 sm:w-36"
      />
      <div className="flex items-center space-x-2.5">
        <span className={`font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong ${priceClass}`}>
          ${latestLastPrice}
        </span>
        <span className={`rounded px-2 py-1 text-tremor-default font-medium text-white ${initialPriceChange24h >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}>
          {initialPriceChange24h >= 0 ? '+' : ''}{initialPriceChange24h.toFixed(2)}%
        </span>
      </div>
    </Card>
  );
}
