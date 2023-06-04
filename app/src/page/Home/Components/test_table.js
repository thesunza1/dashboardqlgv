import React, {useState} from "react";
import { TbArrowsSort } from "react-icons/tb"

function SortButton() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [iconColor, setIconColor] = useState("text-black");

  const sortNumbers = () => {
    const sortedNumbers = [...numbers].sort(
      ascendingOrder ? (a, b) => a - b : (a, b) => b - a
    );
    setNumbers(sortedNumbers);
    setAscendingOrder(!ascendingOrder);
    setIconColor(ascendingOrder ? "text-white" : "text-black");
  };

  return (
    <div>
      <button
        className="ml-1 text-xl bg-blue-300 text-black"
        onClick={sortNumbers}
      >
        <TbArrowsSort className={`sort-icon ${iconColor}`} />
        {/* {ascendingOrder ? "Tăng dần" : "Giảm dần"} */}
      </button>
      <ul>
        {numbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default SortButton;