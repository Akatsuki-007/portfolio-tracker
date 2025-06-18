"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CoinDetailPage = () => {
  const params = useParams();
  const [coinInfo, setCoinInfo] = useState<any>(null);
  const [coinPrice, setCoinPrice] = useState<any>(null);
  //   const [sparklineData, setSparklineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch coin info
        const infoRes = await fetch(`/api/info?symbol=${params.coint}`);
        const infoData = await infoRes.json();
        console.log("Info data:", infoData);

        if (infoData.error) {
          throw new Error(infoData.error);
        }
        setCoinInfo(infoData.data);

        // Fetch coin price
        const priceRes = await fetch(`/api/price?symbol=${params.coint}`);
        const priceData = await priceRes.json();
        console.log("Price data:", priceData);

        if (priceData.error) {
          throw new Error(priceData.error);
        }
        setCoinPrice(priceData.data);

        // Fetch sparkline data (optional)
        // try {
        //   const sparklineRes = await fetch(
        //     `/api/sparkline?symbol=${params.coint}`
        //   );
        //   const sparklineData = await sparklineRes.json();
        //   console.log("Sparkline data:", sparklineData);
        // //   setSparklineData(sparklineData);
        // } catch (sparklineError) {
        //   console.warn("Sparkline data not available:", sparklineError);
        // }
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch coin data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.coint) {
      fetchCoinData();
    }
  }, [params.coint]);
  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!coinInfo || !coinPrice) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">No data available</div>
        </div>
      </div>
    );
  }

  const coinInfoData = coinInfo ? (Object.values(coinInfo)[0] as any) : null;
  const coinPriceData = coinPrice
    ? (Object.values(coinPrice)[0] as any)?.[0]
    : null;
  console.log("show all data", coinInfoData, coinPriceData);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        {" "}
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinInfoData?.id}.png`}
          alt={coinInfoData?.name}
          className="w-16 h-16 mr-4"
        />
        <div>
          {" "}
          <h1 className="text-3xl font-bold">
            {coinInfoData?.name} ({coinInfoData?.symbol})
          </h1>
          <p className="text-xl">
            ${coinPriceData?.quote?.USD?.price?.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {" "}
        <div>
          <h2 className="text-xl font-semibold">Price Change (24h)</h2>{" "}
          <p
            className={
              coinPriceData?.quote?.USD?.percent_change_24h > 0
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {coinPriceData?.quote?.USD?.percent_change_24h?.toFixed(2)}%
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Market Cap</h2>
          <p>${coinPriceData?.quote?.USD?.market_cap?.toLocaleString()}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Volume (24h)</h2>
          <p>${coinPriceData?.quote?.USD?.volume_24h?.toLocaleString()}</p>
        </div>{" "}
        <div>
          <h2 className="text-xl font-semibold">Circulating Supply</h2>
          <p>
            {coinPriceData?.circulating_supply?.toLocaleString()}{" "}
            {coinInfoData?.symbol}
          </p>
        </div>
      </div>
      {/* <div> */}
      {/* <h2 className="text-xl font-semibold mb-2">Price Chart (7d)</h2> */}
      {/* <SparkLineChart
          data={sparkline.quote.USD.sparkline}
          categories={["price"]}
          index={"timestamp"}
          colors={["blue"]}
          className="h-40"
        /> */}
      {/* </div> */}

      {/* Description and Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Description */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">
              About {coinInfoData?.name}
            </h2>
            <div className="space-y-4">
              {coinInfoData?.description && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {coinInfoData.description}
                  </p>
                </div>
              )}

              {/* Key Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Category
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {coinInfoData?.category || "Cryptocurrency"}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Launch Date
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {coinInfoData?.date_added
                      ? new Date(coinInfoData.date_added).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                {coinInfoData?.tags && coinInfoData.tags.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg sm:col-span-2">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {coinInfoData.tags
                        .slice(0, 10)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
            <div className="space-y-4">
              <div className="border-b dark:border-gray-700 pb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Symbol
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {coinInfoData?.symbol}
                </p>
              </div>

              <div className="border-b dark:border-gray-700 pb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Rank
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  #{coinPriceData?.cmc_rank || "N/A"}
                </p>
              </div>

              <div className="border-b dark:border-gray-700 pb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Max Supply
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {coinPriceData?.max_supply
                    ? coinPriceData.max_supply.toLocaleString() +
                      " " +
                      coinInfoData?.symbol
                    : "Unlimited"}
                </p>
              </div>

              <div className="border-b dark:border-gray-700 pb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Total Supply
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {coinPriceData?.total_supply
                    ? coinPriceData.total_supply.toLocaleString() +
                      " " +
                      coinInfoData?.symbol
                    : "N/A"}
                </p>
              </div>

              <div className="border-b dark:border-gray-700 pb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Last Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {coinPriceData?.last_updated
                    ? new Date(coinPriceData.last_updated).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Price Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              1 Hour
            </h3>
            <p
              className={`text-lg font-bold ${
                coinPriceData?.quote?.USD?.percent_change_1h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coinPriceData?.quote?.USD?.percent_change_1h?.toFixed(2) || "0.00"}%
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              7 Days
            </h3>
            <p
              className={`text-lg font-bold ${
                coinPriceData?.quote?.USD?.percent_change_7d > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coinPriceData?.quote?.USD?.percent_change_7d?.toFixed(2) || "0.00"}%
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              30 Days
            </h3>
            <p
              className={`text-lg font-bold ${
                coinPriceData?.quote?.USD?.percent_change_30d > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {coinPriceData?.quote?.USD?.percent_change_30d?.toFixed(2) || "0.00"}%
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Market Cap Dominance
            </h3>
            <p className="text-lg font-bold text-blue-500">
              {coinPriceData?.quote?.USD?.market_cap_dominance?.toFixed(2) || "0.00"}%
            </p>
          </div>
        </div>
      </div>

      {/* Links Section */}
      {coinInfoData?.urls && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Links & Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coinInfoData.urls.website && coinInfoData.urls.website.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Website
                </h3>
                {coinInfoData.urls.website
                  .slice(0, 2)
                  .map((url: string, index: number) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-1"
                    >
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  ))}
              </div>
            )}

            {coinInfoData.urls.explorer && coinInfoData.urls.explorer.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Explorers
                </h3>
                {coinInfoData.urls.explorer
                  .slice(0, 2)
                  .map((url: string, index: number) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-1"
                    >
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  ))}
              </div>
            )}

            {coinInfoData.urls.source_code && coinInfoData.urls.source_code.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Source Code
                </h3>
                {coinInfoData.urls.source_code
                  .slice(0, 2)
                  .map((url: string, index: number) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-1"
                    >
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetailPage;
