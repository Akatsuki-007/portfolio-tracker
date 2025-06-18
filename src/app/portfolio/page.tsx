"use client";
import noPortfolio from "@/app/assets/no-portfolio.png";
import noManualPortfolio from "@/app/assets/no-manual-portfolio.png";
import Image from "next/image";
import RowTable from "@/app/components/row-table";
import { useState } from "react";

export default function portfolioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioCreated, setPortfolioCreated] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: "test",
    value: "$0",
    avatar: "green"
  });

  const handleCreatePortfolio = () => {
    // Handle portfolio creation logic here
    console.log("Creating portfolio:", { portfolioName });
    setIsModalOpen(false);
    setPortfolioCreated(true);
    setPortfolioData({
      name: portfolioName || "test",
      value: "$0",
      avatar: "green" // You can randomize this or let users select in the modal
    });
    setPortfolioName("");
  };

  const handleAddTransaction = () => {
    // Handle add transaction logic here
    console.log("Adding transaction");
  };

  if (portfolioCreated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900 p-4 md:p-6">
        {/* Sidebar and Content Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="flex flex-col space-y-4">
              {/* My Portfolio Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-white font-medium">My portfolio</h2>
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              {/* Portfolio Item */}
              <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{portfolioData.name}</h3>
                    <p className="text-gray-400 text-sm">{portfolioData.value}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Portfolio Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl text-white font-medium">{portfolioData.name}</h1>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <h2 className="text-3xl text-white font-bold">{portfolioData.value}</h2>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAddTransaction}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add Transaction</span>
                </button>

                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Export</span>
                </button>

                <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Empty Portfolio State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-6">
                <Image
                  src={noManualPortfolio}
                  alt="Empty portfolio"
                  width={200}
                  height={200}
                  className="object-contain"
                  // If you don't have this image, replace with the following:
                  // This is a fallback until you can add the actual image
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%234263EB'/%3E%3Cpath d='M50,150 L90,90 L130,130 L170,70' stroke='%2361E224' stroke-width='10' fill='none'/%3E%3Ccircle cx='160' cy='40' r='20' fill='%23FFCC00'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h2 className="text-3xl text-white font-bold mb-2">This portfolio needs some final touches...</h2>
              <p className="text-gray-400 mb-8">Add a coin to get started</p>
              <button
                onClick={handleAddTransaction}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add Transaction</span>
              </button>
            </div>

            {/* Cryptocurrency Table */}
            <div className="relative m-4 overflow-x-auto bg-black shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-sm bg-gray-700">
                  <tr>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Price</th>
                    <th className="p-2.5">1h %</th>
                    <th className="p-2.5">24h %</th>
                    <th className="p-2.5">7d %</th>
                    <th className="p-2.5">Holdings</th>
                    <th className="p-2.5">Avg. Buy Price</th>
                    <th className="p-2.5">Profit/Loss</th>
                    <th className="p-2.5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC</td>
                    <td>$104,276.80</td>
                    <td>0.63 %</td>
                    <td>2.9 %</td>
                    <td>4.36 %</td>
                    <td>$104,276.80</td>
                    <td>$104,276.80</td>
                    <td>460.09</td>
                    <td>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors mr-2">Add</button>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative m-4 overflow-x-auto min-h-screen bg-black shadow-md sm:rounded-lg">
        <div className="text-center mb-12">
          <div className="mb-8">
            <Image
              src={noPortfolio}
              alt="Portfolio illustration"
              width={256}
              height={192}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's get started with your first portfolio!
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Track profits, losses and valuation all in one place.
          </p>
        </div>

        {/* Options Grid */}
        <div className="flex justify-center items-center w-full px-4">
          <div className="w-full max-w-4xl space-y-4">
            {/* Add Transactions Manually */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer"
              onClick={() => setIsModalOpen(true)}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Add Transactions Manually</h3>
                  <p className="text-gray-400">
                    Enter all transaction details at your own pace to track your portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-white mb-6">Create Portfolio</h2>

            {/* Portfolio Avatar */}
            {/* <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">Portfolio Avatar</label>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 transform rotate-45"></div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Change
                </button>
              </div>
            </div> */}

            {/* Portfolio Name */}
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">Portfolio Name</label>
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="Enter your portfolio name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                maxLength={24}
              />
              <p className="text-gray-400 text-xs mt-1">{portfolioName.length}/24 characters</p>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreatePortfolio}
              disabled={!portfolioName.trim()}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Create Portfolio
            </button>
          </div>
        </div>
      )
      }
    </>
  );
}