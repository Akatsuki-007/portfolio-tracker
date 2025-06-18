"use client";
import { MdStarBorder } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RowTable({
  crypto,
  index,
}: {
  crypto: any;
  index: number;
}) {

  const Sparkline = ({ prices }: { prices: number[] }) => {
    if (!prices?.length) return null;

    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;

    const points = prices.map((price, i) => {
      const x = (i / (prices.length - 1)) * 100;
      const y = 30 - ((price - min) / range) * 30;
      return `${x},${y}`;
    });

    return (
      <svg width={100} height={30}>
        <path
          d={`M ${points.join(" L ")}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-500"
        />
      </svg>
    );
  };

  return (
    
    <tr className={`${index % 2 === 0 ? "bg-black" : "bg-gray-700"}`}>
      <td className="p-2.5">
        
      </td>
      <td className="p-2.5">{index+1}</td>
      <td className="px-4 py-4">
        <div>
          <Link href={`/detail/${crypto.symbol}`}>
            <span className="flex gap-3 items-center">
              <img
                className="w-6 h-auto"
                src={crypto.image}
                alt="Bitcoin"
              />
              <p className="font-semibold">
                {crypto.name} <span className="font-thin">{crypto.symbol.toUpperCase()}</span>{" "}
              </p>
            </span>
          </Link>
        </div>
      </td>
      {/* <td className="p-2.5">
        <div className="ml-2.5">
          <button className="p-0.5 border-2 border-blue-400 rounded-md text-[#ededed] bg-[#0c1421]">
            Buy
          </button>
        </div>
      </td> */}
      {/* Price */}
      <td className="p-2.5">{
  typeof crypto.current_price === 'number'
    ? crypto.current_price >= 1
      ? `$${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
      : `$${crypto.current_price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}`
    : 'N/A'
}</td>
      {/* percent change 1H */}
      <td className="p-2.5">{
      crypto.price_change_percentage_1h_in_currency
      ? crypto.price_change_percentage_1h_in_currency >= 0
        ? `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
        : `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
      : 'N/A'}</td>
      {/* percent change 24H */}
      <td className="p-2.5">{
        crypto.price_change_percentage_24h
        ? crypto.price_change_percentage_24h >= 0
          ? `+${crypto.price_change_percentage_24h.toFixed(2)}%`
          : `${crypto.price_change_percentage_24h.toFixed(2)}%`
        : 'N/A'}</td>
      {/* <td className="p-2.5">+3.2%</td> */}
      {/* percent change 7D */}
      <td className="p-2.5">{
        crypto.price_change_percentage_7d_in_currency
        ? crypto.price_change_percentage_7d_in_currency >= 0
          ? `+${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%`
          : `${crypto.price_change_percentage_7d_in_currency.toFixed(2)}%`
        : 'N/A'}</td>
      {/* MCap */}
      <td className="p-2.5">{
        crypto.market_cap >= 0
        ? `$${Number(crypto.market_cap.toFixed(2)).toLocaleString()}`
        : 'N/A'}</td>
      {/* Volume 24h */}
      <td className="p-2.5">{
        crypto.total_volume >= 0
        ? `${Number(crypto.total_volume.toFixed(2)).toLocaleString()}`
        : 'N/A'}</td>
      {/* Circulating Supply */}
      <td className="p-2.5">{
        crypto.circulating_supply >= 0
        ? `${Number(crypto.circulating_supply.toFixed(2)).toLocaleString()} ${crypto.symbol.toUpperCase()}`
        : 'N/A'}</td>
      <td className="px-2 py-2">
        <Sparkline
          prices={crypto.sparkline_in_7d?.price || []}
        />
      </td>
    </tr>
  );
}
