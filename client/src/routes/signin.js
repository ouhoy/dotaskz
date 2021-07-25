import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {authenticate, isAuth} from "./auth"
import Google from "./googleAuth";
import styles from "../styles/forms.module.css"

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Submit");
    const [hideBtn, setHideBtn] = useState(false);
    const [errMsgEmail, setErrMsgEmail] = useState("");
    const [errMsgPassword, setErrMsgPassword] = useState("");
    const [emeB, setEmeB] = useState(false);
    const [empB, setEmpB] = useState(false);

      async  function handelSubmit(e){
            e.preventDefault();
             setHideBtn(true);

                 const registerData = {
                    email, password
                 };
                 await axios.post(`http://localhost:5000/signin`, registerData)
                 .then(res=>{
                     authenticate(res, ()=>{
                      
                        setEmail("")
                        setPassword("")
                        setButtonText("Submitted");
                        setHideBtn(false);
                        setEmpB(false);
                        setEmeB(false);
                        
                     });
               
                 }) 
                 .catch(error=>{
                    setButtonText("Submit");
                    setEmeB(error.response.data.email);
                    setEmpB(error.response.data.password);
                    setHideBtn(false);
                    setErrMsgEmail(error.response.data.errorMessageEmail);
                    setErrMsgPassword(error.response.data.errorMessagePassword);

                 })
            
           
        }
  
    return <div>
  
        
    {isAuth()? <Redirect to="/" />: null }
<div className={styles.nav}>
<Link to="/"><img src="./images/check-p.png" alt="dotaskz" />
</Link>
</div>
<div className={styles.sign_up}>
<h1>Welcome back!</h1>
<div className={styles.auth_methods}>
            <Google/>
            <div className={styles.facebook}>
            <img src="./images/facebook.png" alt="facebook" />

            </div>
        </div>
        <div className={styles.or_methods}>
        <div className={styles.or_methods_div}></div>
        <h3>or</h3>
        <div className={styles.or_methods_div}></div>
        </div>

<form className={styles.form} onSubmit={handelSubmit}>

    <input  type="email" placeholder="Enter your email..." onChange={(e)=> setEmail(e.target.value)} value={email} className={emeB ?  styles.red_input : null} autoComplete="off" />
    <div className={emeB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgEmail}</p></div>

    <input  type="password" placeholder="Enter your password..." onChange={(e)=> setPassword(e.target.value)} className={empB ?  styles.red_input : null} value={password} />
    <div className={empB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgPassword}</p></div>

    <div className={styles.btn_container}>
                <div className={hideBtn? styles.loading_btn3 : null}></div>
                <div className={hideBtn? styles.loading_btn4  : null}></div>
                <p className={styles.md_ps} >Forgot password? <Link to="forgot-password">Reset password</Link></p>

                    <button type="submit"  className={hideBtn? styles.button_hide : null}>{buttonText}</button>
            </div>

</form>
<p className={styles.md_ps} >No account? <Link to="signup">Sign Up</Link></p>

<p className={styles.sm_ps}>By clicking submit you're agreeing to our use of cookie and privacy policies.</p>
</div>

      
    </div>
    
    
}

export default Signin;