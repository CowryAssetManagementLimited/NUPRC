import { useState } from "react";
import { createType } from "../api/hostcomply";

export default function TypeForm({ onCreated }) {
  const [types, setTypes] = useState([{ InvestmentTypeCode: "", InvestmentTypeDescription: "" }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newTypes = [...types];
    newTypes[index][name] = value;
    setTypes(newTypes);
  };

  const addType = () => setTypes([...types, { InvestmentTypeCode: "", InvestmentTypeDescription: "" }]);

  const handleSubmit = async e => {
    e.preventDefault();
    await createType({ 
        fmHostComplyCode: import.meta.env.VITE_FM_HOST_COMPLY_CODE,
        InvestmentTypes: types 
    });
    onCreated?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      {types.map((t, i) => (
        <div key={i}>
          <input
            name="InvestmentTypeCode"
            placeholder="Code"
            value={t.InvestmentTypeCode}
            onChange={e => handleChange(i, e)}
          />
          <small style={{ color: "gray" }}>
            e.g. EQUITY, FIXED_INCOME, BOND, REAL_ESTATE
          </small>
          <input
            name="InvestmentTypeDescription"
            placeholder="Description"
            value={t.InvestmentTypeDescription}
            onChange={e => handleChange(i, e)}
          />
        </div>
      ))}
      
      <small style={{ color: "gray", display: "block", margin: "8px 0" }}>
        Use <b>Add Type</b> to add more rows (batch input).  
        Click <b>Create Types</b> once to save all at once.
      </small>

      <button type="button" onClick={addType}>Add Type</button>
      <button type="submit">Create Types</button>
    </form>
  );
}
