import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { TbArrowsSort } from "react-icons/tb"
import { AiOutlineDown } from "react-icons/ai";
import { GrNext } from "react-icons/gr"
import XLSX from 'xlsx';

function Table({ data }) {  
    const [data_table, setData_Table] = useState([
        {
            id: 1,
            title: "Sửa chữa xe đạp",
            time: "2 giờ",
            deadline: "15/06/2023",
            completionTime: "14/06/2023",
            status: "Chưa hoàn thành",
            progress: "90%",
        },
        // {
        //   id: 2,
        //   title: "Làm báo cáo tài chính",
        //   time: "5 giờ",
        //   deadline: "30/06/2023",
        //   completionTime: "14/06/2023",
        //   status: "Chưa hoàn thành",
        //   progress: "50%",
        // },
        // {
        //   id: 3,
        //   title: "Làm báo cáo tài chính",
        //   time: "5 giờ",
        //   deadline: "30/06/2023",
        //   completionTime: "14/06/2023",
        //   status: "Chưa hoàn thành",
        //   progress: "50%",
        // },
        // {
        //   id: 4,
        //   title: "Sửa chữa xe hơi",
        //   time: "22 giờ",
        //   deadline: "15/05/2023",
        //   completionTime: "24/05/2023",
        //   status: "Quá hạn",
        //   progress: "10%",
        // },
        // {
        //   id: 5,
        //   title: "Sửa chữa xe hơi",
        //   time: "22 giờ",
        //   deadline: "15/05/2023",
        //   completionTime: "24/05/2023",
        //   status: "Quá hạn",
        //   progress: "10%",
        // },
        {
            id: 6,
            title: "Sửa chữa xe hơi",
            time: "22 giờ",
            deadline: "15/05/2023",
            completionTime: "24/05/2023",
            status: "Quá hạn",
            progress: "10%",
        },
        // thêm các công việc khác vào đây
    ]);

    const [showOptionsTime, setShowOptionsTime] = useState(false);

    function toggleOptionsTime() {  
        setShowOptionsTime(!showOptionsTime);
    }

    function handleOptionTimeClick(option) {
        console.log(`Selected option: ${option}`);
        setShowOptionsTime(false);
    }

    const [showTable, setShowTable] = useState(false);

    const tasks = {
      title: 'Task name',
      tableData: [
        ['AA', 'BB', 'CC', 'DD', 'EE', 'FF'],
        ['11', '12', '13', '14', '15', '16'],
        ['21', '22', '23', '24', '25', '26'],
        ['31', '32', '33', '34', '35', '36'],
      ] // Dữ liệu bảng con
    };
  
    const handleShowTable = () => {
      setShowTable(!showTable); // Đảo ngược trạng thái hiển thị bảng
    };

    // const headers = [
        //     'Công việc được giao', 
        //     'Thời gian thực hiện', 
        //     'Thời hạn công việc',
        //     'Thời hạn hoàn thành',
        //     'Trạng thái công việc',
        //     'Tỷ lệ hoàn thành',
        // ];

        // fileCSV
        // const headers = [
        //     { label: 'Công việc được giao', key: 'title' },
        //     { label: 'Thời gian thực hiện', key: 'time' },
        //     { label: 'Thời hạn công việc', key: 'deadline' },
        //     { label: 'Thời hạn hoàn thành', key: 'completionTime' },
        //     { label: 'Trạng thái công việc', key: 'status' },
        //     { label: 'Tỷ lệ hoàn thành', key: 'progress' },
        //     // thêm các tiêu đề khác vào đây
        // ];


    function exportToExcel() {
        const table = document.getElementsByTagName('table')[0]; // lấy table HTML đầu tiên trong document
        const worksheet = XLSX.utils.table_to_sheet(table);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách công việc');
        const date = new Date().toISOString().slice(0, 10);
        const filename = `Danh sách công việc - ${date}.xlsx`;
        XLSX.writeFile(workbook, filename);
    }

    return (
        <div className="w-full">
            <div className="m-auto p-5">
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
                <table className="w-full">
                    <thead className="border-b-8 border-blue-500 h-12">
                        <tr className="border-x border-black">
                            <th className="text-left">
                                <p className="text-xl ml-2">Công việc được giao</p>
                            </th>
                            <th className="w-40">
                                <div className="flex justify-center items-center">
                                    <div>
                                        <p>Thời gian</p>
                                        <p>thực hiện</p>
                                    </div>
                                    <button 
                                        className="ml-1 text-xl bg-blue-300 z-1 0 position" 
                                        onClick={toggleOptionsTime}
                                    >
                                        <div className="flex items-center">
                                            {showOptionsTime ? (
                                                <TbArrowsSort className="ml-1 mr-2 text-xl text-white" />
                                            ) : (
                                                <TbArrowsSort className="ml-1 mr-2 text-xl" />
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
                    </thead>
                    <tbody 
                        className="border border-black" 
                        // style={{ maxHeight: "250px", overflowY: "scroll" }}
                        // onScroll={handleScroll}
                    >
                        {data_table.map(task => (
                            <tr 
                                key={task.id} 
                                className={task.id % 2 === 0 ? 'bg-blue-200' : ''} 
                                style={{ height:"50px" }}
                            >
                                <td className="p-2">
                                    <div className="flex items-center ">
                                        <button onClick={handleShowTable} className="mr-1 text-xl">
                                            <GrNext />
                                        </button>
                                        {task.title}
                                    </div>
                                </td>
                                <td className="text-center">{task.time}</td>
                                <td className="text-center">{task.deadline}</td>
                                <td className="text-center">{task.completionTime}</td>
                                <td className="text-center font-bold">
                                    {task.status === "Chưa hoàn thành" ? (
                                        <span className="text-gray-700">{task.status}</span>
                                    ) : (
                                        <span className="text-red-500">{task.status}</span>
                                    )}
                                </td>
                                <td className="text-center">
                                    {task.progress === "100%" ? (
                                        <span className="text-green-500 font-bold">{task.progress}</span>
                                    ) : (
                                        <span>{task.progress}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;