import React, { useState } from 'react';

const Modal = ({ user, onClose, onRoleUpdate, valueone, valuetwo, title, }) => {
 
  const [role, setRole] = useState(user?.status)
  // console.log("role", )
  console.log("role one",  role)
  // console.log(valuetwo, "valueone")
      
  const userId = user?.uuid?.replace(/^"|"$/g, "") || "";


  const handleRoleUpdate = async () => {
     onRoleUpdate(userId, role)
  
    onClose();
     console.log("user update", userId, role)
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Edit {title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Status Update */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{title}</label>
          <select
            className="mt-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
             {/* <option value={valuethree}>{valuethree}</option> */}
            <option value={valueone}>{valueone}</option>
            <option value={valuetwo}>{valuetwo}</option>
          </select>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleRoleUpdate}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
