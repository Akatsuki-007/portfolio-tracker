"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdStarBorder } from 'react-icons/md';

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchData[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(
        `/api?symbol=${search}`,
      );
      const data = await res.json();
      console.log(data);
      setSearchResults(data.data);
    };
    fetchSearchResults();
  }, []);

  useEffect(() => {
    const filtered = searchResults.filter(
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

        <ul>
          {filteredResults.map((crypto) => (
            <li key={crypto.id}>
              {crypto.name} ({crypto.symbol})
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">
              Save and see your changes instantly.
            </li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
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
          <tr>
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">1</td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                      alt="Bitcoin"
                    />
                    <p className="font-semibold">
                      Bitcoin <span className="font-thin">BTC</span>{' '}
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M BTC</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
          <tr className="bg-gray-700">
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">2</td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                      alt="ethereum"
                    />
                    <p className="font-semibold">
                      Ethereum <span className="font-thin">ETH</span>
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M ETH</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">3</td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                      alt="theter"
                    />
                    <p className="font-semibold">
                      Theter <span className="font-thin">USDT</span>
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M USDT</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
          <tr className="bg-gray-700">
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">4 </td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
                      alt="theter"
                    />
                    <p className="font-semibold">
                      XRP <span className="font-thin">XRP</span>
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M XRP</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
          <tr>
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">5</td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
                      alt="BNB"
                    />
                    <p className="font-semibold">
                      BNB <span className="font-thin">BNB</span>
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M BNB</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
          <tr className="bg-gray-700">
            <td className="p-2.5">
              <MdStarBorder />
            </td>
            <td className="p-2.5">6</td>
            <td className="px-4 py-4">
              <div>
                <a href="#">
                  <span className="flex gap-3 items-center">
                    <img
                      className="w-6 h-auto rounded-full"
                      src="https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
                      alt="solana"
                    />
                    <p className="font-semibold">
                      Solana <span className="font-thin">SOL</span>
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
            <td className="p-2.5">$67,000</td>
            <td className="p-2.5">+0.5%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+3.2%</td>
            <td className="p-2.5">+7.8%</td>
            <td className="p-2.5">$1.3T</td>
            <td className="p-2.5">$45B</td>
            <td className="p-2.5">19M SOL</td>
            <td className="px-2 py-2">
              <img
                src="https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg"
                alt=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}
