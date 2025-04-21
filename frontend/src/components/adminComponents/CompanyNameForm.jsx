import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";

export default function CompanyNameForm() {
  const [companyName, setCompanyName] = useState("");
  const navigate=useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
        toast.error("Company name cannot be empty!");
        return;
      }
    // console.log("Company name submitted:", companyName);
    try {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
           headers: {
            'Content-Type':'application/json'

            },withCredentials:true})
            // console.log(res)
           
    if(res.data.success){
        toast.success(res.data.message)
        // console.log(res.data.company._id)
        const companyId=res.data.company._id
        navigate(`/admin/company/update/${companyId}`)
        // console.log(res.data.company)
    } else {
        toast.error(res.data.message || "Something went wrong");
      }
        
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

        
    }
  };

  return (
    <>
     <Navbar/>

     <div className="flex justify-center items-center h-96 bg-gray-50">
       
       <Card className="w-full max-w-xl shadow-md">
         <CardHeader>
           <CardTitle className="text-2xl font-bold">Your Company Name</CardTitle>
           <CardDescription className="text-gray-600">
             What would you like to give your company name? you can change this later.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit}>
             <div className="space-y-4">
               <div className="space-y-2">
                 <label htmlFor="companyName" className="text-sm font-medium">
                   Company Name
                 </label>
                 <Input 
                   id="companyName"
                   placeholder="JobHunt, Microsoft etc."
                   value={companyName}
                   onChange={(e) => setCompanyName(e.target.value)}
                   className="w-full border border-gray-300 rounded-md"
                 />
               </div>
               <div className="flex justify-end space-x-2 pt-4">
                 <Button onClick={()=>navigate('/admin/companies')}
                  variant="outline" type="button" className="bg-white">
                   Cancel
                 </Button>
                 <Button 
                  type="submit"
                   className="bg-gray-900 text-white hover:bg-gray-800">
                   Continue
                 </Button>
               </div>
             </div>
           </form>
         </CardContent>
       </Card>
     </div>
    </>
   
  );
}