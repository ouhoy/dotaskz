import React from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";

  
function HomePage(){
    return <div>

    <header>
        <nav>
            <div className={styles.logo}>
                <img src="./images/check-p.png" alt="dotaskz" />
            </div>
            <div className={styles.links}>
                <Link to="/signin" className={styles.btn_login}>Log In</Link>
                <Link to="/signup" className={styles.hide_for_mobile+" "+ styles.btn_register} >Get started</Link>
            </div>
        </nav>
    </header>

    <main>
    <div className={styles.st_container}>
    <div className={styles.top_container}>
            <div className={styles.heading}>
                <p>RATED <span>#1</span> BY ME.</p>
                <h1>Make Your<br/>Life Easier</h1>
                <p>Manage your tasks with Dotaskz, A To-do list that is made with love and the importance of making things done and simple.
                </p>
                <Link to="/signup" className={styles.btn_register}>Get started</Link>

            </div>
            <div className={styles.heading_img}>
                <img src="./images/02.png" className={styles.hide_for_mobile} alt="" />
            </div>
        </div>
    </div>
    <div className={styles.trusted_companies_container}>
        <div className={styles.trusted_companies}>
            <img src="./images/companies/12.png" alt=""/>
            <img src="./images/companies/13.png" alt=""/>
            <img src="./images/companies/5.png" alt=""/>
            <img src="./images/companies/6.png" alt=""/>
            <img src="./images/companies/8.png" alt=""/>
            <img src="./images/companies/9.png" alt=""/>
        </div>
    </div>
    <div className={styles.st_container}>
    <div className={styles.n2_container}>
    <img src="./images/06.png" alt=""/>
        <div className={styles.heading}>
        <h1>We Save You From Procrastination.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

    </div>
    <div className={styles.n2_container}>
    <div className={styles.heading}>
        <h1>You Can Now Get Things Done.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

        </div>
    <img src="./images/09.png"  alt=""/>
    

    </div>
    </div>

  
    <div className={styles.take_action}>
        <h1>Get Things Done!</h1>
        <Link to="/signup" className={styles.btn_register}>Get Dotaskz</Link>
    </div>
    <div className={styles.n3_container}>
    <h2>You like my project and you want to contribute? or you're just curies about how it was built?<br></br>
    <Link className={styles.source_code}>See the source code</Link>
    </h2>

</div>
    </main>
    <footer>
        <div className={styles.footer}>
        <div className={styles.footer_logo}>
        <h2>Logo Stuff</h2>

        </div>
        <div className={styles.footer_links}>
        <h2>Legal Stuff</h2>
        <Link to="/signin" className={styles.btn_login}>About</Link>
        <Link to="/signin" className={styles.btn_login}>Privacy</Link>
        <Link to="/signin" className={styles.btn_login}>User agreement</Link>
        <Link to="/signin" className={styles.btn_login}>Social</Link>
        </div>
        <div className={styles.social}>
        <h2>Social Stuff</h2>
        <Link to="/signin" className={styles.btn_login}>Instagram</Link>
        <Link to="/signin" className={styles.btn_login}>Git Hub</Link>
        <Link to="/signin" className={styles.btn_login}>Facebook</Link>
        <Link to="/signin" className={styles.btn_login}>Twitter</Link>
        <Link to="/signin" className={styles.btn_login}>YouTube</Link>

        </div>
        </div>
    </footer>
    </div>
}

export default HomePage;
