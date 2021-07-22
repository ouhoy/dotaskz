import cookie from "js-cookie";


// set in the cookie
export const setCookie = (key, value) =>{
    if(window!== "undefined") {
        cookie.set(key, value,{
            expires: 1
        })
    }
}
// remove the cookie
export const removeCookie = (key) =>{
    if(window!== "undefined") {
        cookie.remove(key, {
            expires: 1
        })
    }
}
// get from such as stored token
export const getCookie = (key) =>{
    if(window!== "undefined") {
      return cookie.get(key)
    }
}
//set in local storage
export const setLocalStorage = (key, value) =>{
    if(window!== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
}
// rm f local storage
export const removeLocalStorage = (key) =>{
    if(window!== "undefined") {
      localStorage.removeItem(key)
    }
}
//auth user by passing data to cookie and localstorage guring signin
export const authenticate = (response, next) =>{
    setCookie("token" , response.data.token)
    setLocalStorage("user" , response.data.user)
    next();
}
//access
export const isAuth = () =>{
    if(window !== "undefined") {
    const cookieChecked = getCookie('token')
    if(cookieChecked) {
        if(localStorage.getItem("user")){
            return JSON.parse(localStorage.getItem("user"))
        }else {
            return false;
        }
    }
    }
}



export const signout = next =>{
    removeCookie('token')
    removeLocalStorage("user")
    next();
}
