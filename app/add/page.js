'use client';

import { useState, useEffect } from 'react';

export default function Add() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [lgas, setLgas] = useState('');
  const [fgas, setFgas] = useState('');
  const [pgas, setPgas] = useState('');
  const [seconds, setSeconds] = useState(60); // Initialize countdown timer

  const fetchData = () => {
    fetch('https://api.etherscan.io/api' +
        '?module=gastracker' +
        '&action=gasoracle' +
        '&apikey=ZZIEIMYMJSYSQADP3VGXPA3JGY7QE5PT2F')
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLgas(data.result.SafeGasPrice);
            setFgas(data.result.FastGasPrice);
            setPgas(data.result.ProposeGasPrice);
            
            setLoading(false);
            console.log(data.result);
            setSeconds(60); // Reset countdown after data fetch
        })
        .catch((error) => {
            console.error('Error fetching gas prices:', error);
            setLoading(false);
        });
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 10000); // 10000 ms = 10 sec minut

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 60);
    }, 1000); // 1000 ms = 1 second

    return () => clearInterval(countdown); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (lgas && fgas && pgas) {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
      const year = currentDate.getFullYear();
      const formattedDate = `${year}/${month}/${day}`;
      
      fetch('/api/addDataAuto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lgas, fgas, pgas, time: formattedTime, date: formattedDate }),
      })
      .then((response) => response.json())
      .then((result) => {
        console.log('Data sent successfully:', result);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
    } else {
      console.log('lgas, fgas, or pgas is empty, not sending data');
    }
  }, [lgas, fgas, pgas]);

  return (
    <div>
      <h1>Add Data to MongoDB</h1>
      {isLoading ? <p>Loading...</p> : <p>Data loaded</p>}
      <p>Next update in: {seconds} seconds</p>
    </div>
  );
}
