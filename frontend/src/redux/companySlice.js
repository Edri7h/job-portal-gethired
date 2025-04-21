import { createSlice } from "@reduxjs/toolkit";


const companySlice= createSlice({
    name:"company",
    initialState:{
        companyData:{},
        allCompanyList:[]
    }
    ,
    reducers:{
        setCompanyData:(state,action)=>{
            state.companyData=action.payload
        },
        setAllCompany:(state,action)=>{
            state.allCompanyList=action.payload
        }
    }
})

export const {setCompanyData,setAllCompany}=companySlice.actions
export default companySlice.reducer