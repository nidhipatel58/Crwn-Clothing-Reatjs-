import "./form-input.style.css"

function FormInput({ label, ...otherProps }) {
  return (
    <div className="group">
      {
        <label className={`${otherProps.value.length ? "shrink" : ""}`}>
          {label}
        </label>
      }
      <input className="form-input" {...otherProps} />
    </div>
  );
}

export default FormInput;
