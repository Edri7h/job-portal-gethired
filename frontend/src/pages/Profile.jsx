// import React, { useState } from 'react'

// import { Avatar, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import {  } from '@/components/ui/badge'
// import { Label } from '@/components/ui/label'
// import AppliedJobTable from '../components/AppliedJobTable'
// // import UpdateProfileDialog from './UpdateProfileDialog'
// import { useSelector } from 'react-redux'
// import { Badge } from '@/components/ui/badge'
// import Navbar from '@/components/Navbar'
// // import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// // const skills = ["Html", "Css", "Javascript", "Reactjs"]
// const isResume = true;

// const Profile = () => {
//     // useGetAppliedJobs();
//     // const [open, setOpen] = useState(false);
//     // const {user} = useSelector(store=>store.auth);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-4'>
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
//                         </Avatar>
//                         <div>
//                             <h1 className='font-medium text-xl'>{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
//                 </div>
//                 <div className='my-5'>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                             user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <Label className="text-md font-bold">Resume</Label>
//                     {
//                         isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                     }
//                 </div>
//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//                 {/* Applied Job Table   */}
//                 <AppliedJobTable />
//             </div>
//             {/* <UpdateProfileDialog open={open} setOpen={setOpen}/> */}
//         </div>
//     )
// }

// export default Profile


import profile from "../assets/profile.png"
import React, { useState } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import Navbar from '@/components/Navbar'
import AppliedJobTable from '@/components/AppliedJobTable'
import UpdateProfileDialog from '@/components/UpdateProfileDialog'
import { useSelector } from 'react-redux'
// import UpdateProfileDialog from '@/components/UpdateProfileDialog'

const Profile = () => {
  const [open, setOpen] = useState(false)

  const isResume = true
  const {user}= useSelector(store=>store.auth)

  return (
    <div>
      <Navbar />

      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        {/* Profile Header */}
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage
                src={user.profile.profilePhoto}
                alt={profile}
              />
            </Avatar>

            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p className='text-gray-600 text-sm'>
               {user?.profile?.bio}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className='text-right'
            variant='outline'
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Details */}
        <div className='my-5 space-y-2'>
          <div className='flex items-center gap-3'>
            <Mail className='text-gray-500' />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact className='text-gray-500' />
            <span>+91 {user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className='my-5'>
          <h1 className='font-medium mb-2'>Skills</h1>
          <div className='flex flex-wrap gap-2'>
            {
              user?.profile?.skills?.length>0 ?user.profile.skills.map((skill,index)=>(<Badge key={index} className='rounded-full py-2 px-3'>{skill}</Badge>)):<p className="text-gray-500 text-sm">No skills added yet.</p>

            }
           
          </div>
        </div>

        {/* Resume */}
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {isResume ? (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={user.profile.resume}
              className='text-blue-500 hover:underline'
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className='max-w-4xl mx-auto bg-white rounded-2xl p-5 my-5'>
        {/* <h1 className='font-bold text-lg mb-3'>Applied Jobs</h1> */}
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
