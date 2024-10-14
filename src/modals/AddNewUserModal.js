import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import UserManagementForm from "../components/UserManagementForm";
import { createUser } from "../api/userServices";

const AddNewUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [formValues, setFormValues] = useState({
    userName: '',
    userSurname: '',
    userIdNumber: '',
    userEmail: '',
    userPassword: '',
    isUserActive: true,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      handleClear();
    }
  }, [isOpen]);

  const handleClear = () => {
    setFormValues({
      userName: '',
      userSurname: '',
      userIdNumber: '',
      userEmail: '',
      userPassword: '',
      isUserActive: true,
    });
  };

   const fields = [
    { name: 'userName', label: 'Name', type: 'text', placeholder: 'Enter Name' },
    { name: 'userSurname', label: 'Surname', type: 'text', placeholder: 'Enter Surname' },
    { name: 'userIdNumber', label: 'ID Number', type: 'text', placeholder: 'Enter ID number' },
    { name: 'userEmail', label: 'Email', type: 'email', placeholder: 'Enter email' },
   ];

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = {
        userName: formValues.userName,
        userSurname: formValues.userSurname,
        userIdNumber: formValues.userIdNumber,
        userEmail: formValues.userEmail,
        isUserActive: formValues.isUserActive,
      };
      await createUser(newUser);
      onUserCreated();
      handleClear();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add New User"
      className="max-w-2xl w-full mx-auto my-10 bg-white p-6 shadow-lg rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl mb-4">Add New User</h2>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      <UserManagementForm
        header="Create New User"
        fields={fields}
        formValues={formValues}
        setFormValues={setFormValues}
        onSave={handleSubmit}
        onClear={handleClear}
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-6 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
    </Modal>
  );
};

export default AddNewUserModal;