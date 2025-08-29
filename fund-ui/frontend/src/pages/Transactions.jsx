import { useEffect, useState } from "react";
import { getTransactions } from "../api/hostcomply";
import TransactionForm from "../components/TransactionForm";
import Layout from "../components/Layout";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [sortField, setSortField] = useState("transactionDate");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchTransactions = async () => {
    setLoading(true); // reset before fetch
    try {
      const res = await getTransactions({ page, size });
      let items = res.data.items || [];

      items.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setTransactions(items);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, sortField, sortOrder]);

  const handleCreated = () => fetchTransactions();

  if (loading) return <Layout><div>Loading transactions...</div></Layout>;

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Transactions</h1>

      <TransactionForm onCreated={handleCreated} />

      <h2 className="text-xl font-semibold mt-6">Recorded Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {["transactionDate", "investmentTypeCode", "dailyYield"].map(
                    (field) => (
                      <th
                        key={field}
                        className="p-2 border-b cursor-pointer"
                        onClick={() => toggleSort(field)}
                      >
                        {field}{" "}
                        {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                      </th>
                    )
                  )}
                  <th className="p-2 border-b">Portfolio</th>
                  <th className="p-2 border-b">Currency</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">
                      {new Date(t.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border-b">{t.investmentTypeCode}</td>
                    <td className="p-2 border-b">{t.dailyYield}</td>
                    <td className="p-2 border-b">
                      {t.investmentPortfolio?.investmentDescription || "-"}
                    </td>
                    <td className="p-2 border-b">
                      {t.investmentPortfolio?.currency || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}
