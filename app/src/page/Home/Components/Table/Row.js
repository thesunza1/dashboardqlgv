import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TbArrowsSort } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { GrNext } from "react-icons/gr";
import moment from "moment";
import CallApi from "../../../../API/CallAPI";

function Row() {
  const [open, setOpen] = useState(false);
  const [cvData, setCvData] = useState([]);
  const [cvDataCon, setCvDataCon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvbang", "GET");
        console.log(res.data);
        setCvData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await CallApi("nvbang", "GET");
        console.log(res.data);
        setCvDataCon(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // const fetchSubTableData = async (id) => {
  //   try {
  //     // trả về mảng con
  //     const response = await CallApi(`nvbang?parent_id=${id}`, "GET");
  //     const subTableData = response.data;
  //     console.log(subTableData);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(error.message);
  //   }
  // };

  return (
    <>
      {cvData &&
        cvData.map((cvCha) => (
          <TableRow
            sx={{
              "& > *": {
                borderBottom: "unset",
                fontSize: "1.15rem",
                height: "20px",
              },
            }}
            key={cvCha.cv_id}
          >
            <TableCell component="th" scope="row">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open);
                  // fetchSubTableData(cvCha.cv_id); // Gửi ID của dòng dữ liệu
                }}
              >
                {open ? <BsChevronDown /> : <GrNext />}
              </IconButton>

              {cvCha.cv_ten}
            </TableCell>
            <TableCell align="center">{cvCha.cv_tgthuchien}</TableCell>
            <TableCell align="center">
              {moment(cvCha.cv_hanhoanthanh).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell align="center">
              {moment(cvCha.cv_thgianhoanthanh).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell align="center">
              {cvCha.cv_trangthai === "Quá hạn" ? (
                <span className="text-red-500">{cvCha.cv_trangthai}</span>
              ) : (
                <span>{cvCha.cv_trangthai}</span>
              )}
            </TableCell>
            <TableCell align="center">{cvCha.cv_tiendo}%</TableCell>
          </TableRow>
        ))}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead className="bg-[#6a994e] text-white">
                  <tr>
                    <th className="text-left">
                      <p className="text-lg ml-2">Công việc đã giao</p>
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
                </TableHead>
                <TableBody>
                  {cvDataCon &&
                    cvDataCon.map((cvCon) => (
                      <TableRow key={cvCon.id} className="border">
                        <TableCell component="th" scope="row">
                          {cvCon.cv_ten}
                        </TableCell>
                        <TableCell align="center">{cvCon.cv_actor}</TableCell>
                        <TableCell align="center">
                          {cvCon.cv_hanhoanthanh}
                        </TableCell>
                        <TableCell align="center">
                          {cvCon.cv_tgthuchien}
                        </TableCell>
                        <TableCell align="center">
                          {cvCon.cv_thgianhoanthanh}
                        </TableCell>
                        <TableCell align="center">
                          {cvCon.cv_trangthai}
                        </TableCell>
                        <TableCell align="center">{cvCon.cv_tiendo}%</TableCell>
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

export default Row;
