import React from "react";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, label, checked, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="hidden" 
      />
      <label htmlFor={id} className="flex items-center cursor-pointer gap-1">
        <span
          className={`w-4 h-4 border border-gray-300 rounded ${
            checked ? "bg-blue-500" : "bg-white"
          }`}
        ></span>
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
