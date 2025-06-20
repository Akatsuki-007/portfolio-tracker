"use client";
import { useEffect, useState } from "react";

import RowTable from "./components/row-table";
import ModalAdd from "@/components/modal-add";

export default function Home() {
  const [search, setSearch] = useState("");
  const [marketData, setMarketData] = useState<any[]>([]); // Paginated market data
  const [searchResults, setSearchResults] = useState<any[]>([]); // Global search results
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [totalPages] = useState(50); // CoinGecko has many pages, limiting to 50 for performance
  
  const coinsPerPage = 20; // Increased from 10 to 20 coins per page

  // Fetch paginated market data when not searching
  useEffect(() => {
    if (search) return; // Don't fetch market data when searching
    
    const fetchMarketData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=true&price_change_percentage=1h,24h,7d`
        );
        const data = await res.json();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [currentPage, search]);

  // Handle search functionality
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const searchCoins = async () => {
      setSearchLoading(true);
      try {
        // Use CoinGecko's search endpoint to find coins globally
        const searchRes = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(search)}`
        );
        const searchData = await searchRes.json();
        
        // Get detailed market data for the found coins (limit to first 50 results)
        const coinIds = searchData.coins.slice(0, 50).map((coin: any) => coin.id).join(',');
        
        if (coinIds) {
          const marketRes = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=true&price_change_percentage=1h,24h,7d`
          );
          const marketData = await marketRes.json();
          setSearchResults(marketData);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching coins:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debounceTimer = setTimeout(searchCoins, 500);
    return () => clearTimeout(debounceTimer);
  }, [search]);
  return (
    <>
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 pr-10 border rounded mb-4 w-full bg-gray-800 border-gray-600 text-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-200 p-1"
              >
                ✕
              </button>
            )}
            {search && (
              <p className="text-sm text-gray-400 mb-2">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{search}"
              </p>
            )}
          </div>
        </div>
        <div className="relative mx-4 overflow-x-auto bg-transparent">
          {(loading || searchLoading) ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-300">
                {search ? 'Searching coins...' : 'Loading coins...'}
              </span>
            </div>
          ) : (
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
                {(search ? searchResults : marketData)?.map((crypto: any, index: number) => (
                  <RowTable 
                    key={crypto.id} 
                    index={search ? index : index + (currentPage - 1) * coinsPerPage} 
                    crypto={crypto} 
                  />
                ))}
                {search && searchResults.length === 0 && !searchLoading && (
                  <tr>
                    <td colSpan={11} className="text-center py-8 text-gray-400">
                      No cryptocurrencies found for "{search}". Try a different search term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Controls */}
        {!search && (
          <div className="flex justify-center items-center mt-8 mb-4 space-x-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || loading}
              className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNumber;
                if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                if (pageNumber < 1 || pageNumber > totalPages) return null;
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    disabled={loading}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border disabled:cursor-not-allowed ${
                      currentPage === pageNumber
                        ? 'text-white bg-blue-600 border-blue-600'
                        : 'text-gray-300 bg-gray-800 border-gray-600 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || loading}
              className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        )}

        {/* Page Info */}
        {!search && (
          <div className="flex justify-center text-sm text-gray-400 mb-4">
            Page {currentPage} of {totalPages} • Showing {coinsPerPage} coins per page
          </div>
        )}
      </div>
    </>
  );
}
