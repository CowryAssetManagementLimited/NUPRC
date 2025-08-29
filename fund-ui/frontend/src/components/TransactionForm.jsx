import { useEffect, useState } from "react";
import { createTransaction, getTypes } from "../api/hostcomply";

export default function TransactionForm({ onCreated }) {
  const [form, setForm] = useState({
    transactionDate: "",
    dailyYield: "",
    investmentTypeCode: "",
    portfolioId: "",
  });
  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await getTypes({ Page: 1, Size: 50 });
        setTypes(res.data.items || []);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction(form);
    setForm({ transactionDate: "", dailyYield: "", investmentTypeCode: "", portfolioId: "" });
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm">
      <div>
        <label className="block font-semibold">Transaction Date</label>
        <input
          type="date"
          name="transactionDate"
          value={form.transactionDate}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <p className="text-sm text-gray-500">Pick the exact date of the transaction.</p>
      </div>

      <div>
        <label className="block font-semibold">Daily Yield</label>
        <input
          type="number"
          name="dailyYield"
          value={form.dailyYield}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <p className="text-sm text-gray-500">Enter the yield (numeric value).</p>
      </div>

      <div>
        <label className="block font-semibold">Investment Type</label>
        {loadingTypes ? (
          <p>Loading types...</p>
        ) : (
          <select
            name="investmentTypeCode"
            value={form.investmentTypeCode}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select Type --</option>
            {types.map((t) => (
              <option key={t.id} value={t.investmentTypeCode}>
                {t.investmentTypeCode} - {t.investmentTypeDescription}
              </option>
            ))}
          </select>
        )}
        <p className="text-sm text-gray-500">Choose from already created types; else go to Types to create the type you need.</p>
      </div>

      <div>
        <label className="block font-semibold">Portfolio ID</label>
        <input
          type="text"
          name="portfolioId"
          value={form.portfolioId}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <p className="text-sm text-gray-500">Paste or type the portfolio ID this transaction belongs to.</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}
