import React, { useState } from "react";
import TableHead from "@mui/material/TableHead";
import { TbArrowsSort } from "react-icons/tb";

function Sort() {
  function SortButton() {
    const [numbers, setNumbers] = useState([]);
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
        </button>
        <ul>
          {numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <TableHead>
      <tr className="border-x text-[#223f4e]">
        <th className="text-left">
          <p className="text-2xl ml-2">Công việc đã giao</p>
        </th>
        <th className="w-[13vw] text-center">
          <div className="flex justify-center items-center">
            <div className="text-lg">
              <p>Lãnh đạo</p>
              <p>đơn vị</p>
            </div>
            <button className="ml-1 text-xl bg-blue-300">
              <TbArrowsSort />
            </button>
          </div>
        </th>
        <th className="w-[15vw]">
          <div className="flex justify-center items-center">
            <div className="text-lg">
              <p>Tổng CV</p>
              <p>đã giao</p>
            </div>
            <SortButton />
          </div>
        </th>
        <th className="w-[13vw] text-center">
          <div className="flex justify-center items-center">
            <div className="text-lg">
              <p>Công việc</p>
              <p>sắp đến hạn</p>
            </div>
            <button className="ml-1 text-xl bg-blue-300">
              <TbArrowsSort />
            </button>
          </div>
        </th>
        <th className="w-[10vw] text-center">
          <div className="flex justify-center items-center">
            <div className="text-lg">
              <p>CV chưa</p>
              <p>hoàn thành</p>
            </div>
            <button className="ml-1 text-xl bg-blue-300">
              <TbArrowsSort />
            </button>
          </div>
        </th>
        <th className="w-[13vw] text-center">
          <div className="flex justify-center items-center">
            <div className="text-lg">
              <p>Tỷ lệ</p>
              <p>hoàn thành</p>
            </div>
            <button className="ml-1 text-xl bg-blue-300">
              <TbArrowsSort />
            </button>
          </div>
        </th>
      </tr>
      <tr>
        <th
          colSpan={7}
          className="bg-blue-500 h-1 border-x border-blue-500"
        ></th>
      </tr>
    </TableHead>
  );
}

export default Sort;
