import { useState, useEffect } from "react";
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
import moment from "moment";
import CallApi from "../../API/CallAPI";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <>
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
        <th className="text-left font-medium">
          {/* icon sổ ra cv con */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <AiOutlineDown /> : <GrNext />}
          </IconButton>
          {row.cv_trangthai}
        </th>
        <th className="text-left font-normal">{row.cv_trangthai}</th>
        <th className="text-center font-medium">{row.cv_trangthai}</th>
        <th className="text-center font-normal">{row.cv_trangthai}</th>
        <th className="text-center font-normal">{row.cv_trangthai}</th>
        <th className="text-center font-normal">{row.cv_trangthai}%</th>
      </TableRow>

      {/* Công việc của từng đơn vị */}
      <TableRow>
        <TableCell style={{ paddingBottom: 5, paddingTop: 5 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                {/* Head của công việc con */}
                <TableHead className="bg-[#6a994e] text-white">
                  <tr>
                    <th className="text-left">
                      <p className="text-lg ml-2">Công việc đã giao</p>
                    </th>
                    <th className="w-[14vw]">
                      <div className="flex text-lg ">Người đảm nhận</div>
                    </th>
                    <th className="w-[10vw]">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời gian </p>
                          <p>thực hiện </p>
                        </button>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời hạn</p>
                          <p>công việc</p>
                        </button>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[12vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Thời gian</p>
                          <p>hoàn thành</p>
                        </button>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[10vw] text-center">
                      <div className="flex text-lg justify-center items-center">
                        <button>
                          <p>Trạng thái</p>
                          <p>công việc</p>
                        </button>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                    <th className="w-[10vw]">
                      <div className="flex text-lg justify-center items-center text-center">
                        <button>
                          <p>Tỷ lệ</p>
                          <p>hoàn thành</p>
                        </button>
                        <button className="ml-1 text-xl bg-blue-300">
                          <TbArrowsSort />
                        </button>
                      </div>
                    </th>
                  </tr>
                </TableHead>
                <TableBody>
                  {row &&
                    row.CvCon.map((CvConRow) => (
                      <TableRow
                        key={CvConRow.cv_trangthai}
                        className="border-x border-b h-10"
                      >
                        <td className="text-left text-lg pl-3">
                          {CvConRow.cv_trangthai}
                        </td>

                        <td className="text-left text-lg">
                          {CvConRow.cv_trangthai}
                        </td>

                        <td className="text-center text-lg">
                          {CvConRow.cv_trangthai}
                        </td>

                        <td className="text-center text-lg">
                          {CvConRow.cv_trangthai
                            ? moment(CvConRow.cv_trangthai).format("DD/MM/YYYY")
                            : ""}
                        </td>

                        <td className="text-center text-lg">
                          {CvConRow.cv_trangthai
                            ? moment(CvConRow.cv_trangthai).format("DD/MM/YYYY")
                            : ""}
                        </td>

                        <td className="text-center text-lg">
                          {CvConRow.cv_trangthai}
                        </td>

                        <td className="text-center text-lg">
                          {CvConRow.cv_trangthai}%
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
  const [data, setData] = useState([]);

  useEffect(() => {
    async function dataTable() {
      try {
        let res = await CallApi("nvbang", "GET");
        console.log("Bảng", res.data);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    dataTable();
  }, []);

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
        <TableContainer component={Paper}>
          {/* Phần Excel */}
          <div className="flex  bg-[#1982c4] w-full h-12 items-center justify-between px-20">
            <p className="ml-5 text-white text-3xl font-bold">
              Danh sách các công việc
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
          <Table aria-label="collapsible table">
            <TableHead>
              <tr>
                <th className="text-left">
                  <p className="text-xl ml-2">Tên đơn vị</p>
                </th>
                <th className="w-[15vw]">
                  <div className="flex items-center">
                    <div className="text-lg">Trưởng đơn vị</div>
                  </div>
                </th>
                <th className="w-[13vw]">
                  <div className="flex justify-center items-center">
                    <button className="text-lg">
                      <p>Tổng CV </p>
                      <p>đã giao</p>
                    </button>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button className="text-lg">
                      <p>Công việc</p>
                      <p>sắp tới hạn</p>
                    </button>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>

                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button className="text-lg">
                      <p>Công việc</p>
                      <p>quá hạn</p>
                    </button>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
                <th className="w-[13vw] text-center">
                  <div className="flex justify-center items-center">
                    <button className="text-lg">
                      <p>Tỷ lệ</p>
                      <p>hoàn thành</p>
                    </button>
                    <button className="ml-1 text-xl bg-blue-300">
                      <TbArrowsSort />
                    </button>
                  </div>
                </th>
              </tr>
              <tr>
                <th colSpan={6} className="bg-blue-500 h-2"></th>
              </tr>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, index) => (
                  <Row key={row.cv_trangthai} row={row} index={index} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
