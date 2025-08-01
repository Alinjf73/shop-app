function TextField({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        autoComplete="off"
        className="textField__input"
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;
