import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {isAuth} from "./auth";
import styles from "../styles/forms.module.css";
function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Submit");
    const [hideBtn, setHideBtn] = useState(false);
    const [errMsgName, setErrMsgName] = useState("");
    const [errMsgEmail, setErrMsgEmail] = useState("");
    const [errMsgPassword, setErrMsgPassword] = useState("");
    const [emnB, setEmnB] = useState(false);
    const [emeB, setEmeB] = useState(false);
    const [empB, setEmpB] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [resMessage, setResMessage] = useState("");
      async  function handelSubmit(e){
            e.preventDefault();
             setHideBtn(true);
             setEmnB(false)
            
                 const registerData = {
                     name, email, password
                 };
                 await axios.post(`http://localhost:5000/signup`, registerData)
                 .then(res=>{
                    setSuccessMsg(res.data.success);
                    setResMessage(res.data.message);
                    setName("")
                    setEmail("")
                    setPassword("")
                    setButtonText("Submitted");
                    setHideBtn(false);
                    setEmnB(false)
                    setEmpB(false)
                    setEmeB(false)
                 }) 
                 .catch(error=>{
                    //console.log(error.response.data.errorMessage)
                    setButtonText("Submit");
                    setEmnB(error.response.data.name)
                    setEmeB(error.response.data.email)
                    setEmpB(error.response.data.password)
                    setHideBtn(false);
                    setErrMsgName(error.response.data.errorMessageName)
                    setErrMsgEmail(error.response.data.errorMessageEmail)
                    setErrMsgPassword(error.response.data.errorMessagePassword)

                 })
                 
            
           
        }
  
    return <div>

    {isAuth()? <Redirect to="/" />: null }
    <div className={styles.nav}>
<Link to="/"><img src="./images/check-p.png" alt="dotaskz" />
</Link>
</div>
        <div className={styles.sign_up}>
        <h1>Tell us about you....</h1>
        <div className={styles.auth_methods}>
            <div className={styles.google}> 
            <img src="./images/google.png" alt="google" />  Continue with Google
            </div>
            <div className={styles.facebook}>
            <img src="./images/facebook.png" alt="facebook"/>

            </div>
        </div>
        <div className={styles.or_methods}>
        <div className={styles.or_methods_div}></div>
        <h3>or</h3>
        <div className={styles.or_methods_div}></div>
        </div>
        
        <form className={styles.form} onSubmit={handelSubmit}>
        <div className={successMsg ? styles.greenOutput : styles.hide_content}>
    <p>{resMessage}</p>
    </div>
        <input  type="text" placeholder="Enter your name..." onChange={(e)=> setName(e.target.value)} value={name} className={emnB ? styles.red_input : null} autoComplete="off" />
            <div className={emnB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgName}</p></div>

            <input  type="email" placeholder="Enter your email..." onChange={(e)=> setEmail(e.target.value)} value={email} className={emeB ? styles.red_input : null} autoComplete="off" />
            <div className={emeB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgEmail}</p></div>

            <input  type="password" placeholder="Enter your password..." onChange={(e)=> setPassword(e.target.value)} className={empB ? styles.red_input : null} value={password} autoComplete="off" />
            <div className={empB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgPassword}</p></div>

            <div className={styles.btn_container}>
                <div className={hideBtn? styles.loading_btn : null}></div>
                <div className={hideBtn? styles.loading_btn2  : null}></div>

                    <button type="submit"  className={hideBtn? styles.button_hide : null}>{buttonText}</button>
            </div>

        </form>
        <p className={styles.md_ps}>Already have an account? <Link to="/signin">Log in</Link> </p>

    <p className={styles.sm_ps}>By clicking submit you're agreeing to our use of cookie and privacy policies.</p>
        </div>
  
    </div>
    
    
    
    
}

export default Signup;