"use client";
import { useState } from "react";

export default function LoginPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [numbers, setNumbers] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;

    // Remove any non-numeric characters
    value = value.replace(/[^\d]/g, "");

    // Limit input value to 11 characters
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    setInputValue(value);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl p-10 w-[30%] h-fit space-y-5">
        <div>
          <h1>ورود به پنل</h1>
        </div>
        <div>
          <p>شماره همراه</p>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none mt-1"
          />
        </div>
        <div>
          <button
            type="button"
            className="bg-red-500 text-white shadow-xl shadow-red-200 py-3 w-full rounded-lg"
          >
            ادامه
          </button>
        </div>
      </div>
    </div>
  );
}
