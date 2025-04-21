import { setAdminCreatedJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAdminJobs = () => {
    // const allJobsAdmin =useSelector(state=>state.job.adminCreatedJobs)
    const dispatch=useDispatch()
  useEffect(() => {
    
    const fetchAllAdminJobs=async()=>{
        try { 

        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true})
            // console.log(res.data.jobs)
        if(res.data.success){
                dispatch(setAdminCreatedJobs(res.data.jobs))
        }
        } catch (error) {
            console.log(error)
        }
    }
     fetchAllAdminJobs()

  

  }, [])
  
}

export default useGetAdminJobs