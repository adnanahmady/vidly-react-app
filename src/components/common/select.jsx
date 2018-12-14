import React from 'react';

const Select = ({ label, name, columns, error, field, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        name={name}
        id={name}
        value={field}
        className="form-control dropdown">
        {columns.map((c, i) =>
          <option value={c.id || c.name} key={i}>{c.name}</option>
        )}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Select;