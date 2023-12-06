import React from 'react';
import Parse from 'parse';
import { useNavigate } from "react-router-dom";


const UserLogOut = () => {
  const navigate = useNavigate();

  const logoutUser = async function () {
    return await Parse.User.logOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        if (currentUser === null) {
          alert('Success!', 'No user is logged in anymore!');
        }
        // Navigate back to login screen when successfully loggedout
        navigate('/home');
        return true;
      })
      .catch((error) => {
        alert('Error!', error.message);
        return false;
      });
  };

  return (
          <button onClick={logoutUser}>Logout</button>
  );
};

export default UserLogOut;