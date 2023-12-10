// UpdateProfileList.js
import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Parse from 'parse';
import './UpdateProfileDesign.css';
import {
  updateUserProfile
} from "../../Common/Services/ProfileService";


const UpdateProfileList = () => {
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [currentUser, setCurrentUser] = useState(Parse.User.current());
  const history = useNavigate();

  //get the information for the current user profile
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        //retireve current user
        const user = Parse.User.current();
        //if there is a user
        if (user) {
          setCurrentUser(user);
          setNewFirstName(user.get('firstName') || '');
          setNewLastName(user.get('lastName') || '');
          setNewBio(user.get('bio') || '');
        }
      } catch (error) {
        //error handle
        console.error('Error fetching current user:', error);
      }
    };
    fetchCurrentUser();
  }, []);

  //when submitted all the new values are set to the profile
  const onSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(currentUser, newFirstName, newLastName, newBio)
    .then(() => {
      //tell user of sucess and navigate back to profile page
      alert('Profile updated successfully!');
      history('/profile');
    })
    .catch((error) => {
      //error handle
      console.error('Error updating profile:', error);
    });
  };

  //form is prefilled with profile info
  return (
    <div className="update-profile">
      <h1>Update Profile Information</h1>
      <form onSubmit={onSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          required
        />
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
          required
        />
        <br />

        <label>Bio:</label>
        <textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          required
        />
        <br />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfileList;
