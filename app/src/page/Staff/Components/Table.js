import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BiDownload } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb"
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr"
import XLSX from 'xlsx';



function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  price,
) {
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
            time: "11 giờ",
            deadline: "15/06/2023",
            completionTime: "14/06/2023",
            status: "Chưa hoàn thành",
            progress: "90%",
        },
        {
            id: 6,
            title: "Lập trình 1 chức năng",
            time: "2 giờ",
            deadline: "15/05/2023",
            completionTime: "24/05/2023",
            status: "Quá hạn",
            progress: "10%",
        },
        {
            id: 3,
            title: "Lập trình 1 chức năng",
            time: "2 giờ",
            deadline: "15/05/2023",
            completionTime: "24/05/2023",
            status: "Quá hạn",
            progress: "10%",
        },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
//   .table-row-gray {
//     background-color: #f2f2f2;
//   }
  
//   .table-row-yellow {
//     background-color: #ffffcc;
//   }  

  return (
    <>
        <TableRow 
        sx={{ '& > *': { borderBottom: 'unset' } }}
        className={props.index % 2 === 0 ? "bg-blue-200" : ""}
        >

        <TableCell component="th" scope="row">
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <AiOutlineDown /> : <GrNext />}
            </IconButton>

            {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">
            {row.protein === "Chưa hoàn thành" ? (
                <span className="text-gray-700">{row.protein}</span>
            ) : (
                <span className="text-red-500">{row.protein}</span>
            )}
        </TableCell>
        <TableCell align="center">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div" className='bg-green-200 pl-2'>
                Công việc con
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead className='bg-[#6a994e] text-white'>
                  <TableRow className="border-x border-black">
                    <TableCell className="text-left">
                        <p className="text-xl ml-2">Công việc con</p>
                    </TableCell>
                    <TableCell className="w-40">
                        <div className="flex justify-center items-center">
                            <div>
                                <p>Thời gian </p>
                                <p>thực hiện</p>
                            </div>
                            {/* <button 
                                className="ml-1 text-xl bg-blue-300 z-1 0 position" 
                                onClick={toggleOptionsTime}
                            >
                                <div className="flex items-center">
                                    {showOptionsTime ? (
                                        <TbArrowsSort className="text-xl text-white" />
                                    ) : (
                                        <TbArrowsSort className="text-xl" />
                                    )}
                                </div>
                            </button>
                            {showOptionsTime && (
                                <ul className="border border-black bg-white py-2">
                                    <li className="w-full">
                                        <a 
                                            className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                            href="#" 
                                            onClick={() => handleOptionTimeClick('Lựa chọn 1')}>
                                            <span className='px-2'>Cao - Thấp</span>
                                            
                                        </a>
                                    </li>
                                    <li className="w-full mt-2">
                                        <a 
                                            className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                            href="#" 
                                            onClick={() => handleOptionTimeClick('Lựa chọn 2')}>
                                            <span className='px-2'>Thấp - Cao</span>
                                        </a>
                                    </li>
                                </ul>
                            )} */}
                            {/* <button className="ml-1 text-xl bg-blue-300">
                                <TbArrowsSort/>
                            </button> */}
                        </div>
                    </TableCell>
                    <TableCell className="w-40 text-center">
                        <div className="flex justify-center items-center">
                            <div>
                                <p>Thời hạn</p>
                                <p>công việc</p>
                            </div>
                            <button className="ml-1 text-xl bg-blue-300">
                                <TbArrowsSort/>
                            </button>
                        </div>
                    </TableCell>
                    <TableCell className="w-40 text-center">
                        <div className="flex justify-center items-center">
                            <div>
                                <p>Thời gian</p>
                                <p>hoàn thành</p>
                            </div>
                            <button className="ml-1 text-xl bg-blue-300">
                                <TbArrowsSort/>
                            </button>
                        </div>
                    </TableCell>
                    <TableCell className="w-48 text-center">
                        <div className="flex justify-center items-center">
                            <div>
                                <p>Trạng thái</p>
                                <p>công việc</p>
                            </div>
                            <button className="ml-1 text-xl bg-blue-300">
                                <TbArrowsSort/>
                            </button>
                        </div>
                    </TableCell>
                    <TableCell className="w-40 text-center">
                        <div className="flex justify-center items-center">
                            <div>
                                <p>Tỷ lệ</p>
                                <p>hoàn thành</p>
                            </div>
                            <button className="ml-1 text-xl bg-blue-300">
                                <TbArrowsSort/>
                            </button>
                        </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.workSmall.map((workSmallRow) => (
                    <TableRow key={workSmallRow.id}>
                      <TableCell component="th" scope="row">
                        {workSmallRow.title}
                      </TableCell>
                      <TableCell align='center'>{workSmallRow.time}</TableCell>
                      <TableCell align="center">{workSmallRow.deadline}</TableCell>
                      <TableCell align="center">{workSmallRow.completionTime}</TableCell>
                      <TableCell align="center">{workSmallRow.status}</TableCell>
                      <TableCell align="center">{workSmallRow.progress}</TableCell>
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

const rows = [
    createData("Lập trình 4 chức năng" ,"2 giờ", "15/06/2023", "14/06/2023", "Chưa hoàn thành", "90%"),
    createData("Triển khai", "2 giờ", "15/05/2023", "24/05/2023", "Quá hạn", "10%"),
    createData('Hổ trợ', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
    
    function exportToExcel() {
        const table = document.getElementsByTagName('table')[0]; // lấy table HTML đầu tiên trong document
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách công việc');
        const date = new Date().toISOString().slice(0, 10);
        const filename = `Danh sách công việc - ${date}.xlsx`;
        XLSX.writeFile(workbook, filename);
    }

    const [showOptionsTime, setShowOptionsTime] = useState(false);

    function toggleOptionsTime() {  
        setShowOptionsTime(!showOptionsTime);
    }

    function handleOptionTimeClick(option) {
        console.log(`Selected option: ${option}`);
        setShowOptionsTime(false);
    }

    return (
        <div className="w-full">
            <div className="m-auto p-5">
                <TableContainer component={Paper}>
                    <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between">
                        <p className="ml-5 text-white text-4xl font-bold">
                            Danh sách các công việc
                        </p>
                        <button onClick={exportToExcel} className="flex mr-5 bg-[#6a994e] p-2 rounded-lg items-center">
                            <p className="text-xl text-white font-bold">
                                Xuất Excel
                            </p>
                            <div className="ml-2 text-white text-2xl">
                                <BiDownload/>
                            </div>
                        </button>
                    </div>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <tr className="border-x border-black">
                                {/* <TableCell></TableCell> */}
                                <th className="text-left">
                                    <p className="text-xl ml-2">Công việc được giao</p>
                                </th>
                                <th className="w-40">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <p>Thời gian </p>
                                            <p>thực hiện</p>
                                        </div>
                                        <button 
                                            className="ml-1 text-xl bg-blue-300 z-1 0 position" 
                                            onClick={toggleOptionsTime}
                                        >
                                            <div className="flex items-center">
                                                {showOptionsTime ? (
                                                    <TbArrowsSort className="text-xl text-white" />
                                                ) : (
                                                    <TbArrowsSort className="text-xl" />
                                                )}
                                            </div>
                                        </button>
                                        {showOptionsTime && (
                                            <ul className="border border-black bg-white py-2">
                                                <li className="w-full">
                                                    <a 
                                                        className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                                        href="#" 
                                                        onClick={() => handleOptionTimeClick('Lựa chọn 1')}>
                                                        <span className='px-2'>Cao - Thấp</span>
                                                        
                                                    </a>
                                                </li>
                                                <li className="w-full mt-2">
                                                    <a 
                                                        className='flex mx-2 h-6 rounded-md text-md bg-blue-300 font-bold text-white hover:text-blue-500'
                                                        href="#" 
                                                        onClick={() => handleOptionTimeClick('Lựa chọn 2')}>
                                                        <span className='px-2'>Thấp - Cao</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                        {/* <button className="ml-1 text-xl bg-blue-300">
                                            <TbArrowsSort/>
                                        </button> */}
                                    </div>
                                </th>
                                <th className="w-40 text-center">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <p>Thời hạn</p>
                                            <p>công việc</p>
                                        </div>
                                        <button className="ml-1 text-xl bg-blue-300">
                                            <TbArrowsSort/>
                                        </button>
                                    </div>
                                </th>
                                <th className="w-40 text-center">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <p>Thời gian</p>
                                            <p>hoàn thành</p>
                                        </div>
                                        <button className="ml-1 text-xl bg-blue-300">
                                            <TbArrowsSort/>
                                        </button>
                                    </div>
                                </th>
                                <th className="w-48 text-center">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <p>Trạng thái</p>
                                            <p>công việc</p>
                                        </div>
                                        <button className="ml-1 text-xl bg-blue-300">
                                            <TbArrowsSort/>
                                        </button>
                                    </div>
                                </th>
                                <th className="w-40 text-center">
                                    <div className="flex justify-center items-center">
                                        <div>
                                            <p>Tỷ lệ</p>
                                            <p>hoàn thành</p>
                                        </div>
                                        <button className="ml-1 text-xl bg-blue-300">
                                            <TbArrowsSort/>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th colSpan={7} className='bg-blue-500 h-2'></th>
                            </tr>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <Row key={row.name} row={row} index={index}/>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
