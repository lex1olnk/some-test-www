"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export const MultipleSelect = ({
  options,
  valueKey,
  queryKey,
  onMultipleChange,
}: {
  options: any;
  valueKey: string;
  queryKey: string;
  onMultipleChange: (name: string, values: any) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    let updatedSelectedOptions: string[];

    if (selectedOptions.includes(value)) {
      updatedSelectedOptions = selectedOptions.filter(
        (option) => option !== value
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, value];
    }

    setSelectedOptions(updatedSelectedOptions);

    queryKey && onMultipleChange(queryKey, updatedSelectedOptions);
  };

  return (
    <div>
      <div className="multi-select">
        {options.map((option: any) => (
          <label key={option.id + option[valueKey]}>
            <input
              name={valueKey}
              type="checkbox"
              value={option[valueKey]}
              checked={selectedOptions.includes(option[valueKey])}
              onChange={handleChange}
            />
            {option[valueKey]}
          </label>
        ))}
      </div>
      <button type="submit">Submit</button>
      <style jsx>{`
        .multi-select {
          display: flex;
          flex-direction: column;
        }
        .multi-select label {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};
