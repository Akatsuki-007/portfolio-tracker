import { Modal, ModalBody, Datepicker, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addTransaction, updateTransaction } from '@/lib/portfolio/portfolio-slicer';

interface ModalAddProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  editTransaction?: Transaction | null;
}

export default function ModalAdd({
  openModal,
  setOpenModal,
  editTransaction = null,
}: ModalAddProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.portfolio);
  
  const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchData[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<SearchData | null>(null);
  const [quantity, setQuantity] = useState('');
  const [pricePerCoin, setPricePerCoin] = useState('');
  const [date, setDate] = useState(new Date());
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Initialize form with edit data if provided
  useEffect(() => {
    if (editTransaction) {
      setTransactionType(editTransaction.type);
      setQuantity(editTransaction.quantity.toString());
      setPricePerCoin(editTransaction.pricePerCoin.toString());
      setDate(new Date(editTransaction.date));
      setSelectedCoin({
        id: editTransaction.symbol,
        name: editTransaction.coinName,
        symbol: editTransaction.symbol,
        slug: editTransaction.symbol.toLowerCase(),
      });
      setSearch(editTransaction.coinName);
    }
  }, [editTransaction]);

  // Search for coins
  useEffect(() => {
    const searchCoins = async () => {
      if (search.length > 2) {
        try {
          const response = await fetch('/api/search');
          const data: Search = await response.json();
          const filtered = data.data.filter(
            coin =>
              coin.name.toLowerCase().includes(search.toLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          );
          setSearchResults(filtered);
          setShowSearchResults(true);
        } catch (error) {
          console.error('Error searching coins:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    };

    const timeoutId = setTimeout(searchCoins, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleCoinSelect = (coin: SearchData) => {
    setSelectedCoin(coin);
    setSearch(coin.name);
    setShowSearchResults(false);
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerCoin) || 0;
    return qty * price;
  };

  const handleSubmit = () => {
    if (!selectedCoin || !quantity || !pricePerCoin) {
      alert('Please fill in all required fields');
      return;
    }

    const total = calculateTotal();
    const transaction: Transaction = {
      ...(editTransaction?.id && { id: editTransaction.id }),
      type: transactionType,
      symbol: selectedCoin.symbol,
      coinName: selectedCoin.name,
      quantity: parseFloat(quantity),
      pricePerCoin: parseFloat(pricePerCoin),
      spend: transactionType === 'buy' ? total : 0,
      receive: transactionType === 'sell' ? total : 0,
      date: date.toISOString(),
    };

    if (editTransaction) {
      dispatch(updateTransaction(transaction));
    } else {
      dispatch(addTransaction(transaction));
    }

    handleClose();
  };

  const handleClose = () => {
    setOpenModal(false);
    // Reset form
    setTransactionType('buy');
    setSearch('');
    setSelectedCoin(null);
    setQuantity('');
    setPricePerCoin('');
    setDate(new Date());
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return (
    <Modal show={openModal} size="md" onClose={handleClose} dismissible>
      <div className="bg-gray-900 text-white rounded-lg px-6 pt-4 pb-6">
        <h3 className="text-center pt-4 font-semibold text-base">
          {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </h3>
        <ModalBody>
          <div className="flex flex-col space-y-5">
            {/* Transaction Type Toggle */}
            <div className="flex justify-center flex-row gap-2">
              <Button
                className={`rounded-2xl ${
                  transactionType === 'buy'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                onClick={() => setTransactionType('buy')}
              >
                Buy
              </Button>
              <Button
                className={`rounded-2xl ${
                  transactionType === 'sell'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
                onClick={() => setTransactionType('sell')}
              >
                Sell
              </Button>
            </div>

            {/* Search Coin */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 py-2 text-gray-900"
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map((coin) => (
                    <div
                      key={coin.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-gray-900 border-b last:border-b-0"
                      onClick={() => handleCoinSelect(coin)}
                    >
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-gray-600">{coin.symbol}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity and Price */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:basis-1/2">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  step="0.00000001"
                  min="0"
                />
              </div>
              <div className="w-full sm:basis-1/2">
                <input
                  type="number"
                  placeholder="Price Per Coin"
                  value={pricePerCoin}
                  onChange={(e) => setPricePerCoin(e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="w-full border border-gray-300 rounded-2xl text-center p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
              />
            </div>

            {/* Total Amount Display */}
            <div className="bg-gray-800 p-3 rounded-2xl text-center">
              <div className="text-sm text-gray-400">Total Amount</div>
              <div className="text-lg font-semibold">
                ${calculateTotal().toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {transactionType === 'buy' ? 'Amount to spend' : 'Amount to receive'}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                className={`w-full rounded-2xl ${
                  transactionType === 'buy'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                onClick={handleSubmit}
                disabled={loading || !selectedCoin || !quantity || !pricePerCoin}
              >
                {loading
                  ? 'Processing...'
                  : editTransaction
                  ? `Update ${transactionType === 'buy' ? 'Buy' : 'Sell'} Transaction`
                  : `Add ${transactionType === 'buy' ? 'Buy' : 'Sell'} Transaction`}
              </Button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
}
