import { useEffect, useState } from "react";
import { getPortfolios, createPortfolio } from "../api/hostcomply";
import Layout from "../components/Layout";
import PortfolioForm from "../components/PortfolioForm";

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [newPortfolio, setNewPortfolio] = useState({
    investmentTypeCode: "",
    investmentDescription: "",
    principal: "",
    rate: "",
    isTenuredInvestment: false,
    commencementDate: "",
    tenor: "",
    currency: "",
    hcdtTrustCode: ""
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await getPortfolios({ page: 1, size: 20 });
      setPortfolios(res.data.items || []);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
    } finally {
      setLoading(false);
    }
  };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
            ...newPortfolio,
            principal: Number(newPortfolio.principal),
            tenor: Number(newPortfolio.tenor),
            rate: Number(newPortfolio.rate),
            isTenuredInvestment: Boolean(newPortfolio.isTenuredInvestment),
            commencementDate: newPortfolio.commencementDate 
                ? new Date(newPortfolio.commencementDate).toISOString().split('T')[0] 
                : null,

            fmHostComplyCode: import.meta.env.VITE_FM_HOST_COMPLY_CODE
            };

            await createPortfolio(payload);
            await fetchPortfolios();
            setFormOpen(false);
        } catch (error) {
            if (error.response) {
            console.error("API validation errors:", error.response.data);
            alert(JSON.stringify(error.response.data, null, 2));
            } else {
            console.error(error);
            }
        }
    };



  if (loading) return <Layout><div>Loading portfolios...</div></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Portfolios</h1>
      <button onClick={() => setFormOpen(!formOpen)}>
        {formOpen ? "Close Form" : "New Portfolio"}
      </button>

      {formOpen && (
        <PortfolioForm
          portfolio={newPortfolio}
          setPortfolio={setNewPortfolio}
          onSubmit={handleCreate}
        />
      )}

      <table border="1" cellPadding="6" className="mt-4 w-full text-left">
        <thead>
          <tr>
            <th>Type Code</th>
            <th>Description</th>
            <th>Principal</th>
            <th>Rate</th>
            <th>Tenured</th>
            <th>Commencement Date</th>
            <th>Tenor</th>
            <th>Currency</th>
            <th>Trust Code</th>
            <th>FM Code</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.length ? (
            portfolios.map((p, i) => (
              <tr key={i}>
                <td>{p.investmentTypeCode}</td>
                <td>{p.investmentDescription}</td>
                <td>{p.principal}</td>
                <td>{p.rate}</td>
                <td>{p.isTenuredInvestment ? "Yes" : "No"}</td>
                <td>{p.commencementDate}</td>
                <td>{p.tenor}</td>
                <td>{p.currency}</td>
                <td>{p.hcdtTrustCode}</td>
                <td>{p.fmHostComplyCode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No portfolios yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
