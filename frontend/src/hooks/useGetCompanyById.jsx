import { setCompanyData } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchThisJob = async () => {

            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })
//                 console.log(res.data.company)
// console.log(res.data.success)
                if (res.data.success) {
                    dispatch(setCompanyData(res.data.company))
                }

            } catch (error) {
                        console.log(error)
            }
        }
        fetchThisJob()


    }, [companyId,dispatch])

}

export default useGetCompanyById