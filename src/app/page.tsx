"use client";
import { useEffect, useState } from "react";

import RowTable from "./components/row-table";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=1h,24h,7d"
      );
      const data = await res.json();
      setSearchResults(data);
    };
    fetchSearchResults();
  }, []);

  useEffect(() => {
    const filtered = searchResults?.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [search, searchResults]);
  return (
    <>
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border rounded mb-4 w-full"
            />
          </div>
        </div>
        <div className="relative mx-4 overflow-x-auto bg-transparent">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-sm border-y border-gray-600">
              <tr>
                <th className="p-2.5"></th>
                <th className="p-2.5">#</th>
                <th className="p-2.5">Name</th>
                {/* <th className="p-2.5"></th> */}
                <th className="p-2.5">Price</th>
                <th className="p-2.5">1h %</th>
                <th className="p-2.5">24h %</th>
                {/* <th className="p-2.5">24h %</th> */}
                <th className="p-2.5">7d %</th>
                <th className="p-2.5">Market Cap</th>
                <th className="p-2.5">Total Volume </th>
                <th className="p-2.5">Calculating Supply</th>
                <th className="p-2.5">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults?.map((crypto, index) => (
                <RowTable key={crypto.id} index={index} crypto={crypto} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
