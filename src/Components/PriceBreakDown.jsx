import React from "react";

const PriceBreakDown = ({ title, data }) => {
  return (
    <div className="w-2/6 flex flex-col py-3 border-2 justify-center items-center">
      <h3 className="font-bold text-red-800  text-2xl">{title}</h3>
      <div className="flex flex-col w-4/5 gap-3">
        {data &&
          data.map((item, index) => (
            <div className=" bg-red-400 px-4 py-3  font-semibold">
              <p>
                Price : {item.Price} {item.Currency}
              </p>
              <p>Quantity : {item.Quantity}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PriceBreakDown;
