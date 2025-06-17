"use client";
import { MdStarBorder } from "react-icons/md";
import { useEffect, useState } from "react";

export default function RowTable({
  crypto,
  index,
}: {
  crypto: any;
  index: number;
}) {

  const [info, setInfo] = useState<any>([]);
  const [price, setPrice] = useState<any>([]);

    useEffect(() => {
      const fetchInfo = async () => {
        try {
          const [infoRes, priceRes] = await Promise.all([
            fetch(`/api/info?symbol=${crypto.symbol}`),
            fetch(`/api/price?symbol=${crypto.symbol}`),
          ])
          const [infoData, priceData] = await Promise.all([
            infoRes.json(),
            priceRes.json(),
          ]);
          console.log('infoRes', infoData.data);
          setInfo(infoData.data);
          console.log('priceRes', priceData.data);
          setPrice(priceData.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchInfo();
    }, [crypto.symbol]);
  return (
    <tr className={`${index % 2 === 0 ? "bg-black" : "bg-gray-700"}`}>
      <td className="p-2.5">
        <MdStarBorder />
      </td>
      <td className="p-2.5">{index+1}</td>
      <td className="px-4 py-4">
        <div>
          <a href="#">
            <span className="flex gap-3 items-center">
              <img
                className="w-6 h-auto"
                src={info && info[crypto.symbol]?.logo}
                alt="Bitcoin"
              />
              <p className="font-semibold">
                {crypto.name} <span className="font-thin">{crypto.symbol}</span>{" "}
              </p>
            </span>
          </a>
        </div>
      </td>
      <td className="p-2.5">
        <div className="ml-2.5">
          <button className=" p-0.5 border-2 border-blue-400 rounded-md">
            Buy
          </button>
        </div>
      </td>
      {/* Price */}
      <td className="p-2.5">{
      price?.[crypto.symbol]?.[0]?.quote?.USD.price
      ? price?.[crypto.symbol]?.[0]?.quote?.USD.price >= 0.001 
        ? `$${Number(price?.[crypto.symbol]?.[0]?.quote?.USD.price.toFixed(2)).toLocaleString()}` 
        : `$${Number(price?.[crypto.symbol]?.[0]?.quote?.USD.price).toPrecision(4)}`
      : 'N/A' }</td>
      {/* percent change 1H */}
      <td className="p-2.5">{
      price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_1h
      ? price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_1h >= 0
        ? `${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_1h.toFixed(2)}%`
        : `${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_1h.toFixed(2)}%`
      : 'N/A'}</td>
      {/* percent change 24H */}
      <td className="p-2.5">{
        price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_24h
        ? price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_24h >= 0
          ? `+${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_24h.toFixed(2)}%`
          : `${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_24h.toFixed(2)}%`
        : 'N/A'}</td>
      <td className="p-2.5">+3.2%</td>
      {/* percent change 7D */}
      <td className="p-2.5">{
        price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_7d
        ? price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_7d >= 0
          ? `+${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_7d.toFixed(2)}%`
          : `${price?.[crypto.symbol]?.[0]?.quote.USD.percent_change_7d.toFixed(2)}%`
        : 'N/A'}</td>
      {/* MCap */}
      <td className="p-2.5">{
        price?.[crypto.symbol]?.[0]?.quote.USD.market_cap >= 0
        ? `$${Number(price?.[crypto.symbol]?.[0]?.quote.USD.market_cap.toFixed(2)).toLocaleString()}`
        : 'N/A'}</td>
      {/* Volume 24h */}
      <td className="p-2.5">{
        price?.[crypto.symbol]?.[0]?.quote.USD.volume_24h >= 0
        ? `$${Number(price?.[crypto.symbol]?.[0]?.quote.USD.volume_24h.toFixed(2)).toLocaleString()}`
        : 'N/A'}</td>
      {/* Circulating Supply */}
      <td className="p-2.5">{
        price?.[crypto.symbol]?.[0]?.circulating_supply >= 0
        ? `${Number(price?.[crypto.symbol]?.[0]?.circulating_supply.toFixed(2)).toLocaleString()} ${crypto.symbol}`
        : 'N/A'}</td>
      <td className="px-2 py-2">
        <img
          src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
          alt=""
        />
      </td>
    </tr>
  );
}
