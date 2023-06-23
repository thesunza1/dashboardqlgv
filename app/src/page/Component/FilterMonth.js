import React, { useState, useEffect } from "react";

const apiUrl = "https://example.com/api/data";
const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDataByMonth = (data, selectedMonth) => {
  return data.filter(
    (item) => new Date(item.date).getMonth() + 1 === selectedMonth
  );
};

const FilterMonth = () => {
  const [allData, setAllData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedMonth(new Date().getMonth() + 1);
    }, 1000 * 60); // update every minute
    return () => clearInterval(intervalId);
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  const filteredData = getDataByMonth(allData, selectedMonth);

  return (
    <div>
      <h2>Select month:</h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <h2>Data for {months[selectedMonth]}</h2>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterMonth;
