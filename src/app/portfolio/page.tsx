"use client";
import noPortfolio from "@/app/assets/no-portfolio.png";
import Image from "next/image";
import { useState } from "react";

export default function portfolioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");

  const handleCreatePortfolio = () => {
    // Handle portfolio creation logic here
    console.log("Creating portfolio:", { portfolioName });
    setIsModalOpen(false);
    setPortfolioName("");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative m-4 overflow-x-auto bg-black shadow-md sm:rounded-lg">
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
            onClick={()=> setIsModalOpen(true)}>
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
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-3">Portfolio Avatar</label>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 transform rotate-45"></div>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Change
                </button>
              </div>
            </div>

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
      )}
    </>
  );
}