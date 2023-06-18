import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiDownload } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import XLSX from "xlsx";
import CallApi from "../../../API/CallAPI";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    workSmall: [
      {
        id: 1,
        title: "Lập trình 2 chức năng",
        actor: "Nguyen Van A",
        time: "11",
        deadline: "15/06/2023",
        completionTime: "14/06/2023",
        status: "Chưa hoàn thành",
        progress: "90%",
      },
      {
        id: 6,
        title: "Lập trình 1 chức năng",
        actor: "Nguyen Van A",
        time: "2",
        deadline: "15/05/2023",
        completionTime: "24/05/2023",
        status: "Quá hạn",
        progress: "10%",
      },
      {
        id: 3,
        title: "Lập trình 1 chức năng",
        actor: "Nguyen Van A",
        time: "2",
        deadline: "15/05/2023",
        completionTime: "24/05/2023",
        status: "Quá hạn",
        progress: "10%",
      },
    ],
  };
}

const rows = [
  createData(
    "Lập trình 4 chức năng",
    "2",
    "15/06/2023",
    "14/06/2023",
    "Chưa hoàn thành",
    "90%"
  ),
  createData(
    "Triển khai",
    "2",
    "15/05/2023",
    "24/05/2023",
    "Chưa hoàn thành",
    "10%"
  ),
  createData("Hổ trợ", "2", "15/05/2023", "14/05/2023", "Quá hạn", "82%"),
  createData("Viết báo cáo", "2", "15/06/2023", "24/05/2023", "Quá hạn", "93%"),
  createData("Lập kế hoạch", "2", "15/05/2023", "04/05/2023", "Quá hạn", "87%"),
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        // className={props.index % 2 === 0 ? "bg-blue-200" : ""}
        className="text-lg h-12"
      >
        <th className="text-left font-medium">
          {/* icon sổ ra cv con */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineDown /> : <GrNext />}
          </IconButton>
          {/* tên cv */}
          {row.name}
        </th>
        <th className="text-center font-normal">{row.calories}</th>
        <th className="text-center font-normal">{row.fat}</th>
        <th className="text-center font-normal">{row.carbs}</th>
        <th className="text-center font-normal">
          {row.protein}
          {/* {row.protein === "Chưa hoàn thành" ? (
                    <span className="text-gray-700">{row.protein}</span>
                ) : (
                    <span className="text-red-500">{row.protein}</span>
                )} */}
        </th>
        <th className="text-center font-medium">{row.price}</th>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead className="bg-[#6a994e] text-white">
                  <TableRow className="border-x border-black">
                    <TableCell className="text-left">
                      <p className="text-xl ml-2">Công việc con</p>
                    </TableCell>
                    <TableCell className="w-[13vw]">
                      <div className="flex text-lg justify-center items-center">
                        <div>
                          <p>Người</p>
                          <p>đảm nhận</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="w-[13vw]">
                      <div className="flex text-lg justify-center items-center">
                        <div>
                          <p>Thời gian </p>
                          <p>thực hiện</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="w-[13vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <div>
                          <p>Thời hạn</p>
                          <p>công việc</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="w-[13vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <div>
                          <p>Thời gian</p>
                          <p>hoàn thành</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="w-[13vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <div>
                          <p>Trạng thái</p>
                          <p>công việc</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="w-[13vw]">
                      <div className="flex text-lg justify-center items-center text-center">
                        <div>
                          <p>Tỷ lệ</p>
                          <p>hoàn thành</p>
                        </div>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.workSmall.map((workSmallRow) => (
                    <TableRow key={workSmallRow.id} className="border-x h-10">
                      <TableCell component="th" scope="row">
                        {workSmallRow.title}
                      </TableCell>
                      <TableCell align="center">{workSmallRow.actor}</TableCell>
                      <TableCell align="center">{workSmallRow.time}</TableCell>
                      <TableCell align="center">
                        {workSmallRow.deadline}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.completionTime}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.status}
                      </TableCell>
                      <TableCell align="center">
                        {workSmallRow.progress}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable() {
  function exportToExcel() {
    const table = document.getElementsByTagName("table")[0]; // lấy table HTML đầu tiên trong document
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");
    const date = new Date().toISOString().slice(0, 10);
    const filename = `Danh sách công việc - ${date}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  return (
    <div className="w-full">
      <div className="m-auto p-5">
        <TableContainer component={Paper}>
          <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between px-20">
            <p className="ml-5 text-white text-4xl font-bold">
              Danh sách các công việc
            </p>
            <button
              onClick={exportToExcel}
              className="flex mr-5 bg-[#6a994e] p-2 rounded-lg items-center"
            >
              <p className="text-xl text-white font-bold">Xuất Excel</p>
              <div className="ml-2 text-white text-2xl">
                <BiDownload />
              </div>
            </button>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <tr className="border-x border-black">
                <th className="text-left">
                  <p className="text-2xl ml-2">Công việc được giao</p>
                </th>
                <th className="w-[15vw]">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Thời gian </p>
                      <p>thực hiện</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[15vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Thời hạn</p>
                      <p>công việc</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[15vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Thời gian</p>
                      <p>hoàn thành</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[15vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Trạng thái</p>
                      <p>công việc</p>
                    </div>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[15vw] text-center">
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
                <th colSpan={7} className="bg-blue-500 h-2"></th>
              </tr>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row key={row.id} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
