// import React from 'react'

// export default function Navbar() {
//   return (
//     <div className='w-full h-full border-2 border-[blue] flex'>
//         <div className="text-md breadcrumbs basis-[80%] border-2 border-[red]">
//             <ul>
//                 <li>
//                 <a>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
//                     Home
//                 </a>
//                 </li> 
//                 <li>
//                 <a>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
//                     Documents
//                 </a>
//                 </li> 
//                 <li>
//                 <span className="inline-flex gap-2 items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
//                     Add Document
//                 </span>
//                 </li>
//             </ul>
//         </div>
//         <div className='basis-[20%] border-2 border-[rgb(255,0,0)] flex justify-center'>
//             <button className="btn w-[80%] min-h-0 h-[40px] bg-slate-50">Back</button>
//         </div>
//     </div>
//   )
// }

// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation from react-router-dom
// import { FiArrowLeft } from 'react-icons/fi'; // Import icons from react-icons

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Function to generate navbar links based on the current path
//   const generateNavLinks = () => {
//     const pathSegments = location.pathname.split('/').filter(Boolean);
    
//     // Always include the Home link
//     const navLinks = [
//       { name: 'Home', path: '/' },
//     ];

//     // Dynamically add other links based on the path
//     pathSegments.forEach((segment, index) => {
//       // Reconstruct the path up to the current segment
//       const pathUpToSegment = '/' + pathSegments.slice(0, index + 1).join('/');
//       // Capitalize the first letter of the segment for display
//       const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
//       console.log({ name: displayName, path: pathUpToSegment })
//       navLinks.push({ name: displayName, path: pathUpToSegment });
//     });

//     return navLinks;
//   };

//   const navigateToParent = () => {

//     const parentPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
//     navigate(parentPath || '/');
//   };

//   const navLinks = generateNavLinks();

//   return (
//     <div className='w-full h-full border-2 border-[blue] flex'>
//         <div className="text-md breadcrumbs basis-[80%] border-2 border-[red]">
//             <ul>
//                 {navLinks.map((link, index) => (
//                   <li key={index}>
//                     <Link to={link.path}>
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//             </ul>
//         </div>
//         <div className='basis-[20%] border-2 border-[rgb(255,0,0)] flex justify-center'>
//             <button onClick={navigateToParent} className="btn w-[80%] min-h-0 h-[40px] bg-slate-50 flex justify-center items-center gap-2">
//                 <FiArrowLeft />
//                 Back
//             </button>
//         </div>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { FiArrowUp, FiPlus } from 'react-icons/fi'; // Import FiArrowUp for the upward arrow

// // Simple Modal Component for Adding New Folder
// function AddFolderModal({ onClose, onSubmit }) {
//   const [folderName, setFolderName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(folderName);
//     onClose(); // Close modal after submitting
//   };

//   return (
//     <div className="modal">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Folder Name:
//           <input
//             type="text"
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onClose}>Cancel</button>
//       </form>
//     </div>
//   );
// }

// export default function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const navigateToParent = () => {
//     const parentPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
//     navigate(parentPath || '/');
//   };

//   // Generate nav links dynamically
//   const generateNavLinks = () => {
//     const pathSegments = location.pathname.split('/').filter(Boolean);
//     const navLinks = [{ name: 'Home', path: '/' }];

//     if (pathSegments.length > 0) {
//       // Only add additional links if not at root
//       pathSegments.forEach((segment, index) => {
//         const pathUpToSegment = '/' + pathSegments.slice(0, index + 1).join('/');
//         const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
//         navLinks.push({ name: displayName, path: pathUpToSegment });
//       });
//     }

//     // Add the Add Document link separately
//     navLinks.push({ name: 'Add Document', path: '#', action: () => setIsModalOpen(true) });

//     return navLinks;
//   };

//   const handleFolderSubmit = (folderName) => {
//     // Placeholder for submitting the new folder name
//     console.log('Creating new folder:', folderName);
//     // Here you would typically make an API call to create the folder
//   };

//   const navLinks = generateNavLinks();

//   return (
//     <div className='w-full h-full border-2 border-[blue] flex'>
//         <div className="text-md breadcrumbs basis-[80%] border-2 border-[red]">
//             <ul>
//                 {navLinks.map((link, index) => (
//                   <li key={index} onClick={link.action}>
//                     {link.path === '/' ? (
//                       <a>{link.name}</a> // For "Add Document", it's not a real navigation link
//                     ) : (
//                       <Link to={link.path}>{link.name}</Link>
//                     )}
//                   </li>
//                 ))}
//             </ul>
//         </div>
//         <div className='basis-[20%] border-2 border-[rgb(255,0,0)] flex justify-center'>
//             <button onClick={navigateToParent} className="btn w-[80%] min-h-0 h-[40px] bg-slate-50 flex justify-center items-center gap-2">
//                 <FiArrowUp /> {/* Changed to FiArrowUp */}
//                 Back
//             </button>
//         </div>
//         {isModalOpen && <AddFolderModal onClose={() => setIsModalOpen(false)} onSubmit={handleFolderSubmit} />}
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi'; // For the upward back arrow
import { FaFolderOpen } from "react-icons/fa";

// Simple Modal Component for Adding New Folder
// function AddFolderModal({ onClose, onSubmit }) {
//   const [folderName, setFolderName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(folderName); // Placeholder function for actual submission logic
//     onClose(); // Close modal after submission
//   };

//   return (
//     <div className="modal" style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', zIndex: 100 }}>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Folder Name:
//           <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} required />
//         </label>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onClose}>Cancel</button>
//       </form>
//     </div>
//   );
// }

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [folderName, setFolderName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFolderSubmit(folderName); // Placeholder function for actual submission logic
    // onClose(); // Close modal after submission
  };

  const navigateToParent = () => {
    const parentPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
    navigate(parentPath || '/');
  };

  // Always include "Home" and "Add Document" as the first and last items respectively
  const navLinks = [];

  location.pathname.split('/').filter(Boolean).forEach((segment, index, array) => {
    const pathUpToSegment = '/' + array.slice(0, index + 1).join('/');
    const displayName = segment.charAt(0).toUpperCase() + segment.slice(1);
    navLinks.push({ name: displayName, path: pathUpToSegment });
  });

  // Adding "Add Document" at the end with an action to open the modal
//   const addDocumentAction = { name: 'Add Document', action: () => setIsModalOpen(true) };

  const handleFolderSubmit = (folderName) => {
    alert('Creating new folder:', folderName);
    // Here, you would typically make an API call to create the folder
  };

  return (
    <div className='w-full h-full border-2 border-[blue] flex'>
        <div className="text-md breadcrumbs basis-[80%] border-2 border-[red]">
            <ul>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
                {/* Directly adding the "Add Document" action here */}
                {/* <li key="addDocument" onClick={addDocumentAction.action}>
                    <a>{addDocumentAction.name}</a>
                </li> */}
            </ul>
        </div>
        <div className='basis-[20%] border-2 border-[rgb(255,0,0)] flex justify-center gap-2'>
            <button onClick={navigateToParent} className="btn min-h-0 h-[40px] bg-slate-50 flex justify-center items-center">
                <FiArrowUp className='text-[20px]'/>
            </button>
            <button className="btn min-h-0 h-[40px] bg-slate-50 flex justify-center items-center" onClick={()=>document.getElementById('my_modal_3').showModal()}>
                <FaFolderOpen className='text-[20px] text-yellow-400'/>
            </button>
        </div>

        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='w-auto h-auto mb-4'>
                    <p className='font-[600] text-[22px] '>Create New Folder</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='w-auto h-auto flex flex-col gap-4'>

                        <label className='flex gap-2 items-center'>
                            Folder Name:
                            <input 
                                type="text" 
                                value={folderName} 
                                placeholder="Type here" 
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFolderName(e.target.value)} required 
                            />
                        </label>
                        <label className='flex gap-2 items-center'>
                            Owner Name:
                            <input 
                                type="text" 
                                value={folderName} 
                                placeholder="Type here" 
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFolderName(e.target.value)} required 
                            />
                        </label>
                        <label className='flex gap-2 items-center'>
                            Department Name:
                            <input 
                                type="text" 
                                value={folderName} 
                                placeholder="Type here" 
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFolderName(e.target.value)} required 
                            />
                        </label>
                        <div className='w-full h-auto flex justify-center gap-4'>
                            <button type="button" className="btn bg-red-200">Cancel</button>
                            <button type="submit" className="btn bg-green-200">Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </dialog>
        
    </div>
  );
}
