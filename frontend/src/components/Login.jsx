import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice.js';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const navigate =useNavigate();
  const dispatch =useDispatch();
 
  const [userType, setUserType] = useState('student');
  const {loading,user}= useSelector(state=>state.auth)


  const [fieldData, setfieldData] = useState({
    email: "",
    password: "",
    role: "" || userType
  });
  const fieldDataChangeHandler = (e) => {
    setfieldData({ ...fieldData, [e.target.name]: e.target.value })
  };

  const userChangeHandler = (e) => {
    setUserType(e.target.id)
    setfieldData({ ...fieldData, role: e.target.id })
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
  
  //  console.log(fieldData)

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, fieldData, {
        headers: {
          "content-type": "application/json"
        },
        withCredentials: true
      })
      if(res.data.success){
        dispatch(setUser(res.data.user)) 
        navigate("/")
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }finally{
      dispatch(setLoading(false))
    }
  };
  // useEffect(() => {
  //  if(user){
  //   navigate('/')
  //  }
  
    
  // }, [])
  
  return (
    <>
    <Navbar/>

    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Login</h1>
        
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
               value={fieldData.email}
               name='email'
               onChange={fieldDataChangeHandler}
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
               value={fieldData.password}
               name='password'
               onChange={fieldDataChangeHandler}
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            <div className="flex justify-end mt-1">
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <label className="block text-sm font-medium text-gray-700 w-20">
              I am a:
            </label>
            <div className="flex flex-1 space-x-2">
              <div   id='student'
                className={`flex-1 py-1 px-2 border border-gray-300 rounded-md text-center text-sm cursor-pointer transition-colors ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={userChangeHandler}
              >
                Student
              </div>
              <div  id='recruiter'
                className={`flex-1 py-1 px-2 border border-gray-300 rounded-md text-center text-sm cursor-pointer transition-colors ${userType === 'recruiter' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={userChangeHandler}
              >
                Recruiter
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 pt-2">
           {
            loading?(<Button  className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-md shadow-sm transition-colors text-sm" ><Loader2 className='animate-spin mr-2 h-4 w-4'/>please wait</Button>):(
              <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-md shadow-sm transition-colors text-sm"
            >
              Login
            </button>
            
            )
           }
            <div className="relative flex items-center justify-center py-1">
              <div className="border-t w-full border-gray-300"></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-colors text-sm"
            >
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Login with Google
            </button>
            
            <div className="text-center mt-2 text-sm">
              Don't have an account? 
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}