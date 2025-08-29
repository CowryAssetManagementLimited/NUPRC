import React from "react";

export default function PortfolioForm({ portfolio, setPortfolio, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-4">
      <input
        name="investmentTypeCode"
        placeholder="Investment Type Code"
        value={portfolio.investmentTypeCode}
        onChange={e => setPortfolio({ ...portfolio, investmentTypeCode: e.target.value })}
      />
      <input
        name="investmentDescription"
        placeholder="Investment Description"
        value={portfolio.investmentDescription}
        onChange={e => setPortfolio({ ...portfolio, investmentDescription: e.target.value })}
      />
      <input
        name="principal"
        type="number"
        placeholder="Principal"
        value={portfolio.principal}
        onChange={e => setPortfolio({ ...portfolio, principal: e.target.value })}
      />
      <input
        name="rate"
        type="number"
        placeholder="Rate"
        value={portfolio.rate}
        onChange={e => setPortfolio({ ...portfolio, rate: e.target.value })}
      />
      <label className="flex items-center gap-2">
        <input
          name="isTenuredInvestment"
          type="checkbox"
          checked={portfolio.isTenuredInvestment}
          onChange={e => setPortfolio({ ...portfolio, isTenuredInvestment: e.target.checked })}
        />
        Is Tenured Investment
      </label>
      <input
        name="commencementDate"
        type="date"
        value={portfolio.commencementDate}
        onChange={e => setPortfolio({ ...portfolio, commencementDate: e.target.value })}
      />
      <input
        name="tenor"
        type="number"
        placeholder="Tenor (days)"
        value={portfolio.tenor}
        onChange={e => setPortfolio({ ...portfolio, tenor: e.target.value })}
      />
      <input
        name="currency"
        placeholder="Currency (NGN, USD, etc.)"
        value={portfolio.currency}
        onChange={e => setPortfolio({ ...portfolio, currency: e.target.value })}
      />
      <input
        name="hcdtTrustCode"
        placeholder="Trust Code"
        value={portfolio.hcdtTrustCode}
        onChange={e => setPortfolio({ ...portfolio, hcdtTrustCode: e.target.value })}
      />
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Create Portfolio
      </button>
    </form>
  );
}