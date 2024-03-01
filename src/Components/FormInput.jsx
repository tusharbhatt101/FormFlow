import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, options, type, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {type === "dropdown" ? (
        <select
          {...inputProps}
          value={inputProps.value}
          onChange={(e) =>
            onChange({
              target: { name: inputProps.name, value: e.target.value },
            })
          }
          onBlur={handleFocus}
          onFocus={handleFocus}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...inputProps}
          onChange={(e) =>
            onChange({
              target: { name: inputProps.name, value: e.target.value },
            })
          }
          onBlur={handleFocus}
          onFocus={() =>
            inputProps.name === "confirmPassword" && setFocused(true)
          }
          focused={focused.toString()}
        />
      )}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
