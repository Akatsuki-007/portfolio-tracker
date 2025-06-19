"use client";
import noPortfolio from "@/app/assets/no-portfolio.png";
import noManualPortfolio from "@/app/assets/no-manual-portfolio.png";
import Image from "next/image";
import { useState } from "react";
import ModalAdd from "../../components/modal-add";
import RowTable from "@/app/components/row-table";
import TransactionList from "@/components/transaction-list";
import PortfolioSummary from "@/components/portfolio-summary";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addSampleData } from "@/lib/portfolio/portfolio-slicer";
import { Dropdown, Modal, modalTheme, Button, TextInput, ModalHeader, ModalBody, ModalFooter, DropdownItem } from "flowbite-react";

export default function PortfolioPage() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioCreated, setPortfolioCreated] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    name: "test",
    avatar: "green",
  });
  const [openModal, setOpenModal] = useState(false);
  const [editPortfolioModal, setEditPortfolioModal] = useState(false);
  const [deletePortfolioModal, setDeletePortfolioModal] = useState(false);
  const [editedPortfolioName, setEditedPortfolioName] = useState("");

  // Get portfolio data from Redux
  const { portfolio } = useAppSelector((state) => state.portfolio);
  const hasTransactions = portfolio.length > 0;

  const handleCreatePortfolio = () => {
    // Handle portfolio creation logic here
    console.log("Creating portfolio:", { portfolioName });
    setIsModalOpen(false);
    setPortfolioCreated(true);
    setPortfolioData({
      name: portfolioName || "test",
      avatar: "green", // You can randomize this or let users select in the modal
    });
    setPortfolioName("");
  };

  const handleAddTransaction = () => {
    // Handle add transaction logic here
    setOpenModal(true);
    console.log(openModal);
    console.log("Adding transaction");
  };

  const handleEditPortfolio = () => {
    setEditedPortfolioName(portfolioData.name);
    setEditPortfolioModal(true);
  };

  const handleSavePortfolioEdit = () => {
    if (editedPortfolioName.trim()) {
      setPortfolioData({
        ...portfolioData,
        name: editedPortfolioName.trim()
      });
      setEditPortfolioModal(false);
      setEditedPortfolioName("");
    }
  };

  const handleDeletePortfolio = () => {
    setDeletePortfolioModal(true);
  };

  const handleConfirmDelete = () => {
    // Reset to initial state - showing the portfolio creation screen
    setPortfolioCreated(false);
    setPortfolioData({ name: "test", avatar: "green" });
    setDeletePortfolioModal(false);
    // You might also want to clear the Redux store here
    // dispatch(clearPortfolio()); // if you have this action
  };

  if (portfolioCreated) {
    return (
      <>
        <div className="container mx-auto flex flex-col min-h-screen p-4 md:p-6">
          {/* Sidebar and Content Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-grow">
              {/* Portfolio Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl text-white font-medium">
                      {portfolioData.name}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddTransaction}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Add Transaction</span>
                  </button>

                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    )}
                  >
                    <DropdownItem onClick={handleEditPortfolio}>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Portfolio</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem onClick={handleDeletePortfolio}>
                      <div className="flex items-center space-x-2 text-red-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete Portfolio</span>
                      </div>
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>

              {/* Portfolio Content */}
              {hasTransactions ? (
                <div className="space-y-6">
                  {/* Portfolio Summary */}
                  <PortfolioSummary />

                  {/* Transaction List */}
                  <TransactionList />
                </div>
              ) : (
                /* Empty Portfolio State */
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
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%234263EB'/%3E%3Cpath d='M50,150 L90,90 L130,130 L170,70' stroke='%2361E224' stroke-width='10' fill='none'/%3E%3Ccircle cx='160' cy='40' r='20' fill='%23FFCC00'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <h2 className="text-3xl text-white font-bold mb-2">
                    This portfolio needs some final touches...
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Add a coin to get started
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handleAddTransaction}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Add Transaction</span>
                    </button>
                    <button
                      onClick={() => dispatch(addSampleData())}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Load Sample Data</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ModalAdd openModal={openModal} setOpenModal={setOpenModal} />

        {/* Edit Portfolio Modal */}
        <Modal size="md" show={editPortfolioModal} onClose={() => setEditPortfolioModal(false)}
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
                }}>
          <ModalHeader>Edit Portfolio</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Name
                </label>
                <TextInput
                  value={editedPortfolioName}
                  onChange={(e) => setEditedPortfolioName(e.target.value)}
                  placeholder="Enter portfolio name"
                  maxLength={24}
                />
                <p className="text-gray-500 text-xs mt-1">
                  {editedPortfolioName.length}/24 characters
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="hover:bg-red-600 dark:hover:bg-red-600 cursor-pointer" color="gray" onClick={() => setEditPortfolioModal(false)}>
              Cancel
            </Button>
            <Button 
              color="blue" 
              onClick={handleSavePortfolioEdit}
              disabled={!editedPortfolioName.trim()}
              className="cursor-pointer"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>

        {/* Delete Portfolio Modal */}
        <Modal size="md" show={deletePortfolioModal} onClose={() => setDeletePortfolioModal(false)}
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
                    title: "text-white dark:text-white text-center w-full",
                    close: {
                      ...modalTheme.header.close,
                      base: "hover:bg-gray-600 dark:hover:bg-gray-600 hover:text-white dark:hover:text-white",
                    },
                  },
                  content: {
                    ...modalTheme.content,
                    inner: "bg-gray-700 dark:bg-gray-700",
                  },
                }}>
          <ModalHeader>Delete Portfolio?</ModalHeader>
          <ModalBody>
            <div className="text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-white">
                Are you sure you want to delete the portfolio "{portfolioData.name}"?
              </h3>
              <p className="text-sm text-red-500 mb-4">
                This action cannot be undone. All transactions will be permanently deleted.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="hover:bg-blue-600 dark:hover:bg-blue-600 cursor-pointer" color="gray" onClick={() => setDeletePortfolioModal(false)}>
              Cancel
            </Button>
            <Button className="cursor-pointer" color="red" onClick={handleConfirmDelete}>
              Yes, Delete Portfolio
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto relative overflow-x-auto h-[calc(100vh-62px)] shadow-md sm:rounded-lg">
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
            Let&apos;s get started with your first portfolio!
          </h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Track profits, losses and valuation all in one place.
          </p>
        </div>

        {/* Options Grid */}
        <div className="flex justify-center items-center w-full px-4">
          <div className="w-full max-w-4xl space-y-4">
            {/* Add Transactions Manually */}
            <div
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Add Transactions Manually
                  </h3>
                  <p className="text-gray-400">
                    Enter all transaction details at your own pace to track your
                    portfolio.
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-white mb-6">
              Create Portfolio
            </h2>

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
              <label className="block text-white text-sm font-medium mb-3">
                Portfolio Name
              </label>
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                placeholder="Enter your portfolio name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                maxLength={24}
              />
              <p className="text-gray-400 text-xs mt-1">
                {portfolioName.length}/24 characters
              </p>
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
