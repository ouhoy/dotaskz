const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const _ = require("lodash");
const Task = require("./models/tasks");
const CheckedItem = require("./models/CheckedItems")
const { UserRefreshClient } = require("google-auth-library");
const PORT = 5000;
const auth = require("./controllers/auth");

require("dotenv").config(); 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

 
mongoose.connect(`${process.env.MDB_CONNECT}/montdls-lg-rg`, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true } , (err)=>{
    if (err) return console.error(err);
    console.log("Connected to MongoDB successfully")
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:3000"],
    credentials :true,
  }));
  

app.post("/signup", async(req,res)=>{

    const {name, email, password} = req.body;
    const salt =  await bcrypt.genSalt();
    const passwordHash = await  bcrypt.hash(password, salt);
  
    try {
        if(!name) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields",
                errorMessageName: "Please enter your name.",
                name: true

            })
        }
        if( !email) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields",
                errorMessageEmail: "Please enter your email.",
                email: true
            })
        }
        if(!password) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields",
                errorMessagePassword: "Please enter your password.",
                password:true

            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                errorMessage:"Please enter a password of at least 8 characters.",
                errorMessagePassword: "Please enter a password of at least 8 characters.",
                password:true
            })
        }
        User.findOne({email}).exec((err, user)=>{
            if(user){
                return res.status(400).json({
                    errorMessage: `This email: ${email} is taken`,
                    errorMessageEmail: `This email: ${email} is taken.`,
                    email: true


                });
            }
        });
  
        const token = jwt.sign({name, email, passwordHash}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: "20m"})
  
        const msg = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
  
            html:`
            <p>Please use the following link to activate your account</p>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
  
            `
        }
  
        sgMail.send(msg).then(sent =>{
            return res.status(200).json({
                message: `An email has been sent to ${email}`,
                success: true
            })
        }).catch(err=>{
            res.status(400).json({
              errorMessage: `Something went wrong: ${err}`
          })
        })
  
        
  
  
  
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
})

app.post("/account-activation", async(req,res)=>{

    const { token } = req.body;

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
                return res.status(401).json({
                    errorMessage: 'Expired link. Signup again'
                });
            }

            const { name, email, passwordHash } = jwt.decode(token);

            const user = new User({ name, email, password:passwordHash});

            user.save((err, user) => {
                if (err) {
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                    return res.status(401).json({
                        errorMessage: 'Error saving user in database. Try signup again'
                    });
                }
                return res.json({
                    message: 'Signup success. Please signin.'
                });
            });
        });
    } else {
        return res.json({
            message: 'Something went wrong. Try again.'
        });
    }
});

app.post("/signin",async (req,res)=>{

    
    
    const {email, password} = req.body;
    try {
      
        if( !email) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields",
                errorMessageEmail: "Please enter your email.",
                email: true

            })
        }
        if(!password) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields",
                errorMessagePassword: "Please enter your password.",
                password:true

            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                errorMessage:"Please enter a password of at least 8 characters.",
                errorMessagePassword: "Please enter a password of at least 8 characters.",
                password:true
            })
        }

        const existingUser = await User.findOne({email});

        User.findOne({email}).exec(async(err, user)=>{
            if(err || !user) {
                return res.status(400).json({
                    errorMessage: "User with that email does not exist. Please signup",
                    errorMessageEmail: "User with that email does not exist. Please signup",
                    email: true
                })
            }
            //Authenticate
            const passwordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!passwordCorrect)
            return res.status(401).json({
                errorMessage: "Wrong password!",
                errorMessagePassword: "Wrong password!",
                password: true

            })
            //Generate a token and send it to the client

            const token = jwt.sign({_id: user._id}, process.env.JWT_SCRET, {expiresIn: "7d"});
             res.json({
                token, user
            })
           



        })
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }


});

app.put("/forgot-password", (req,res)=>{
    const {email} = req.body;
    if( !email) {
        return res.status(400).json({
            errorMessage: "Please enter all required fields",
            errorMessageEmail: "Please enter your email.",
            email: true

        })
    }
    User.findOne({email}, (err, user)=>{
        if(err || !user) {console.log(err)}

        const token = jwt.sign({_id:user._id}, process.env.JWT_RESET_PASSWORD, {expiresIn: "20m"})
  
        const msg = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Reset password link`,
  
            html:`
            <p>Please use the following link to reset your password</p>
            <p>${process.env.CLIENT_URL}/auth/reset-password/${token}</p>
  
            `
        }
  
       return user.updateOne({resetPasswordLink:token}, (err, done)=>{
           if(err){console.log(err)} else {
            sgMail.send(msg).then(sent =>{
                console.log("email has been sent" , sent)
                return res.status(200).json({

                    message: `An email has been sent to ${email}`,
                    success: true
                })
            }).catch(err=>{
                res.status(400).json({
                    errorMessageEmail: `Something went wrong please try again: ${err}`,
                    email: true

              })
            })
           }
       })
  

    })
})

app.put("/reset-password",async (req,res)=>{
    const {resetPasswordToken, password, newPassword} = req.body;
    if(!password || !newPassword) {
     return res.status(400).json({
         errorMessage: "Please enter all required fields",
         errorMessagePassword: "Please enter your password.",
         password:true
 
     })
 }
 if (password.length < 8 || newPassword.length < 8) {
     return res.status(400).json({
         errorMessage:"Please enter a password of at least 8 characters.",
         errorMessagePassword: "Please enter a password of at least 8 characters.",
         password:true
     })
 }
 if(password != newPassword) {
      return res.status(400).json({
         errorMessage:"Please make sure that your passwords are matching.",
         errorMessagePassword: "Please make sure that your passwords are matching.",
         password:true
     })
 }
     const salt =  await bcrypt.genSalt();
    const passwordHash = await  bcrypt.hash(newPassword, salt);
    if (resetPasswordToken) {
        jwt.verify(resetPasswordToken,process.env.JWT_RESET_PASSWORD, (err, verified)=> {
            if(err) { res.status(404).json({error:"Your link has been expired please try again"})}
          
            else{  
            User.findOne({resetPasswordLink:resetPasswordToken}, (err, user)=> {
                if(err ||!user){ res.status(404).json({error:"Something went wrong with thr error:", err})}
              user.password = passwordHash; 
              user.resetPasswordLink= "";
              user.save((err)=>{
                  if(err) { res.status(404).json({error:"Something went wrong with thr error:", err})}
                  else {
                    res.status(200).json({
                        message:"You have updated your password successfuly.",
                        success: true
                    })
                  }
              })
            })}
        } )
    }

})

app.post("/" , auth ,async (req ,res)=>{
    const content = req.body.content
    const user = req.user._id;

const task = new Task ({
    content: content,
    user_id: user
});
 await task.save();
 res.send("Saved data")
})

app.get("/" ,auth, async(req , res)=>{
    const user = req.user._id;
    Task.find({user_id:user} , (err, results)=>{

        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    })
})
app.get("/CheckedItem" ,auth, async(req , res)=>{
    const user = req.user._id;
    CheckedItem.find({user_id:user} , (err, results)=>{

        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    })
})

app.delete("/:id" , async(req, res) =>{
    const id = req.params.id;
    await Task.findByIdAndDelete(id).exec()
    res.send("Item deleted")
})

app.delete("/checked/:id" , async(req ,res)=>{
    const id = req.params.id;
    Task.findOne({_id : id} , function(err , foundTask) {
        if(err) {
            console.log(err)
        }else {


            const checked = CheckedItem ({
                content : foundTask.content,
                user_id: foundTask.user_id
            })
            checked.save();
          }

    })
    await Task.findByIdAndRemove(id).exec()
    res.send("Item deleted")
})

app.put("/", async(req ,res)=>{

    const newTask = req.body.newTask;
    const id = req.body.id;
    try {

        await Task.findById(id, (error, foundById)=>{
            foundById.content = newTask;
            foundById.save()


        })
    } catch(err){
        console.log(err)
    }
    res.send("Updated")
})


app.delete("/deletechecked/:id", async(req , res)=>{
    const id = req.params.id;
    await CheckedItem.findByIdAndRemove(id).exec()
    res.send("Item deleted")


})



//  listening on that port
  app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})
