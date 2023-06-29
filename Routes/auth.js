const router=require("express").Router();
const User=require("../models/User");
const CryptoJS=require("crypto-js");
const jwt=require("jsonwebtoken");

//Register

router.post("/register",async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        //here we are directly taking password from user which hampers privacy
        //so we need to encrypt this
        //using crypoJs
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
        // password:req.body.password,

    });
    try{
        const savedUser=await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser)
    }
    catch(err){res.status(500).json(err)};
});

//LOGIN PAGE
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
         //conditions
         if(!user){
            res.status(401).json("Wrong credentials!");
            return;
 
         }
        const hashedPassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_KEY

        ).toString(CryptoJS.enc.Utf8);
        if(hashedPassword!==req.body.password) {

            res.status(401).json("Wrong credentials");
            return;
        }

        //adding JWT authentication
        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },
         process.env.JWT_KEY,
         {expiresIn:"3d"}
        );

        const{password,...others}=user._doc;

        //     res.status(200).json({...others,accessToken});
        res.status(200).json({...others,accessToken});
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports=router;
