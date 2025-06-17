export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=${symbol}&sparkline=true`,
            {
                headers: {
                    accept: 'application/json',
                    "x-cg-demo-api-key": "CG-oFqPdG5gu2i7yRumGWqakQLA", // Ganti dengan API key kamu
                },
            }
        );
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}