import React from 'react';

const Button = ({ className, onClick, text }) => {
  return <button className={className} onClick={onClick}>{text}</button>;
};

const Checkbox = ({ className, label, value, onChange }) => {
  return (
    <label>
      <input className={className} type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export { Button, Checkbox };