import React, { useState } from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import styles from "../styles/forms.module.css";


function ResetPassword({match}){
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [hideBtn, setHideBtn] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [resMessage, setResMessage] = useState("");
    async  function handelSubmit(e){
        e.preventDefault();
        setHideBtn(true);
        setNewPassword("");
        setPassword("");
        const token = match.params.token;
        const data = {password,newPassword,resetPasswordToken:token }
        await axios.put(`http://localhost:5000/reset-password`,data)
        .then(res=>{
            setHideBtn(false);
            setSuccessMsg(res.data.success);
            setResMessage(res.data.message);
            setTimeout(function() {
                window.location.replace('/signin');
              }, 5000);
        })
        .catch(err=>{
            console.log(err.response.data);
            setHideBtn(false);

        })
    }
    return <div>
        <div className={styles.nav}>
<Link to="/"><img src="/images/check-p.png" alt="dotaskz" />
</Link>
</div>
     
    <div className={styles.sign_up}>
    <h1>Reset password</h1>
    <form  className={styles.form} onSubmit={handelSubmit}>
    <div className={successMsg ? styles.greenOutput : styles.hide_content}>
    <p>{resMessage}</p>
    </div>
    <input type="password" placeholder="Enter your new password..." onChange={(e)=> setPassword(e.target.value)}  value={password} />
    <input type="password" placeholder="Enter your new password again..." onChange={(e)=> setNewPassword(e.target.value)}  value={newPassword} />

  <div className={styles.btn_container}>
    <div className={hideBtn? styles.loading_btn : null}></div>
    <div className={hideBtn? styles.loading_btn2  : null}></div>
                    <button  className={hideBtn? styles.button_hide : null} type="submit" >Reset password</button>
            </div>
    </form>
    <p className={styles.sm_ps}>By clicking submit you're agreeing to our use of cookie and privacy policies.</p>

    </div>

    </div>

}

export default ResetPassword;