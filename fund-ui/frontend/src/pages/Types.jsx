import { useEffect, useState } from "react";
import { getTypes, deleteType } from "../api/hostcomply";
import TypeForm from "../components/TypeForm";

export default function Types() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [sortField, setSortField] = useState("investmentTypeCode");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const res = await getTypes({ page, size });
      let items = res.data.items || [];

      items.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setTypes(items);
      setError("");
    } catch {
      setError("Failed to load types.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this type?")) return;
    try {
      await deleteType(id);
      setTypes((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Could not delete type.");
    }
  };

  useEffect(() => {
    fetchTypes();
  }, [page, sortField, sortOrder]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Investment Types</h1>
      <TypeForm onCreated={fetchTypes} />
      {error && <p className="text-red-600">{error}</p>}

      <h2 className="text-xl font-semibold mt-6">Existing Types</h2>

      {loading ? (
        <p>Loading types...</p>
      ) : types.length === 0 ? (
        <p>No types yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {["investmentTypeCode", "investmentTypeDescription"].map(
                    (field) => (
                      <th
                        key={field}
                        className="p-2 border-b cursor-pointer"
                        onClick={() => toggleSort(field)}
                      >
                        {field}{" "}
                        {sortField === field
                          ? sortOrder === "asc"
                            ? "↑"
                            : "↓"
                          : ""}
                      </th>
                    )
                  )}
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {types.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{t.investmentTypeCode}</td>
                    <td className="p-2 border-b">{t.investmentTypeDescription}</td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
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
    </>
  );
}
