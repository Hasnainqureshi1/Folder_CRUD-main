import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { IoIosDocument } from "react-icons/io";
import { FaFolder } from "react-icons/fa";
import { CiFolderOn } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import CSVIcon from '../assets/CSVIcon.png'
import DocIcon from '../assets/DocIcon.png'
import FolderIcon from '../assets/FolderIcon.png'
import PDFIcon from '../assets/PDFIcon.png'
import XLSIcon from '../assets/XLSIcon.png'
import { useNavigate, useLocation } from 'react-router-dom';

const staticData = {
    columnsV1: [
      { header: "Type", dataKey: "type" },
      { header: "Name", dataKey: "name" },
      { header: "Created Date", dataKey: "createdDate" },
      { header: "Modified By", dataKey: "modifiedBy" },
      { header: "Modified Date", dataKey: "modifiedDate" },
      { header: "Actions", dataKey: "click" },
    ],
    tableData: [
      { type: "File", name: "Document.pdf", createdDate: "2024-03-27", modifiedBy: "Alex", modifiedDate: "2024-03-27" },
      { type: "Folder", name: "Project", createdDate: "2024-03-25", modifiedBy: "Jordan", modifiedDate: "2024-03-25"},
      { type: "Folder", name: "Project 2", createdDate: "2024-03-25", modifiedBy: "Jordan",modifiedDate: "2024-03-25" },
      // Add more files/folders as needed
    ],
};

const Table2 = ({location, navigate}) => {
    const data = staticData;// Assume staticData is available in this scope
    const [checkedRows, setCheckedRows] = useState([]);
    const [draggedOverRow, setDraggedOverRow] = useState(null);

    const handleCheckboxChange = (event, rowIndex) => {
        event.stopPropagation(); // Prevent row onClick event
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setCheckedRows([...checkedRows, rowIndex]);
        } else {
          setCheckedRows(checkedRows.filter((index) => index !== rowIndex));
        }
    };
    
    const handleDelete = () => {
    alert('Deleting rows:', checkedRows);
    // Implement the delete logic here. This could involve filtering out the checked rows from your data.
    };
    

    const handleDragOver = (e, rowIndex) => {
        // Prevent default to allow drop
        e.preventDefault();
        setDraggedOverRow(rowIndex);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDraggedOverRow(null); // Reset the dragged over row state when the drag leaves a row
    };

    const handleDrop = (e, folder) => {
        e.preventDefault();
        // Assuming the drop event contains files, iterate through them
        const allowedMimeTypes = ['application/pdf', 'text/csv'];
        const allowedExtensions = ['.pdf', '.doc', '.csv', '.xls', '.docx', '.xlsx'];

        Array.from(e.dataTransfer.files).forEach((file) => {
            const fileExtension = file.name.split('.').pop().toLowerCase();

            // Check if the file type is allowed by MIME or extension
            if (allowedMimeTypes.includes(file.type) || allowedExtensions.includes('.' + fileExtension)) {
            alert(`File "${file.name}" dropped into folder "${folder.name}".`);
            // Here, you would typically dispatch an action or call a function to handle the file upload
            } else {
            // Alert or handle the rejection of disallowed file types
            alert(`File "${file.name}" is not an allowed type.`);
            }
            // Here, you would typically dispatch an action or call a function to handle the file upload
        });
        setDraggedOverRow(null);
    };

    const handleRowClick = (item) => {
        alert(`Clicked on ${item.type}: ${item.name}`);
        localStorage.setItem('selectedItemId', item.id);
        const pathname = location.pathname;
        navigate(`${pathname}/${item.name}`);
    };

    const handleEditClick = (e, item) => {
        e.stopPropagation(); // Prevent row onClick event
        alert(`Editing ${item.type}: ${item.name}`);
        // Implement your edit logic here (e.g., open a modal with the item's details)
    };
      
    
  return (
    <div className="max-h-full overflow-y-auto overflow-x-auto">
      <table className="table table-zebra">
        <thead className="sticky z-10 top-0 bg-slate-50">
          <tr>
            <th> {/* Extra header for checkbox column */} </th>
            {data.columnsV1.map((column, index) => (
              <th key={index}>
                {column.header === 'Type'? 
                    <CiFolderOn className='text-[20px]'/>
                :
                    column.header
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.tableData.map((row, rowIndex) => (
           <tr key={rowIndex} 
                onDragOver={(e) => row.type === 'Folder' && handleDragOver(e, rowIndex)}
                onDragLeave={(e) => row.type === 'Folder' && handleDragLeave(e)}
                onDrop={(e) => row.type === 'Folder' && handleDrop(e, row)}
                onClick={() => handleRowClick(row)}
                className={row.type === 'Folder' && draggedOverRow === rowIndex ? 'border-2 border-blue-400 border-dashed': ''}
                >
              <td onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={checkedRows.includes(rowIndex)}
                  onChange={(e) => handleCheckboxChange(e, rowIndex)}
                />
              </td>
              {data.columnsV1.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {column.dataKey === 'type' ? (
                        row.type === 'Folder' ? (
                        //   <FaFolder className='text-[24px] text-yellow-500'/>
                            <img
                                src={FolderIcon}
                                className='w-[24px]'
                            />
                        ) : (
                            // row.name.split('.').pop().toLowerCase() === 'pdf' ? (
                            //     <img src={PDFIcon} className='' />
                            // ) : row.name.split('.').pop().toLowerCase() === 'csv' ? (
                            //     <img src={CSVIcon} className='' />
                            // ) : row.name.split('.').pop().toLowerCase() === 'xls' ? (
                            //     <img src={XLSIcon} className='' />
                            // ) : (
                            //     <img src={DocIcon} className='' />
                            // )
                            <IoIosDocument className='text-[24px] text-slate-500'/>   
                        )
                      
                  ) : column.dataKey === 'click' ? (
                    <div className='flex gap-2'>
                        <button 
                            className="btn btn-square btn-outline min-h-0 h-min w-min p-2"
                            onClick={(e) => handleEditClick(e, row)}
                        >
                            Edit
                        </button>
                        {/* <button className="btn btn-square btn-outline min-h-0 h-min w-min p-2">
                            <MdOutlineDelete className='text-[20px] text-red-600'/>
                        </button> */}
                    </div>
                  ) : (
                    row[column.dataKey]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {checkedRows.length > 0 && (
        <div className="text-right mt-4">
          <button
            className="btn btn-error"
            onClick={handleDelete}
          >
            Delete Selected
          </button>
        </div>
      )}

    </div>
  );
}; 




export default function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      
    }, []);
     
  return (
    
    <div className="w-full h-full flex flex-col justify-center items-center">
        {/* <p className=" font-montserrat text-[24px] font-[600]">Simple Daisy Table Component</p> */}
        <div className="w-full h-full">
            <Table2 navigate={navigate} location={location}/>
        </div>
    </div>

  )
}
