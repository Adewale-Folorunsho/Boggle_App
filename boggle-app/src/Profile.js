import React from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";

import { auth } from './firebase';

import './Profile.css';
import avatar from './avatar.png';

const Profile = () => {

  return (
      <div className="profile">
      <div className="profile-header">
          <h1>Your profile</h1>
          <img alt="avatar" src={auth.currentUser.photoURL ? auth.currentUser.photoURL : avatar} />
      </div>
       <p>Name: {auth.currentUser.displayName}</p>
       <p>Email: {auth.currentUser.email}</p>
       <Button variant="outlined" onClick={() => auth.signOut()}>Sign Out</Button>
       <p><Link to="/">Boggle Home</Link></p>
      </div>
  );
}

export default Profile;