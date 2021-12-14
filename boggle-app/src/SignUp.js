import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './SignIn.css';

const SignUp = ({setShouldShowSignIn}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState(null);

    
  const genericError = "An  error occurred while signing you up, please try again.";
    
  const doSignUp = () => {
    setSignUpError(null);
    if (!email  || !password || !name) {return;}
    auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.updateProfile({
                displayName: name
            }).then(() => {
            }, (e) => {
                setSignUpError(genericError);
                console.log(e)
        });     
        })
        .catch((e) => {
        let displayMessage = genericError;
        if (e.code === 'auth/email-already-in-use'){
            displayMessage = "Email address already in use";
        }
        setSignUpError(displayMessage);
        console.log(e)
    });
  }
  
  const doGoogleSignUp = () => {
      setSignUpError(null);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
        setSignUpError(genericError);
      });
  }
  
  return (
      <div className="page-container">
      <div>
          <p><Link to="/">Go To Boggle Home</Link></p>
          <div className="login-box" onSubmit={(e) => {doSignUp(e)}}>
              <div className="box-header">Registration</div>
              {signUpError ? <div className="log-sign-error">{signUpError}</div> : <></>}
              <TextField label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField label="Email address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button variant="outlined" onClick={doSignUp}>Sign me up</Button>
          </div>
          <div className="alt-buttons">
              <Button variant="outlined" onClick={doGoogleSignUp}>Sign Up with Google</Button>
              <Button variant="outlined" onClick={() => {setShouldShowSignIn(true);}}>I have an account</Button>
          </div>
    </div>
    </div>
  );
}

export default SignUp;