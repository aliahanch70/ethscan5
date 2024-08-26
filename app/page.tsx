'use client';
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

import { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: "gas fee",
//   description: "This is Home Blog page for TailAdmin Next.js",
//   // other metadata
// };

export default function Home() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('/api/getData')
  //     .then(response => response.json())
  //     .then(data => setData(data));
  //     console.log(data)
  // }, []);
  // console.log(data.map(x=>x._id));
  return (
    <>
    
    {/* <ul>
        {data.map(x => (
          <li >{x._id}</li>
        ))}
      </ul> */}
      <ECommerce />
    </>
  );
}
