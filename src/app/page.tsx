"use client";
import { useEffect, useState } from "react";

import RowTable from "./components/row-table";

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchData[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(
        `/api/search`,
      );
      const data = await res.json();
      console.log(data);
      setSearchResults(data.data);
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
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded mb-4 w-full"
        />

      </div>
      <div className="relative m-4 overflow-x-auto bg-black shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-sm bg-gray-700">
            <tr>
              <th className="p-2.5"></th>
              <th className="p-2.5">#</th>
              <th className="p-2.5">Name</th>
              <th className="p-2.5"></th>
              <th className="p-2.5">Price</th>
              <th className="p-2.5">1h %</th>
              <th className="p-2.5">24h %</th>
              <th className="p-2.5">24h %</th>
              <th className="p-2.5">7d %</th>
              <th className="p-2.5">Market Cap</th>
              <th className="p-2.5">Volume(24h) </th>
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
    </>
  );
}
