import React from "react";
import profile from "../assets/profile.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  // const user=true
  const {user} =useSelector(store=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const logoutHandler=async ()=>{
    try {
      
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
          if(res.data.success){
            dispatch(setUser(null))
            toast.success(res.data.message)
              navigate("/")
          }
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <nav className="relative flex justify-between items-center py-4 px-6 md:px-12 ">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-blue-500/20 blur-xl z-0"></div>
      
      {/* Content - positioned above the blurred background */}
      <div className="relative z-10 flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            <span className="text-black">Get</span>
            <span className="text-red-600">Hired</span>
          </Link>
        </div>

        {/* Navigation Links */}
        
        <div className="flex items-center space-x-6">

        {
          user && user.role==='recruiter'? (<>
           <Link to="/admin/companies" className="text-gray-900 hover:text-gray-600 text-sm font-medium">
            companies
          </Link>
          <Link to="/admin/jobs" className="text-gray-900 hover:text-gray-600 text-sm font-medium">
            Jobs
          </Link>

          </>)
          :
          (<>
          <Link to="/" className="text-gray-900 hover:text-gray-600 text-sm font-medium">
            Home
          </Link>
          <Link to="/jobs" className="text-gray-900 hover:text-gray-600 text-sm font-medium">
            Jobs
          </Link>
          <Link to="/browse" className="text-gray-900 hover:text-gray-600 text-sm font-medium">
            Browse
          </Link>
          
          </>)
        }
          

          {!user ? (
            <div className="flex items-center space-x-3 ml-4">
              <Link to="/signup">
                <Button variant="outline" className="rounded-full px-5 text-sm font-medium h-9">
                  Sign Up
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-5 text-sm font-medium h-9">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {/* Avatar with Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="outline-none">
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                      <AvatarFallback> <img src={profile} alt="" />
  {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div> */}
</AvatarFallback>


                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 mt-1 p-0">
                  <div className="p-4 border-b">
                    <p className="text-sm font-medium">{user.fullname}</p>
                  </div>
                  <div className="p-2">
                    <div className="flex flex-col space-y-1">
                     { user && user.role ==='student' && 
                      <Link to="/profile" className="text-sm px-2 py-1.5 hover:bg-slate-100 rounded-md">
                        Profile
                      </Link>
                      }
                      {/* <Link to="/applications" className="text-sm px-2 py-1.5 hover:bg-slate-100 rounded-md">
                        Applications
                      </Link> */}
                      {/* <Link to="/saved-jobs" className="text-sm px-2 py-1.5 hover:bg-slate-100 rounded-md">
                        Saved Jobs
                      </Link> */}
                      {/* <Link to="/settings" className="text-sm px-2 py-1.5 hover:bg-slate-100 rounded-md">
                        Settings
                      </Link> */}
                      {/* <hr className="my-1" /> */}
                      <button onClick={logoutHandler} className="text-sm text-left text-red-500 px-2 py-1.5 hover:bg-slate-100 rounded-md">
                        Logout
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;