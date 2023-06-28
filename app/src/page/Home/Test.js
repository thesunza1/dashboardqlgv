// import { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { BiDownload } from "react-icons/bi";
// import { BsArrowUp, BsArrowDown } from "react-icons/bs";
// import { TbArrowsSort } from "react-icons/tb";
// import { AiOutlineDown } from "react-icons/ai";
// import { GrNext, GrPrevious } from "react-icons/gr";
// import XLSX from "xlsx";
// import moment from "moment";
// import ReactPaginate from "react-paginate";
// import CallApi from "../../API/CallAPI";

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = useState(false);
//   const [hover, setHover] = useState(false);
//   const [hasCvCon, setHasCvCon] = useState(false);

//   const onMouseEnter = () => {
//     setHover(true);
//   };

//   const onMouseLeave = () => {
//     setHover(false);
//   };
//   useEffect(() => {
//     // Nếu có CvCon thì set hasCvCon là true
//     if (row.CvCon.length > 0) {
//       setHasCvCon(true);
//     } else {
//       setHasCvCon(false);
//     }
//   }, [row.CvCon]);

//   // set trạng thái công việc
//   function trangThai(trangThai) {
//     switch (trangThai) {
//       case "2":
//         return (
//           <div className="bg-[#178df0] text-white rounded-lg text-base font-bold py-1">
//             Đang thực hiện
//           </div>
//         );
//       case "3":
//         return (
//           <div className="bg-[#90ca74] text-white rounded-lg text-base font-bold py-1">
//             Hoàn thành
//           </div>
//         );
//       case "4":
//         return (
//           <div className="bg-[#ee6765] text-white rounded-lg text-base font-bold py-1">
//             Quá hạn
//           </div>
//         );
//       default:
//         return "";
//     }
//   }

//   return (
//     <>
//       {/* body cha */}
//       <TableRow
//         sx={{ "& > *": { borderBottom: "unset" } }}
//         className={props.index % 2 === 0 ? "bg-blue-50" : ""}
//         style={{
//           height: "50px",
//           fontSize: "1.25rem",
//           backgroundColor: hover ? "#d3d3d3" : "",
//         }}
//         onMouseEnter={onMouseEnter}
//         onMouseLeave={onMouseLeave}
//       >
//         <th className="items-center text-left font-medium">
//           {/* icon sổ ra cv con */}
//           <div className="flex">
//             <IconButton
//               aria-label="expand row"
//               size="small"
//               onClick={() => setOpen(!open)}
//               sx={{ display: hasCvCon ? "block" : "none" }}
//             >
//               {open ? <AiOutlineDown /> : <GrNext />}
//             </IconButton>
//             <p className="block">{row.dv_ten}</p>
//           </div>
//         </th>
//         <th className="text-left font-normal">{row.tentruongphong}</th>
//         <th className="text-center font-medium">{row.tongcv}</th>
//         <th className="text-center font-normal">{row.sapdenhan}</th>
//         <th className="text-center font-normal">{row.hethan}</th>
//         <th className="text-center font-normal">
//           {typeof row.tile === "number" && row.tile % 1 !== 0
//             ? row.tile.toFixed(1) + "%"
//             : row.tile + "%"}
//         </th>
//       </TableRow>

//       {/* Công việc của từng đơn vị */}
//       <TableRow className={props.index % 2 === 0 ? "bg-blue-50" : ""}>
//         <TableCell style={{ paddingBottom: 5, paddingTop: 5 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Table size="small" aria-label="purchases">
//                 {/* Head của công việc con */}
//                 <TableHead className="bg-[#6a994e] text-white">
//                   <tr>
//                     <th className="text-left">
//                       <p className="text-lg ml-2">Công việc đã giao</p>
//                     </th>
//                     <th className="w-[14vw]">
//                       <div className="flex text-lg ">Người đảm nhận</div>
//                     </th>
//                     <th className="w-[10vw]">
//                       <div className="flex text-lg justify-center items-center">
//                         <button>
//                           <p>Thời gian </p>
//                           <p>thực hiện </p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[12vw] text-center">
//                       <div className="flex text-lg justify-center items-center">
//                         <button>
//                           <p>Thời hạn</p>
//                           <p>công việc</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[12vw] text-center">
//                       <div className="flex text-lg justify-center items-center">
//                         <button>
//                           <p>Thời gian</p>
//                           <p>hoàn thành</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[10vw] text-center">
//                       <div className="flex text-lg justify-center items-center">
//                         <button>
//                           <p>Trạng thái</p>
//                           <p>công việc</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[10vw]">
//                       <div className="flex text-lg justify-center items-center text-center">
//                         <button>
//                           <p>Tỷ lệ</p>
//                           <p>hoàn thành</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                   </tr>
//                 </TableHead>
//                 <TableBody>
//                   {row.CvCon.map((CvConRow) => (
//                     <TableRow
//                       key={CvConRow.cv_id}
//                       className="border-x border-b h-10 bg-white"
//                     >
//                       <td className="text-left text-lg pl-3">
//                         {CvConRow.cv_ten}
//                       </td>

//                       <td className="text-left text-lg">{CvConRow.nv_ten}</td>

//                       <td className="text-center text-lg">
//                         {CvConRow.cv_tgthuchien}
//                       </td>

//                       <td className="text-center text-lg">
//                         {CvConRow.cv_hanhoanthanh
//                           ? moment(CvConRow.cv_hanhoanthanh).format(
//                               "DD/MM/YYYY"
//                             )
//                           : ""}
//                       </td>

//                       <td className="text-center text-lg">
//                         {CvConRow.cv_thgianhoanthanh
//                           ? moment(CvConRow.cv_thgianhoanthanh).format(
//                               "DD/MM/YYYY"
//                             )
//                           : ""}
//                       </td>

//                       <td className="text-center text-lg">
//                         {trangThai(CvConRow.cv_trangthai)}
//                       </td>

//                       <td className="text-center text-lg">
//                         {typeof CvConRow.cv_tiendo === "number" &&
//                         CvConRow.cv_tiendo % 1 !== 0
//                           ? CvConRow.cv_tiendo.toFixed(1) + "%"
//                           : CvConRow.cv_tiendo + "%"}
//                       </td>
//                       <th className="text-center font-normal"></th>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// }

// export default function CollapsibleTable() {
//   const [data, setData] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [sortColumn, setSortColumn] = useState("");
//   const [sortDirection, setSortDirection] = useState("");

//   // set số dòng dữ liệu hiển thị trên mỗi page là 5
//   const usersPerPage = 5;
//   const pagesVisited = pageNumber * usersPerPage;
//   const displayData = data.slice(pagesVisited, pagesVisited + usersPerPage);

//   const pageCount = Math.ceil(data.length / usersPerPage);

//   // kiểm tra độ dài của mảng data
//   const noData = data.length === 0;
//   const isShortData = data.length <= usersPerPage;

//   function handlePageClick({ selected: selectedPage }) {
//     setPageNumber(selectedPage);
//   }
//   const handleSortColumn = (key) => {
//     if (sortColumn === key) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(key);
//       setSortDirection("desc");
//     }
//   };

//   useEffect(() => {
//     async function dataTable() {
//       try {
//         let res = await CallApi("ldbang", "GET");
//         console.log("Bảng", res.data);
//         setData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     dataTable();
//   }, []);

//   function exportToExcel() {
//     const table = document.getElementsByTagName("table")[0]; // lấy table HTML đầu tiên trong document
//     const worksheet = XLSX.utils.table_to_sheet(table);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách công việc");
//     const date = new Date().toISOString().slice(0, 10);
//     const filename = `Danh sách công việc - ${date}.xlsx`;
//     XLSX.writeFile(workbook, filename);
//   }

//   return (
//     <div className="w-full">
//       {noData ? (
//         <div>Không có dữ liệu để hiển thị</div>
//       ) : (
//         <div className="m-auto px-5 py-3">
//           <TableContainer component={Paper}>
//             {/* Phần Excel */}
//             <div className="flex  bg-[#1982c4] w-full h-12 items-center justify-between px-20">
//               <p className="ml-5 text-white text-3xl font-bold">
//                 Danh sách đơn vị trực thuộc
//               </p>
//               <button
//                 onClick={exportToExcel}
//                 className="flex mr-5 bg-[#6a994e] hover:bg-green-500 p-1 rounded-lg items-center"
//               >
//                 <p className="text-lg text-white font-bold">Xuất Excel</p>
//                 <div className="ml-2 text-white text-xl">
//                   <BiDownload />
//                 </div>
//               </button>
//             </div>
//             {isShortData ? ( // kiểm tra nếu dữ liệu ít hơn hoặc bằng 5 dòng thì hiển thị toàn bộ, không phân trang
//               <Table aria-label="collapsible table">
//                 {/* head cha */}
//                 <TableHead>
//                   <tr>
//                     <th className="text-left">
//                       <p className="text-xl ml-2">Tên đơn vị</p>
//                     </th>
//                     {/* <th className="w-[15vw]">
//                       <div className="flex items-center">
//                         <div className="text-lg">Trưởng đơn vị</div>
//                       </div>
//                     </th> */}
//                     <th
//                       onClick={() => handleSortColumn("tentruongphong")}
//                       className="cursor-pointer"
//                     >
//                       {" "}
//                       <span className="text-gray-900 font-medium">
//                         Tên công việc
//                       </span>{" "}
//                       {sortColumn === "tentruongphong" && (
//                         <IconButton
//                           icon={
//                             sortDirection === "asc" ? BsArrowUp : BsArrowDown
//                           }
//                           className="h-4 w-4 ml-2"
//                         />
//                       )}{" "}
//                     </th>
//                     <th className="w-[13vw]">
//                       <div className="flex justify-center items-center">
//                         <button className="text-lg">
//                           <p>Tổng CV </p>
//                           <p>đã giao</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[13vw] text-center">
//                       <div className="flex justify-center items-center">
//                         <button className="text-lg">
//                           <p>Công việc</p>
//                           <p>sắp tới hạn</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>

//                     <th className="w-[13vw] text-center">
//                       <div className="flex justify-center items-center">
//                         <button className="text-lg">
//                           <p>Công việc</p>
//                           <p>quá hạn</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                     <th className="w-[13vw] text-center">
//                       <div className="flex justify-center items-center">
//                         <button className="text-lg">
//                           <p>Tỷ lệ</p>
//                           <p>hoàn thành</p>
//                         </button>
//                         <button className="ml-1 text-xl bg-blue-300">
//                           <TbArrowsSort />
//                         </button>
//                       </div>
//                     </th>
//                   </tr>
//                   <tr>
//                     <th colSpan={6} className="bg-blue-500 h-2"></th>
//                   </tr>
//                 </TableHead>
//                 <TableBody>
//                   {data.map((row, index) => (
//                     <Row key={row.id} row={row} index={index} />
//                   ))}
//                 </TableBody>
//               </Table>
//             ) : (
//               // nếu dữ liệu lớn hơn 5 dòng thì mới phân trang
//               <>
//                 <Table aria-label="collapsible table">
//                   {/* head cha */}
//                   <TableHead>
//                     <tr>
//                       <th className="text-left">
//                         <p className="text-xl ml-2">Tên đơn vị</p>
//                       </th>
//                       <th className="w-[15vw]">
//                         <div className="flex items-center">
//                           <div className="text-lg">Trưởng đơn vị</div>
//                         </div>
//                       </th>
//                       <th className="w-[13vw]">
//                         <div className="flex justify-center items-center">
//                           <button className="text-lg">
//                             <p>Tổng CV </p>
//                             <p>đã giao</p>
//                           </button>
//                           <button className="ml-1 text-xl bg-blue-300">
//                             <TbArrowsSort />
//                           </button>
//                         </div>
//                       </th>
//                       <th className="w-[13vw] text-center">
//                         <div className="flex justify-center items-center">
//                           <button className="text-lg">
//                             <p>Công việc</p>
//                             <p>sắp tới hạn</p>
//                           </button>
//                           <button className="ml-1 text-xl bg-blue-300">
//                             <TbArrowsSort />
//                           </button>
//                         </div>
//                       </th>

//                       <th className="w-[13vw] text-center">
//                         <div className="flex justify-center items-center">
//                           <button className="text-lg">
//                             <p>Công việc</p>
//                             <p>quá hạn</p>
//                           </button>
//                           <button className="ml-1 text-xl bg-blue-300">
//                             <TbArrowsSort />
//                           </button>
//                         </div>
//                       </th>
//                       <th className="w-[13vw] text-center">
//                         <div className="flex justify-center items-center">
//                           <button className="text-lg">
//                             <p>Tỷ lệ</p>
//                             <p>hoàn thành</p>
//                           </button>
//                           <button className="ml-1 text-xl bg-blue-300">
//                             <TbArrowsSort />
//                           </button>
//                         </div>
//                       </th>
//                     </tr>
//                     <tr>
//                       <th colSpan={6} className="bg-blue-500 h-2"></th>
//                     </tr>
//                   </TableHead>
//                   <TableBody>
//                     {displayData.map((row, index) => (
//                       <Row key={row.id} row={row} index={index} />
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <div className="flex items-center justify-center">
//                   <ReactPaginate
//                     previousLabel={<GrPrevious />}
//                     nextLabel={<GrNext />}
//                     breakLabel={"..."}
//                     pageCount={pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={handlePageClick}
//                     containerClassName={"pagination"}
//                     activeClassName={"active"}
//                   />
//                 </div>
//               </>
//             )}
//           </TableContainer>
//         </div>
//       )}
//     </div>
//   );
// }
