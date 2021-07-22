import React from "react";
import GoogleLogin from "react-google-login";
import styles from "../styles/forms.module.css"
// import axios from "axios";
// import {authenticate, isAuth} from "./auth";


function Google() {

    function responseGoogle(res) {
        const googleData = {
          name: res.profileObj.name,
          imageUrl: res.profileObj.imageUrl,
          tokenId: res.tokenId 
        };
        console.log(googleData)

        
    }
    return <GoogleLogin
    clientId="729631658964-7omnf4pr4r90o3oaabgivncs842k5gen.apps.googleusercontent.com"
    buttonText=""
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    render={renderProps => (
      <div className={styles.google} onClick={renderProps.onClick} disabled={renderProps.disabled}>
        <img src="./images/google.png" alt="google"/> 
            Continue with Google
      </div>
    )}
    cookiePolicy={'single_host_origin'}
  />

}

export default Google;