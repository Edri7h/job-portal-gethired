import { setAllCompany } from "@/redux/companySlice";
import { APPLICATION_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAdminCompanies = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const getAllCompanies = async () => {
        try {
          const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
            withCredentials: true
          });
          // console.log("kkkk");
          
          if (res.data.success) {
            dispatch(setAllCompany(res.data.companies || []));
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      getAllCompanies();
    }, [dispatch]);
  };
  
  export default useGetAdminCompanies;
  