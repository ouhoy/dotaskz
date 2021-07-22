import React, {useState, useEffect} from "react"
import Axios from "axios";
import styles from "../styles/task.module.css";
import cookie from "js-cookie";


function Task(){

    const [content, setContent] = useState("");
    const [tasks, setTasks] = useState([]);
    const [CheckedItem , setCheckedItem] = useState([]);
    const [isPoint, setIspoint] = useState(false);
    const [isPointf , setIspointf] = useState(false);
    const [isPoints , setIspoints] = useState(false);


  


    function handelSubmit (e) {
        e.preventDefault();
      }
      function handleChange(event){
          const newInput = event.target.value;
          setContent(newInput)
      }
      const removeLocalStorage = (key) =>{
        if(window!== "undefined") {
          localStorage.removeItem(key)
        }
    }
    const removeCookie = (key) =>{
      if(window!== "undefined") {
          cookie.remove(key, {
              expires: 1
          })
      }
  }
      function logOut() {
        removeCookie('token')
        removeLocalStorage("user")
        window.location.reload();
      }
   

function saveTask(){
    Axios.post("http://localhost:5000/" , {content : content})
    setContent("")
}

useEffect(()=>{
    Axios.get("http://localhost:5000/" , {content : content}).then((response)=>{
        setTasks(response.data)
    }).catch((err)=>{
      console.log(err)
    })

  })

useEffect(()=>{
    Axios.get("http://localhost:5000/CheckedItem" , {content : content}).then((response)=>{
        setCheckedItem(response.data)
    }).catch((err)=>{
      console.log(err)
    })

  }, )


  const deleteTask = (id)=> {
    Axios.delete(`http://localhost:5000/${id}` , [])
   
  }
  // const updateTask = (id)=>{
  //   const newTask = prompt("Update your task")
  //   Axios.put("http://localhost:5000/" , {newTask:newTask, id:id} )
  // }
  const checkTask = (id)=> {
    Axios.delete(`http://localhost:5000/checked/${id}` , [])
   
  }
  const deleleChecked = (id)=> {
    Axios.delete(`http://localhost:5000/deletechecked/${id}` , [])
   
  }
return <div className={styles.bg_dark}>
  <div className={styles.menu_bar}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={styles.menu+" "+styles.hide_for_mobile}>


            <div  className={styles.menu_point}>

            </div>
            <div className={styles.user_profile}>
                    <div className={styles.body_container}>
                        <div className={styles.head}>
                        
                        </div>
                        <div className={styles.body}>
                            
                        </div>
                    </div>
                </div>
                <div className={styles.greeting}>
                  <h2>Goog morning,<br></br> Ouhoy!</h2>
                </div>
                <div className="themes">
                <div className="light">

                </div>
                </div>
                <div className={styles.hide_tdls_bg}>

                    <h2>More features are coming soon <i className="fas fa-heart"></i></h2>
                </div>
                <div onClick={logOut} className={styles.sign_out}>
                    <p>Sign Out <i className="material-icons">logout</i></p>
                </div>
           
          
          
           

             

        </div>
<div className={styles.date}>
            <h1>My Day</h1>
        </div>
 <div  className="tasks">


 <form onSubmit={handelSubmit}>
      <div className={styles.add_task}>
       <input type="text" autoComplete="off" onChange={handleChange} value={content} className={styles.textInput} placeholder="Add a task"></input>
       </div>
       <button type="submit" className={styles.hidden} onClick={saveTask} ></button>
       </form>

       
       {tasks.map((task , index)=>{

         return <div className={styles.lable_div} >
         <div  onClick={()=>{ setIspoint(!isPoint)}} id="links-point" className={styles.manage_links_point}></div> 
                          <div id={index} key={index} className={isPoint? styles.manage_links1 : styles.hidden}>
                            <div id="manage-links" className={styles.manage_links}>
                            <button  onClick={()=>{deleteTask(task._id)}} ><i className="far fa-trash-alt"></i></button>
                                {/* <button onClick={()=>{updateTask(task._id)}} name="edit"><i className="far fa-edit"></i></button> */}
                    
                            </div>
                        </div>
                        
         <input id={index} onChange={()=>{checkTask(task._id)}}  type="checkbox"></input>
         <label key={index+" tasks"} >{task.content}</label>
         </div>
       })}
       <div  onClick={()=>{ setIspointf(!isPointf)}} className={styles.hide_lable_point}>
       <p><i className={isPointf?"fas fa-caret-right "+styles.rotate:"fas fa-caret-right "}></i>  Checked</p>
       </div>
       <div className={isPointf?styles.hide_lable: styles.hidden}>
       
       {CheckedItem.map((checked , index)=>{
           return (
            <div className={styles.lable_div}>
       <div id="links-point"  onClick={()=>{ setIspoints(!isPoints)}}  className={styles.manage_links_point}></div> 
            <div className={isPoints? styles.manage_links1 : styles.hidden}>

            <div className={styles.manage_links}>
            <button  onClick={()=>{deleleChecked(checked._id)}} ><i className="far fa-trash-alt"></i></button>

            </div>

            </div>
            <input defaultChecked key={index} id={index}  type="checkbox"></input>
         <label className={styles.checked}  >{checked.content}</label>

       </div>
               );
                     
    })}
       </div>




       </div>

       

    </div>
}

export default Task;

