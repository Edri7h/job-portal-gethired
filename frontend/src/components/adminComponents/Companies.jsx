// import { useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { MoreVertical, Pencil, BarChart } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function CompanyListing() {
//   const companies= useSelector(state=>state.company.allCompanyList)
  

//   const [filterText, setFilterText] = useState('');

//   const filteredCompanies = companies.filter(company =>
//     company.name.toLowerCase().includes(filterText.toLowerCase())
//   );
// const navigate=useNavigate()
//   const handleAddNewCompany = () => {
//     navigate('/admin/company/create')
//     // Implementation for adding a new company
//   };

//   const handleEditCompany = (id) => {
//     console.log("Editing company with id:", id);
//     // Implementation for editing a company
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <div className="w-72">
//           <Input
//             placeholder="Filter by name"
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             className="border border-gray-200"
//           />
//         </div>
//         <Button 
//           onClick={handleAddNewCompany}
//           variant="default" 
//           className="bg-gray-900 hover:bg-gray-800"
//         >
//           New Company
//         </Button>
//       </div>

//       <div className="border rounded-md">
//         <div className="grid grid-cols-12 bg-white p-4 border-b">
//           <div className="col-span-1 font-medium text-gray-600">Logo</div>
//           <div className="col-span-6 font-medium text-gray-600">Name</div>
//           <div className="col-span-4 font-medium text-gray-600">Date</div>
//           <div className="col-span-1 font-medium text-gray-600 text-right">Action</div>
//         </div>
        
//         {filteredCompanies.length > 0 ? (
//           filteredCompanies.map((company) => (
//             <div key={company.id} className="grid grid-cols-12 items-center bg-white p-4 border-b hover:bg-gray-50">
//               <div className="col-span-1">
//                 <div className={`w-8 h-8 ${company.logoColor} rounded-md flex items-center justify-center`}>
//                   {company.logoIcon}
//                 </div>
//               </div>
//               <div className="col-span-6 font-medium">{company.name}</div>
//               <div className="col-span-4 text-gray-600">{company.date}</div>
//               <div className="col-span-1 text-right">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="icon">
//                       <MoreVertical className="h-5 w-5" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-36">
//                     <DropdownMenuItem 
//                       className="cursor-pointer"
//                       onClick={() => handleEditCompany(company.id)}
//                     >
//                       <Pencil className="mr-2 h-4 w-4" />
//                       <span>Edit</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="py-12 text-center text-gray-500">
//             A list of your recent registered companies
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, BarChart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAdminCompanies from '@/hooks/useGetAdminCompanies';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from '../Navbar';

export default function CompanyListing() {
  useGetAdminCompanies()
  let companies = useSelector(store => store.company.allCompanyList);
  const filterCompanies=companies;
  // console.log(companies)
  const [filterText, setFilterText] = useState('');

  // const filteredCompanies = companies.filter(company =>
  //   company.name.toLowerCase().includes(filterText.toLowerCase())
  // );
  companies=filterCompanies.filter((company)=>company.name.toLowerCase().includes(filterText.toLowerCase()))
  
  
  const navigate = useNavigate();
  
  const handleAddNewCompany = () => {
    navigate('/admin/company/create');
    // Implementation for adding a new company
  };

  const handleEditCompany = (id) => {
    // console.log("Editing company with id:", id);
    navigate(`/admin/company/update/${id}`);
    // Implementation for editing a company
  };

  const handleViewStats = (id) => {
    // console.log("Viewing stats for company with id:", id);
    // navigate(`/admin/company/stats/${id}`);
    // Implementation for viewing company statistics
  };


  return (
   <>
   <Navbar/>


<div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="w-72">
          <Input
            placeholder="Filter by name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border border-gray-200"
          />
        </div>
        <Button 
          onClick={handleAddNewCompany}
          variant="default" 
          className="bg-gray-900 hover:bg-gray-800"
        >
          New Company
        </Button>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 bg-white p-4 border-b">
          <div className="col-span-1 font-medium text-gray-600">Logo</div>
          <div className="col-span-6 font-medium text-gray-600">Name</div>
          <div className="col-span-4 font-medium text-gray-600">Date</div>
          <div className="col-span-1 font-medium text-gray-600 text-right">Action</div>
        </div>
        
        {companies && companies?.length > 0 ? (
          companies.map((company) => (
            <div key={company._id} className="grid grid-cols-12 items-center bg-white p-4 border-b hover:bg-gray-50">
              <Avatar className="h-15 w-15 cursor-pointer">
                      <AvatarImage src={company.logo} alt="User" />
                      <AvatarFallback>
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse"></div>
</AvatarFallback>


                    </Avatar>
              <div className="col-span-6 font-medium">{company.name}</div>
              <div className="col-span-4 text-gray-600">{new Date(company.updatedAt).toLocaleDateString()}</div>
              <div className="col-span-1 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleEditCompany(company._id)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => handleViewStats(company.id)}
                    >
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Statistics</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">
           {filterText? "No company found" :  "A list of your recent registered companies"}
           
          </div>
        )}
        
      </div>
    </div>
   </>
  );
}