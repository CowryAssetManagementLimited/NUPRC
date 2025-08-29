import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Portfolios from "./pages/Portfolios";
import Transactions from "./pages/Transactions";
import Types from "./pages/Types";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <nav className="mb-4">
          <Link to="/portfolios" className="mr-2">Portfolios</Link> |{" "}
          <Link to="/transactions" className="mx-2">Transactions</Link> |{" "}
          <Link to="/types" className="ml-2">Types</Link>
        </nav>

        <Routes>
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/types" element={<Types />} />
        </Routes>
      </Layout>
    </Router>
  );
}
