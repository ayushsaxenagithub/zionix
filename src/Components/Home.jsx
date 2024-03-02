import  { useState } from "react";
import axios from "axios";
import PriceBreakDown from "./PriceBreakDown";

const Home = () => {
  const [partNumber, setPartNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  let [MouserData, SetMouserData] = useState([]);
  let [data, SetData] = useState([]);
  
  function findPriceBreakIndex(quantity, priceBreaks) {
    for (let i = 0; i < priceBreaks.length - 1; i++) {
        if (priceBreaks[i].Quantity <= quantity && priceBreaks[i + 1].Quantity > quantity) {
            return i;
        }
    }
    return -1; 
}

  const handleSubmit = async () => {
    const body = {
      SearchByPartRequest: {
        mouserPartNumber: partNumber,
        partSearchOptions: "string",
      },
    };

    const response = await axios.post(
      "https://api.mouser.com/api/v1/search/partnumber?apiKey=82675baf-9a58-4d5a-af3f-e3bbcf486560",
      body
    );

    SetMouserData(response.data.SearchResults.Parts[0].PriceBreaks);
    const reqIndex = Number(findPriceBreakIndex(quantity, MouserData));
    var itemData = MouserData[reqIndex];
    var itemQuantity = Number(itemData.Quantity);
    var itemPrice = Number(itemData.Price.replace(/[₹,]/g, ""));
    const price = (itemPrice/itemQuantity) * quantity;
    MouserData = MouserData.filter((item, index) => index === reqIndex);
    MouserData[0].Quantity = quantity;
    MouserData[0].Price = price
    SetData(MouserData)
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
        <PriceBreakDown title={"Mouser "} data={data} />
        <PriceBreakDown title={"Rutronik "} />
        <PriceBreakDown title={"TME "} />
      </div>
    </div>
  );
};

export default Home;
