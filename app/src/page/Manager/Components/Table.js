import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { BiDownload } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Sort from "../../Home/Components/Table/Sort";
import CallApi from "../../../API/CallAPI";
import XLSX from "xlsx";

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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function dataTable() {
      try {
        let res = await CallApi("ldbang", "GET");
        console.log("Bảng", res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    dataTable();
  }, []);

  const cv_tiendo = () => {};

  return (
    <div className="w-full">
      <div className="m-auto p-5">
        <TableContainer component={Paper}>
          <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between px-20">
            <p className="ml-5 text-white text-4xl font-bold">
              Danh sách công việc của mỗi đơn vị
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
            <thead>
              <tr className="border-x">
                <th className="text-left">
                  <p className="text-2xl ml-2">Tên đơn vị</p>
                </th>
                <th className="w-[20vw] text-center">
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
                <th className="w-[13vw]">
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
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <div className="text-lg">
                      <p>Công việc</p>
                      <p>quá hạn</p>
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
            </thead>
            <tbody>
              <>
                {data &&
                  data.map((dv) => (
                    <tr
                      sx={{ "& > *": { borderBottom: "unset" } }}
                      // className={props.index % 2 === 0 ? "bg-blue-200" : ""}
                      className="text-lg h-12"
                    >
                      <td className="text-left font-medium">
                        {/* icon sổ ra cv con */}
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => setOpen(!open)}
                        >
                          {open ? <AiOutlineDown /> : <GrNext />}
                        </IconButton>
                        {/* tên cv */}
                        {dv.dv_ten}
                      </td>
                      <td className="text-center font-normal">
                        {dv.tentruongphon}
                      </td>
                      <td className="text-center font-normal">{dv.tongcv}</td>
                      <td className="text-center font-normal">
                        {dv.sapdenhan}
                      </td>
                      <td className="text-center font-normal">{dv.hethan}</td>
                      <td className="text-center font-medium">
                        {(dv.tiendo = dv.tongcv - (dv.hethan + dv.sapdenhan))}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <th style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                          <thead className="bg-[#6a994e] text-white">
                            <tr className="border-x border-black">
                              <th className="text-left">
                                <p className="text-lg ml-2">
                                  Công việc đã giao
                                </p>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Người</p>
                                    <p>đảm nhận</p>
                                  </div>
                                </div>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Số giờ</p>
                                    <p>đã làm</p>
                                  </div>
                                  <button className="ml-1 text-xl bg-blue-300">
                                    <TbArrowsSort />
                                  </button>
                                </div>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Thời gian</p>
                                    <p>bắt đầu</p>
                                  </div>
                                  <button className="ml-1 text-xl bg-blue-300">
                                    <TbArrowsSort />
                                  </button>
                                </div>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Thời gian</p>
                                    <p>đến hạn</p>
                                  </div>
                                  <button className="ml-1 text-xl bg-blue-300">
                                    <TbArrowsSort />
                                  </button>
                                </div>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Trạng thái</p>
                                    <p>công việc</p>
                                  </div>
                                  <button className="ml-1 text-xl bg-blue-300">
                                    <TbArrowsSort />
                                  </button>
                                </div>
                              </th>
                              <th className="w-[12vw] text-center">
                                <div className="flex justify-center items-center">
                                  <div className="text-sm">
                                    <p>Tỷ lệ</p>
                                    <p>hoàn thành</p>
                                  </div>
                                  <button className="ml-1 text-xl bg-blue-300">
                                    <TbArrowsSort />
                                  </button>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {/* <tbody>
                            {cvCha.congViecCon.map((congViecCon) => (
                              <tr key={congViecCon.id}>
                                <th component="th" scope="row">
                                  {congViecCon.title}
                                </th>
                                <th align="center">{congViecCon.actor}</th>
                                <th align="center">{congViecCon.time}</th>
                                <th align="center">{congViecCon.deadline}</th>
                                <th align="center">
                                  {congViecCon.completionTime}
                                </th>
                                <th align="center">{congViecCon.status}</th>
                                <th align="center">{congViecCon.progress}</th>
                              </tr>
                            ))}
                          </tbody> */}
                        </Table>
                      </Box>
                    </Collapse>
                  </th>
                </tr>
              </>
            </tbody>
            {/* <CustomPagination /> */}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
function HandlePagination(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <BiLastPage /> : <BiFirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <GrFormNext /> : <GrFormPrevious />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <GrFormPrevious /> : <GrFormNext />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <BiFirstPage /> : <BiLastPage />}
      </IconButton>
    </Box>
  );
}

HandlePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CustomPagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty congViecCon.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - congViecCon.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {/* <tbody>
          {(rowsPerPage > 0
            ? congViecCon.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : congViecCon
          ).map((row, index) => (
            <Row row={row} index={index} />
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <th colSpan={6} />
            </tr>
          )}
        </tbody> */}
        <TableFooter>
          <tr>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              // count={congViecCon.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={HandlePagination}
            />
          </tr>
        </TableFooter>
        <Sort />
      </Table>
    </TableContainer>
  );
}
