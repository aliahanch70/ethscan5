// app/api/btc/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  const myHeaders = new Headers();
  myHeaders.append("X-Dune-Api-Key", "V0SRCXM2Jo7FfXUEjPaSpJiopwfhrh47");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(
      "https://api.dune.com/api/v1/query/3997402/results?limit=1000",
      requestOptions
    );
    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data', details: error.message });
  }
}
