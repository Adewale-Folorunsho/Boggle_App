import React, { useState } from 'react';
import { auth } from './firebase';

import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';


const Application = () => {
    const [shouldShowSignIn, setShouldShowSignIn] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });
    
    return ( 
        <>
        {currentUser ? <Profile /> : (shouldShowSignIn ? <SignIn setShouldShowSignIn={setShouldShowSignIn} /> : <SignUp setShouldShowSignIn={setShouldShowSignIn} />)}
        </>
    );
}

export default Application;