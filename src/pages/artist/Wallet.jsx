import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getMethod } from '../../utils/apiService';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export default function ArtistWallet() {
  const { token } = useAuthStore();
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const [walletRes, transactionsRes] = await Promise.all([
          getMethod('/artist/wallet/balance', token),
          getMethod('/artist/wallet/transactions', token),
        ]);

        if (walletRes?.success || walletRes?.data) {
          setWallet(walletRes.data || walletRes);
        }

        if (transactionsRes?.success && transactionsRes?.data) {
          setTransactions(Array.isArray(transactionsRes.data) ? transactionsRes.data : []);
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet</h1>
        <p className="text-gray-600">View your earnings and transactions</p>
      </div>

      {loading ? (
        <div className="bg-gray-200 animate-pulse rounded-2xl h-64" />
      ) : (
        <>
          <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] rounded-3xl p-8 text-white mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-2">Total Balance</p>
                <p className="text-4xl font-bold">
                  ₹{wallet?.balance || wallet?.totalEarnings || '0'}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Total Earnings</p>
                <p className="text-2xl font-bold">₹{wallet?.totalEarnings || '0'}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Pending</p>
                <p className="text-2xl font-bold">₹{wallet?.pendingAmount || '0'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
              <button className="flex items-center text-[#4D55CC] font-semibold hover:opacity-80">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No transactions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description || 'Payment'}</p>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(transaction.createdAt || transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 text-lg">
                        +₹{transaction.amount || transaction.amount}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.status || 'Completed'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

