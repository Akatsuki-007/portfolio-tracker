interface Search {
    data: SearchData[]
}

interface SearchData {
    id: string; 
    name: string;
    symbol: string;
    slug: string;
}

interface User {
  uid: string;
  email: string;
  photoURL: string;
}

interface Transaction {
  quantity: number;
  spend: number;
  receive: number;
  date: string;
  type: 'buy' | 'sell';
  symbol: string;
}