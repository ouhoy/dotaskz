import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "../styles/forms.module.css";

function ForgotPassword(){

    const [email, setEmail] = useState("");
    const [emeB, setEmeB] = useState(false);
    const [errMsgEmail, setErrMsgEmail] = useState("");
    const [hideBtn, setHideBtn] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [resMessage, setResMessage] = useState("");

    function handelSubmit(e) {
        e.preventDefault();
        setHideBtn(true)
        setEmail(""); 
        const data = {email};
        axios
        .put("http://localhost:5000/forgot-password", data)
        .then(
            res=>{
                setSuccessMsg(res.data.success);
                setResMessage(res.data.message);
                setHideBtn(false);
                setEmeB(false);

            }

        )
        .catch(error=>{
            console.log(error.response.data.errorMessage);
            setHideBtn(false);
            setErrMsgEmail(error.response.data.errorMessageEmail);
            setEmeB(error.response.data.email);

        });


    }
    return <div>
       <div className={styles.nav}>
<Link to="/"><img src="/images/check-p.png" alt="dotaskz" />
</Link>
</div>
     
        <div className={styles.sign_up}>
    <h1>Forgot password</h1>
    <form  className={ styles.form} onSubmit={handelSubmit}>
    <div className={successMsg ? styles.greenOutput : styles.hide_content}>
    <p>{resMessage}</p>
    </div>
    <input type="email" placeholder="Enter your email..." className={emeB ? styles.red_input : null} onChange={(e)=> setEmail(e.target.value)}  value={email} />
    <div className={emeB? null: styles.hide_content}><p className={styles.red_ps}><i className="fas fa-exclamation-triangle"></i> {errMsgEmail}</p></div>

    <div className={styles.btn_container}>
    <div className={hideBtn? styles.loading_btn : null}></div>
    <div className={hideBtn? styles.loading_btn2  : null}></div>
                    <button  className={hideBtn? styles.button_hide : null} type="submit" >Submit</button>
            </div>
    </form>
    <p className={styles.sm_ps}>By clicking submit you're agreeing to our use of cookie and privacy policies.</p>

    </div>
    </div>
}

export default ForgotPassword;