import { MdStarBorder } from 'react-icons/md';

export default function Home() {
  return (
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
  );
}
