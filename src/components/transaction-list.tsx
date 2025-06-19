'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { deleteTransaction } from '@/lib/portfolio/portfolio-slicer';
import ModalAdd from './modal-add';
import { Modal, Button, ModalBody, ModalHeader, modalTheme } from 'flowbite-react';

interface TransactionListProps {
  className?: string;
}

export default function TransactionList({ className = '' }: TransactionListProps) {
  const dispatch = useAppDispatch();
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      dispatch(deleteTransaction(transactionToDelete));
      setDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setTransactionToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingTransaction(null);
  };

  if (portfolio.length === 0) {
    return (
      <div className={`bg-gray-800 rounded-xl p-8 text-center ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-white text-lg font-medium mb-2">No Transactions Yet</h3>
        <p className="text-gray-400 text-sm">
          Start by adding your first buy or sell transaction
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`bg-gray-800 rounded-xl overflow-hidden ${className}`}>
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white text-lg font-medium">Transaction History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Coin</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Quantity</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Price</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Total</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Date</th>
                <th className="text-left p-4 text-gray-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'buy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {transaction.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{transaction.coinName}</div>
                      <div className="text-gray-400 text-sm">{transaction.symbol}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{transaction.quantity.toFixed(8)}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{formatCurrency(transaction.pricePerCoin)}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">
                      {formatCurrency(transaction.quantity * transaction.pricePerCoin)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-400 text-sm">{formatDate(transaction.date)}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="Edit transaction"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => transaction.id && handleDeleteClick(transaction.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete transaction"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteModalOpen}
        onClose={handleDeleteCancel}
        position="center"
        size="md"
        theme={{
          ...modalTheme,
          root: {
            ...modalTheme.root,
            show: {
              ...modalTheme.root.show,
              on: "bg-gray-900/80 dark:bg-gray-900/80",
            },
          },
          header: {
            ...modalTheme.header,
            base: "border-gray-600 dark:border-gray-600",
            title: "text-white dark:text-white ml-auto",
            close: {
              ...modalTheme.header.close,
              base: "hover:bg-gray-600 dark:hover:bg-gray-600 hover:text-white dark:hover:text-white",
            },
          },
          content: {
            ...modalTheme.content,
            inner: "bg-gray-700 dark:bg-gray-700",
          },
        }}
      >
        <ModalHeader>
          Delete?
        </ModalHeader>

        <ModalBody>
          <div className="text-center">
            <svg
              className="mx-auto mb-4 h-14 w-14 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this transaction?
            </h3>
            <p className="mb-5 text-sm text-gray-400">
              This action cannot be undone and will permanently remove the transaction from your portfolio.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </Button>
              <Button
                color="green"
                onClick={handleDeleteCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* Edit Modal */}
      <ModalAdd
        openModal={editModalOpen}
        setOpenModal={setEditModalOpen}
        editTransaction={editingTransaction}
      />
    </>
  );
}
