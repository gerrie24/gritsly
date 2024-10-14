import React, { useEffect, useState } from 'react';
import Main from "../../components/Main";
import AddNewUserModal from "../../modals/AddNewUserModal";
import EditUserModal from "../../modals/EditUserModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers, updateUser } from "../../api/userServices";

const UserManagement = () => { 
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [users, setUser] = useState([]);

 const fetchUsers = async () => {
  try {
      const usersFromDb = await getUsers();
      //console.log(usersFromDb);
      setUser(usersFromDb);
  } catch (error) {
    console.error("There was an error getting the user: ", error);
  }
 };

 useEffect(() => {
  fetchUsers();
 }, []);

  const openModal = (modalType) => {
    if (modalType === 'new') {
      setIsNewUserModalOpen(true);
    } else if (modalType === 'edit' && selectedUserIndex !== null) {
      setIsEditUserModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsNewUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setSelectedUserIndex(null);
  };

  const handleRowClick = (index) => {
    setSelectedUserIndex(index);
  };

  const handleEditUser = () => {
    openModal('edit');
  };

  const handleSaveUserEvent = async (formValues) => {
    console.log("handleSaveUser function called");
    try {
        if (formValues.id) {
              await updateUser(formValues.id, formValues); 
              //console.log("formvalues: ", formValues);
              const updatedUsers = users.map(user => 
                  user.id === formValues.id 
                  ? { ...user, ...formValues, userActive: formValues.userActive === 1 } 
                  : user
              );
              console.log("formValues: ", formValues);
              setUser(updatedUsers);
              toastSuccessfullyUpdateUserNotification();
              } else {
                  console.error("User ID is missing.");
              }
            } catch (error) {
            console.error("Error updating user", error);
            }
  };


  const toastSuccessfullyCreatedUserNotification = () => {
      toast.success('The user is created successfully and email sent with login info.', {
        position:"top-right",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: () => toast.dismiss(), 
        rtl: false,
        pauseOnFocusLoss: true, 
        draggable: true, 
        pauseOnHover: true
      });
  };

  const toastSuccessfullyUpdateUserNotification = () => {
    toast.success('The user was updated successfully', {
        position:"top-right",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: () => toast.dismiss(), 
        rtl: false,
        pauseOnFocusLoss: true, 
        draggable: true,
        pauseOnHover: true
    });
  };

  return (
    <>
      <Main>
        <div className="min-h-screen">
          <h1 className="text-2xl font-semibold mb-4">User Management</h1>
         <div className="overflow-x-auto max-h-96">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Surname</th>
                  <th className="py-2 px-4 border-b">ID Number</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Is User Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                        <tr 
                          key={user.id} 
                          className={`text-center cursor-pointer ${selectedUserIndex === index ? ' bg-gray-500' : ''}`}
                          onClick={() => handleRowClick(index)}
                        >
                          <td className="py-2 px-4 border-b">{user.userName}</td>
                          <td className="py-2 px-4 border-b">{user.userSurname}</td>
                          <td className="py-2 px-4 border-b">{user.userIdNumber}</td>
                          <td className="py-2 px-4 border-b">{user.userEmail}</td>
                          {/* <td className="py-2 px-4 border-b">{user.isUserActive ? 'Active' : 'Inactive'}</td> */}
                          <td className="py-2 px-4 border-b">{user.userActive !== undefined ? (user.userActive ? 'Active' : 'Inactive') : 'Inactive'}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div> 


          <div className="flex justify-end mt-4 space-x-2">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => openModal('new')}
            >Add New User</button>
            <button 
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${selectedUserIndex === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleEditUser}
              disabled={selectedUserIndex === null}
            >Edit User</button>
          </div>
        </div>
        <AddNewUserModal isOpen={isNewUserModalOpen} 
                        onClose={closeModal} 
                        onUserCreated={() => {
                          toastSuccessfullyCreatedUserNotification();
                          fetchUsers();
                        }} 
                        />
        {selectedUserIndex !== null && (
          <EditUserModal isOpen={isEditUserModalOpen} 
                      onClose={closeModal} 
                      user={users[selectedUserIndex]}
                      onUserUpdated={toastSuccessfullyUpdateUserNotification} 
                      onSave={handleSaveUserEvent}
                      />
        )}
      </Main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true} 
        rtl={false}
        pauseOnFocusLoss={true} 
        draggable={true}
        pauseOnHover={true}
      />
    </>
  );
};

export default UserManagement;