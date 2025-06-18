export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const symbol = searchParams.get("symbol");
  try {
    const res = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "f19e10c4-b75f-436a-85fd-40f4855775de", // Ganti dengan API key kamu
        },
      }
    );
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
