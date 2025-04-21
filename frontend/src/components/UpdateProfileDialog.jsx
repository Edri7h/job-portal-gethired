// import { 
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "./ui/label";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/utils/constants";
// import { toast } from "sonner";
// import { setUser } from "@/redux/authSlice";

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const {user} =useSelector(state=>state.auth)
//   const dispatch=useDispatch()

//   const [data, setData] = useState({
//     name:user?.fullname || "",
//     email:user?.email || "",
//     phoneNumber:user?.phoneNumber || "",
//     skills: user?.profile?.skills?.map(skill => skill) || "",

//     bio: user?.profile?.bio || "",
//     file:user?.profile?.resume  || "",
//     originalName:user?.profile?.originalname || ""
    

//   })

//   const dataChangeHandler=(e)=>{
//       setData({...data,[e.target.name]:e.target.value})
//   }

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setData({ ...data, file })
// }

// const submitHandler= async (e)=>{
//   e.preventDefault();
//   const formdata= new FormData();
//   formdata.append("fullname",data.name)
//   formdata.append("email",data.email)
//   formdata.append("phoneNumber",data.phoneNumber)
//   formdata.append("bio",data.bio)
//   formdata.append("skills", data.skills)

//   if(data.file){

//     formdata.append("file",data.file)
//   }

//   try {
//     setLoading(true)
//     const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formdata,{
//       headers:{
//         'Content-Type':'multipart/form-data'
//       },
//       withCredentials:true
//     })
//     if(!res.data.success){
//       toast.error(res.data.message)
//     }
//     if(res.data.success){
//       dispatch(setUser(res.data.user))
//       toast.success(res.data.message)
//     }

//   } catch (error) {
//     console.log(error)
//     toast.error(error.response.data.message)
//   }finally{
//     setLoading(false)
//   }
//   setOpen(false);
//   console.log(data)
  
// }
  
//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent 
//           onInteractOutside={() => setOpen(false)} 
//           className="p-3 rounded-lg bg-white max-w-sm mx-auto shadow-lg"
//         >
//           <DialogHeader className="pb-1">
//             <DialogTitle className="text-lg font-semibold text-gray-800">Update Profile</DialogTitle>
//           </DialogHeader>
  
//           <form onSubmit={submitHandler}>
//             <div className="space-y-3">
//               <div>
//                 <Label htmlFor="name" className="text-sm text-gray-700">Name</Label>
//                 <input
//                 value={data.name}
//                 onChange={dataChangeHandler}
//                   id="name"
//                   name="name"
//                   className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 placeholder-gray-400  outline-none text-sm"
//                   placeholder="Your name"
//                 />
//               </div>
  
//               <div>
//                 <Label htmlFor="email" className="text-sm text-gray-700">Email</Label>
//                 <input  
//                  value={data.email}
//                  onChange={dataChangeHandler}
//                   id="email"
//                   name="email"
//                   className="outline mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 outline-none text-sm"
//                   placeholder="Your email"
//                 />
//               </div>
  
//               <div>
//                 <Label htmlFor="phone" className="text-sm text-gray-700">Phone Number</Label>
//                 <input 

//                 value={data.phoneNumber}
//                 onChange={dataChangeHandler}
//                   id="phone"
//                   name="phoneNumber"
//                   className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 placeholder-gray-400  outline-none text-sm"
//                   placeholder="Your phone number"
//                 />
//               </div>
  
//               <div>
//                 <Label htmlFor="bio" className="text-sm text-gray-700">Bio</Label>
//                 <textarea 
//                  value={data.bio}
//                  onChange={dataChangeHandler}
//                   id="bio"
//                   name="bio"
//                   className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 placeholder-gray-400  outline-none text-sm"
//                   rows="2"
//                   placeholder="Tell us about yourself"
//                 />
//               </div>
  
//               <div>
//                 <Label htmlFor="skills" className="text-sm text-gray-700">Skills</Label>
//                 <input
//                 value={data.skills}
//                 onChange={dataChangeHandler}
//                   id="skills"
//                   name="skills"
//                   className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 placeholder-gray-400 outline-none text-sm"
//                   placeholder="Your skills"
//                 />
//               </div>
  
//               <div>
//                 <Label htmlFor="resume" className="text-sm text-gray-700">Resume</Label>
//                 <input
//                   type="file"
//                   id="file"
//                   name="file"
               
//                   accept="application/pdf"
//                   onChange={fileChangeHandler}
//                   className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 outline-none text-sm"
//                 />
//                 {data.name && (
//                 <p className="mt-1 text-red-600 text-sm">
//                   {data.originalName} {/* Displaying the file name here */}
//                 </p>
//                  )}
//               </div>
//             </div>
  
//             <div className="mt-4">
//               <button
//                 type="submit"
//                 // disabled={loading}
//                 className="cursor-pointer w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors text-sm flex justify-center items-center"
//                 // onClick={(e) => {
                  
//                 //   // Simulate API call
//                 //   setTimeout(() => setLoading(false), 1500);
//                 // }}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                     Saving...
//                   </>
//                 ) : (
//                   "Save Changes"
//                 )}
//               </button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDialog;


import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    bio: user?.profile?.bio || "",
    file: user?.profile?.resume || "",
    originalName: user?.profile?.originalname || ""
  });

  const dataChangeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setData({ ...data, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname", data.name);
    formdata.append("email", data.email);
    formdata.append("phoneNumber", data.phoneNumber);
    formdata.append("bio", data.bio);
    formdata.append("skills", data.skills);

    if(data.file) {
      formdata.append("file", data.file || user?.profile?.resume);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      if(!res.data.success) {
        toast.error(res.data.message);
      }
      if(res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    
    setOpen(false);
    console.log(data);
  };
  
  return (
    <Dialog open={open}>
      <DialogContent 
        onInteractOutside={() => setOpen(false)} 
        className="p-4 rounded-lg bg-white max-w-2xl mx-auto shadow-md"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <button 
            onClick={() => setOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>
  
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-3">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs font-medium text-gray-700">Name</Label>
                <input
                  value={data.name}
                  onChange={dataChangeHandler}
                  id="name"
                  name="name"
                  className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 text-sm"
                  placeholder="Your name"
                />
              </div>
  
              <div>
                <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email</Label>
                <input  
                  value={data.email}
                  onChange={dataChangeHandler}
                  id="email"
                  name="email"
                  className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 text-sm"
                  placeholder="Your email"
                />
              </div>
  
              <div>
                <Label htmlFor="phone" className="text-xs font-medium text-gray-700">Phone Number</Label>
                <input 
                  value={data.phoneNumber}
                  onChange={dataChangeHandler}
                  id="phone"
                  name="phoneNumber"
                  className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 text-sm"
                  placeholder="Your phone number"
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="bio" className="text-xs font-medium text-gray-700">Bio</Label>
                <textarea 
                  value={data.bio}
                  onChange={dataChangeHandler}
                  id="bio"
                  name="bio"
                  className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 text-sm"
                  rows="2"
                  placeholder="Tell us about yourself"
                />
              </div>
  
              <div>
                <Label htmlFor="skills" className="text-xs font-medium text-gray-700">Skills</Label>
                <input
                  value={data.skills}
                  onChange={dataChangeHandler}
                  id="skills"
                  name="skills"
                  className="mt-1 px-3 py-1.5 w-full rounded-md border border-gray-300 text-gray-800 text-sm"
                  placeholder="Your skills (comma separated)"
                />
              </div>
  
              <div>
                <Label htmlFor="resume" className="text-xs font-medium text-gray-700">Resume</Label>
                <div className="flex items-center mt-1">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="application/pdf"
                    onChange={fileChangeHandler}
                    className="w-full text-xs py-1 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-white file:bg-gray-900 file:text-xs file:font-medium hover:file:cursor-pointer hover:file:bg-gray-600"
                  />
                </div>
                {data.originalName && (
                  <p className="mt-1 text-xs text-purple-600 truncate">
                    {data.originalName}
                  </p>
                )}
              </div>
            </div>
          </div>
  
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mr-2 py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-1.5 px-4 bg-gray-950 hover:bg-gray-700 text-white text-sm font-medium rounded-md flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-3 w-3" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;