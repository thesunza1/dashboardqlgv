import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BiDownload } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import XLSX from "xlsx";
import moment from "moment";
import ExampleContext from "../../Component/FilterMonth";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [hasCvCon, setHasCvCon] = useState(false);

  useEffect(() => {
    // Nếu có CvCon thì set hasCvCon là true
    if (row.CvCon.length > 0) {
      setHasCvCon(true);
    } else {
      setHasCvCon(false);
    }
  }, [row.CvCon]);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  // set trạng thái công việc
  function trangThai(trangThai) {
    switch (trangThai) {
      case "2":
        return (
          <div className="bg-[#178df0] text-white rounded-lg text-base font-bold py-1">
            Đang thực hiện
          </div>
        );
      case "3":
        return (
          <div className="bg-[#90ca74] text-white rounded-lg text-base font-bold py-1">
            Hoàn thành
          </div>
        );
      case "4":
        return (
          <div className="bg-[#ee6765] text-white rounded-lg text-base font-bold py-1">
            Quá hạn
          </div>
        );
      default:
        return "";
    }
  }

  return (
    <>
      {/* body cha */}
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        className={props.index % 2 === 0 ? "bg-blue-50" : ""}
        style={{
          height: "50px",
          fontSize: "1.25rem",
          backgroundColor: hover ? "#d3d3d3" : "",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <th className="text-left font-medium w-[2vw]">
          {/* icon sổ ra cv con */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ display: hasCvCon ? "block" : "none" }}
          >
            {open ? <AiOutlineDown /> : <GrNext />}
          </IconButton>
        </th>
        <th className="text-left font-medium">{row.dv_ten}</th>
        <th className="text-left font-normal">{row.tentruongphong}</th>
        <th className="text-center font-medium">{row.tongcv}</th>
        <th className="text-center font-normal">{row.sapdenhan}</th>
        <th className="text-center font-normal">{row.hethan}</th>
        <th className="text-center font-normal">
          {typeof row.tile === "number" && row.tile % 1 !== 0
            ? row.tile.toFixed(1) + "%"
            : row.tile + "%"}
        </th>
      </TableRow>

      {/* Công việc của từng đơn vị */}
      <TableRow className={props.index % 2 === 0 ? "bg-blue-50" : ""}>
        <TableCell style={{ paddingBottom: 5, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                {/* Head của công việc con */}
                <TableHead className="bg-[#6a994e] text-white">
                  <tr className="text-lg h-12">
                    <th className="text-left pl-2">Tên công việc</th>
                    <th className="w-[14vw]">Người đảm nhận</th>
                    <th className="w-[10vw] text-center">Thực hiện</th>
                    <th className="w-[12vw] text-center">Hạn công việc</th>
                    <th className="w-[12vw] text-center">Hoàn thành</th>
                    <th className="w-[10vw] text-center">Trạng thái</th>
                    <th className="w-[12vw] text-center">Tỷ lệ hoàn thành</th>
                  </tr>
                </TableHead>
                <TableBody>
                  {row.CvCon.map((CvConRow) => (
                    <TableRow
                      key={CvConRow.cv_id}
                      className="border-x border-b h-10 bg-white"
                    >
                      <td className="text-left text-lg pl-2">
                        {CvConRow.cv_ten}
                      </td>

                      <td className="text-left text-lg">{CvConRow.nv_ten}</td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_tgthuchien} giờ
                      </td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_hanhoanthanh
                          ? moment(CvConRow.cv_hanhoanthanh).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>

                      <td className="text-center text-lg">
                        {CvConRow.cv_thgianhoanthanh
                          ? moment(CvConRow.cv_thgianhoanthanh).format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>

                      <td className="text-center text-lg">
                        {trangThai(CvConRow.cv_trangthai)}
                      </td>

                      <td className="text-center text-lg">
                        {typeof CvConRow.cv_tiendo === "number" &&
                        CvConRow.cv_tiendo % 1 !== 0
                          ? CvConRow.cv_tiendo.toFixed(1) + "%"
                          : CvConRow.cv_tiendo + "%"}
                      </td>
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
  const { data: thang } = React.useContext(ExampleContext);

  const [data, setData] = useState(thang?.LdBang);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortState, setSortState] = useState({
    columnName: "",
    direction: "asc",
  });

  useEffect(() => {
    if (thang) {
      setData(thang.LdBang);
    }
  }, [thang]);

  if (!data) {
    console.log("data", data);
    return null;
  }

  function compare(a, b, columnName, direction) {
    const valueA = a[columnName];
    const valueB = b[columnName];

    if (direction === "asc") {
      if (valueA < valueB) {
        return -1;
      }
      if (valueA > valueB) {
        return 1;
      }
      return 0;
    } else {
      if (valueA > valueB) {
        return -1;
      }
      if (valueA < valueB) {
        return 1;
      }
      return 0;
    }
  }

  const handleSort = (columnName) => {
    let direction = "asc";
    if (sortState.columnName === columnName && sortState.direction === "asc") {
      direction = "desc";
    }
    setSortState({
      columnName,
      direction,
    });

    setData((prevData) => {
      const sortedData = prevData.sort((a, b) =>
        compare(a, b, columnName, direction)
      );
      return [...sortedData];
    });
  };

  // kiểm tra độ dài của mảng data
  const noData = data.length === 0;

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
      <div className="m-auto px-5 py-3">
        {/* Phần Excel */}
        <div className="flex w-full h-12 items-center justify-between">
          <p className="ml-5 text-gray-700 text-3xl font-bold">
            Danh sách đơn vị trực thuộc
          </p>
          <button
            onClick={exportToExcel}
            className="flex mr-5 bg-[#6a994e] hover:bg-green-500 p-1 rounded-lg items-center"
          >
            <p className="text-lg text-white font-bold">Xuất Excel</p>
            <div className="ml-2 text-white text-xl">
              <BiDownload />
            </div>
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            {/* head cha */}
            <TableHead>
              <tr className="text-xl h-14 border-b-2 text-white bg-[#1982c4]">
                <th className="w-[2vw]"></th>
                <th className="text-left">
                  <button
                    onClick={() => handleSort("dv_ten")}
                    className={`focus:outline-none ${
                      sortState.columnName === "dv_ten" ? "text-gray-900" : ""
                    }`}
                  >
                    Tên đơn vị
                  </button>
                </th>
                <th className="w-[15vw]">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleSort("tentruongphong")}
                      className={`focus:outline-none ${
                        sortState.columnName === "tentruongphong"
                          ? "text-gray-900"
                          : ""
                      }`}
                    >
                      Trưởng đơn vị
                    </button>
                  </div>
                </th>
                <th className="w-[13vw]">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleSort("tongcv")}
                      className={`focus:outline-none ${
                        sortState.columnName === "tongcv" ? "text-gray-900" : ""
                      }`}
                    >
                      Tổng công việc
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleSort("sapdenhan")}
                      className={`focus:outline-none ${
                        sortState.columnName === "sapdenhan"
                          ? "text-gray-900"
                          : ""
                      }`}
                    >
                      Sắp đến hạn
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleSort("hethan")}
                      className={`focus:outline-none ${
                        sortState.columnName === "hethan" ? "text-gray-900" : ""
                      }`}
                    >
                      Quá hạn
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleSort("tile")}
                      className={`focus:outline-none ${
                        sortState.columnName === "tile" ? "text-gray-900" : ""
                      }`}
                    >
                      Tỷ lệ hoàn thành
                    </button>
                  </div>
                </th>
              </tr>
            </TableHead>
            {noData ? (
              <th colSpan={7} className="py-5 text-2xl">
                Không có dữ liệu để hiển thị
              </th>
            ) : (
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <Row key={row.id} row={row} index={index} />
                  ))}

                {/* Phần phân trang */}
                <th colSpan={7} className="text-xl">
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                      setRowsPerPage(parseInt(event.target.value, 10));
                      setPage(0);
                    }}
                  />
                </th>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
