import React from "react";

const Input = ({
  Icon,
  name,
  value,
  label,
  isLabel = true,
  type,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <div className="mb-4 w-full">
        {isLabel ? (
          <div className="mb-2">
            <label>{label}</label>
          </div>
        ) : (
          ""
        )}
        <div className="flex focus-within:text-red-500">
          {Icon ? (
            <div className=" bg-white top-0 flex h-12 w-12 items-center justify-center rounded-bl-md rounded-tl-md border-y border-l">
              <span>
                <Icon />
              </span>
            </div>
          ) : (
            ""
          )}

          {type === "textarea" ? (
            <textarea
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className="h-32 w-full rounded-sm border pl-2 pt-4 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
            />
          ) : (
            <input
              name={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              className="h-12 w-full rounded-sm border py-2 pl-2 text-gray-600 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-700"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
