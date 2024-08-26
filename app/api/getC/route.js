import axios from 'axios';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const assetIdBase = searchParams.get('asset_id_base');

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://rest.coinapi.io/v1/exchangerate/${assetIdBase}`,
      headers: {
        'Accept': 'text/plain',
        'X-CoinAPI-Key': '54A5EFF1-CBE1-4C4F-889E-915C0FFE45E3',
      },
    };

    const response = await axios(config);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), { status: 500 });
  }
}

// If you want to handle other HTTP methods, such as POST, you can define it similarly:
// export async function POST(req) {
//   return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
// }
