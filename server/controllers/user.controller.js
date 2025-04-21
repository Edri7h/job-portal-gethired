import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        // console.log(fullname, email, password, phoneNumber, role )
        if(!req.file){
            return res.status(400).json({
                message:"profile photo is required",
                success:false
            })
        }
      const file =req.file;
    
        
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: " all fields are required",
                success: false
            });
        }
        if(phoneNumber.length !== 10){
            return res.status(400).json({
                message: " invalid credentials",
                success: false
            });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                message: 'credentials are already taken',
                success: false
            })
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const fileUri=  getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type:  'raw'
      });

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url // profile picture upload
            }
            
        });
        return res.status(201).json({
            message: "account created Successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // console.log( email, password,  role )
        if (!email || !password || !role) {
            return res.status(400).json({
                message: " all fields are required",
                success: false
            })
        }
        let user =await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "incorrect credentials",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "incorrect credentials",
                success: false
            })
        }
        //check role as well
        if (role !== user.role) {
            return res.status(400).json({
                message: "incorrect credentials",
                success: false
            })
        }
        const forTokenData = {
            userId: user._id
        }
        const token = jwt.sign(forTokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
            //same site none or strict check later
        return res.status(200).cookie("token", token , { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        })




    } catch (error) {
        console.log(error)

    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)

    }
}


export const updateProfile = async (req, res) => {

    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        //cloudinary 
            // console.log(fullname, email, phoneNumber, bio, skills )
            // const file= req.file;
            //     const fileUri= getDataUri(file);
                const file = req.file;
 
                if(file){
                const MAX_FILE_SIZE = 10 * 1024 * 1024; 
                // 10 MB in bytes
                if (file.size > MAX_FILE_SIZE) {
                  return res.status(400).json({
                    message: "File size should not exceed 10 MB.",
                    success: false,
                  });
                }
            }
                const fileUri = getDataUri(file);
                
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                  resource_type:  'raw'
                });
                
                  

        //
        let skillsArrray;
        if (skills) {
            skillsArrray = skills.split(',')


        }
        const userId = req.id //
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber && phoneNumber.length!==10){
            return res.status(400).json({
                success:false,
                message :"invalid Phone Number"
            })
        }
        user.phoneNumber = phoneNumber
            
        if (bio)  user.profile.bio = bio 
        if (skills) user.profile.skills = skillsArrray
        if(cloudResponse){
            user.profile.resume= cloudResponse.secure_url
            user.profile.resumeOriginalName=file.originalname
        }
        await user.save()


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "profile updated succesfully",
            user,
            success: true
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message, 
        });
    }
}


