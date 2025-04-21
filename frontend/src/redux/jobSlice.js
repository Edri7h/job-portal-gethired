import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        adminCreatedJobs:[],
        userAppliedJobs:[],
        searchedQuery:""
    },

    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs=action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAdminCreatedJobs:(state,action)=>{
            state.adminCreatedJobs=action.payload
        },
        setUserAppliedJobs:(state,action)=>{
            state.userAppliedJobs=action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery=action.payload
        }
    }
})

export const {setAllJobs,setSingleJob,setAdminCreatedJobs,setUserAppliedJobs,setSearchedQuery}=jobSlice.actions
export default jobSlice.reducer