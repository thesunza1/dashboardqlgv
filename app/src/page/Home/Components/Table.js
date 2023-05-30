import React from "react";
import { BsDownload } from "react-icons/bs";
import { FiFilter } from "react-icons/fi"
import XLSX from 'xlsx';

function Table() {  
    var data_table = [
        {
            id: 1,
            title: "Sửa chữa xe đạp",
            time: "2 giờ",  
            deadline: "15/06/2023",
            completionTime: "14/06/2023",
            status: "Hoàn thành",
            progress: "100%",
        },
        {
            id: 2,
            title: "Làm báo cáo tài chính",
            time: "5 giờ",
            deadline: "30/06/2023",
            completionTime: "14/06/2023",
            status: "Đang thực hiện",
            progress: "50%",
        },
        {
            id: 3,
            title: "Làm báo cáo tài chính",
            time: "5 giờ",
            deadline: "30/06/2023",
            completionTime: "14/06/2023",
            status: "Đang thực hiện",
            progress: "50%",
        },
        {
            id: 4   ,
            title: "Sửa chữa xe hơi",
            time: "22 giờ",
            deadline: "15/05/2023",
            completionTime: "24/05/2023",
            status: "Quá hạn",
            progress: "10%",
        },
        // thêm các công việc khác vào đây
    ];

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
            <div className="m-auto w-3/4 mb-5 m-5 p-5 border border-black mb-72">
                <div className="flex  bg-[#1982c4] w-full h-16 items-center justify-between">
                    <p className="ml-5 text-white text-4xl font-bold">
                        Danh sách các công việc
                    </p>
                    <button onClick={exportToExcel} className="flex mr-5 bg-[#6a994e] p-2 rounded-lg items-center">
                        <p className="text-xl text-white">
                            Xuất Excel
                        </p>
                        <div className="ml-2 text-white text-xl">
                            <BsDownload/>
                        </div>
                    </button>
                </div>
                <table className="w-full">
                    <thead className="border-b-8 border-blue-500 h-12">
                        <tr>
                            <th className="text-left border-x border-black">
                                <p className="text-xl ml-2">Công việc được giao</p>
                            </th>
                            <th className="w-32 bg-blue-200 border-r border-black">
                                <div className="flex justify-between items-center">
                                    <p className="ml-1">Thời gian thực hiện</p>
                                    <button className="mr-2">
                                        <FiFilter/>
                                    </button>
                                </div>
                            </th>
                            <th className="w-32 border-r border-black text-center">
                                <div className="flex justify-between items-center">
                                    <p className="ml-1">Thời hạn công việc</p>
                                    <button className="mr-2">
                                        <FiFilter/>
                                    </button>
                                </div>
                            </th>
                            <th className="w-32 bg-blue-200 border-r border-black text-center">
                                <div className="flex justify-between items-center">
                                    <p className="ml-1">Thời gian hoàn thành</p>
                                    <button className="mr-2">
                                        <FiFilter/>
                                    </button>
                                </div>
                            </th>
                            <th className="w-36 text-center border-r border-black">
                                <div className="flex justify-between items-center">
                                    <p className="ml-1">Trạng thái công việc</p>
                                    <button className="mr-2">
                                        <FiFilter/>
                                    </button>
                                </div>
                            </th>
                            <th className="w-32 bg-blue-200 text-center border-r border-black">
                                <div className="flex justify-between items-center">
                                    <div>
                                    <p className="ml-1">Tỷ lệ</p>
                                    <p className="ml-1">hoàn thành</p>
                                    </div>
                                    <button className="mr-2">
                                        <FiFilter/>
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-400 border border-black">
                        {data_table.map(task => (
                            <tr key={task.id} className={task.id % 2 === 0 ? 'bg-blue-200' : ''}>
                                <td className="border-r border-black p-2">{task.title}</td>
                                <td className="text-center border-r border-black">{task.time}</td>
                                <td className="text-center border-r border-black">{task.deadline}</td>
                                <td className="text-center border-r border-black">{task.completionTime}</td>
                                <td className="text-center border-r border-black font-bold">
                                    {task.status === "Hoàn thành" ? (
                                        <span className="text-green-500">{task.status}</span>
                                    ) : task.status === "Quá hạn" ? (
                                        <span className="text-red-500">{task.status}</span>
                                    ) : (
                                        <span className="text-yellow-600">{task.status}</span>
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