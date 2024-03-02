import React, { useState } from "react";
import axios from "axios";
import PriceBreakDown from "./PriceBreakDown";

const Home = () => {
  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [MouserData, SetMouserData] = useState([]);

  const handleSubmit = async () => {
    const body = {
      SearchByPartRequest: {
        mouserPartNumber: partNumber,
        partSearchOptions: quantity,
      },
    };

    const response = await axios.post(
      "https://api.mouser.com/api/v1/search/partnumber?apiKey=82675baf-9a58-4d5a-af3f-e3bbcf486560",
      body
    );

    // const rutronikRes = await axios.get(
    //   `https://www.rutronik24.com/api/search/?apikey=cc6qyfg2yfis&searchterm=CC0603KRX7R8BB105`
    // );

    SetMouserData(response.data.SearchResults.Parts[0].PriceBreaks);
    console.log(rutronikRes.data[0]);
  };

  return (
    <div className="min-h-screen  bg-red-200 min-w-[100vw]">
      <div className="bg-slate-500 py-5 flex justify-center items-center">
        <div className="py-5 px-3 bg-red-400 flex flex-col gap-4">
          <input
            type="text"
            value={partNumber}
            placeholder="Enter Part Number"
            onChange={(e) => setPartNumber(e.target.value)}
            className="w-96"
          ></input>
          <input
            type="text"
            value={quantity}
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)}
            className="w-96 border-2"
          ></input>
          <button className="w-96 border-2" onClick={handleSubmit}>
            {" "}
            Search
          </button>
        </div>
      </div>
      <div className="flex">
        <PriceBreakDown title={"Mouser "} data={MouserData} />
        <PriceBreakDown title={"Rutronik "} />
        <PriceBreakDown title={"TME "} />
      </div>
    </div>
  );
};

export default Home;
