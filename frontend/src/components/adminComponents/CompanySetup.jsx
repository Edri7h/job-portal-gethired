

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";

export default function CompanySetup() {
  const params = useParams();
  const companyId = params.id;
  useGetCompanyById(companyId);
  const companyDetails = useSelector(state => state.company.companyData)
  // console.log(companyDetails.logo)
  // console.log(companyDetails);

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",

    file: null,
  });
  // setFormData({...formData,file:companyDetails.logo})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData({ ...formData, file });
    }
  };

  
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Data = new FormData();
    if (!formData.companyName || !formData.description || !formData.website || !formData.location || !formData.file) {
      //  console.log(formData.companyName , formData.description , formData.website ,formData.location , formData.file )
      toast.error("all fields are required")
      return
    }
    Data.append("name", formData.companyName)
    Data.append("description", formData.description)
    Data.append("website", formData.website)
    Data.append("location", formData.location)
    Data.append("file",formData.file)

    // const formData = new FormData();



    // if (formData instanceof File) {
    //   Data.append("file", formData.file )
    // }
    // else{
    //   toast.error("all fields are required")
    //   return 
    // }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${companyDetails._id}`, Data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      console.log(res.data.success)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')

      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }

  };
  useEffect(() => {
    setFormData({
      companyName: companyDetails.name || "",
      description: companyDetails.description || "",
      website: companyDetails.website || "",
      location: companyDetails.location || "",
      file: companyDetails.logo || null

    })

  }, [companyDetails])
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 bg-white">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate('/admin/companies')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Company Setup</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={1}
              />
            </div>

            <div>
              <label htmlFor="website" className="text-sm font-medium">
                Website
              </label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://"
              />
            </div>

            <div>
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="logo" className="text-sm font-medium">
              Logo
            </label>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="logo-upload"
                className="cursor-pointer border rounded px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100"
              >
                Choose
              </label>
              <span className="text-sm text-gray-500">
                {formData.file ? formData.file.name : "No file chosen"}
              </span>
              <input
                id="logo-upload"
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {
            loading ? (<Button className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-md shadow-sm transition-colors text-sm" ><Loader2 className='animate-spin mr-2 h-4 w-4' />please wait</Button>) : (
              <button

                type="submit"
                className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white font-medium rounded-md shadow-sm transition-colors text-sm"
              >
                Update
              </button>

            )
          }
        </form>
      </div>
    </>
  );
}


