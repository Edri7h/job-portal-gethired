import { useState } from 'react';
import { MoreVertical, Pencil, Search } from 'lucide-react';
import useGetAdminJobs from '@/hooks/useGetAdminJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

export default function JobDashboard() {
  useGetAdminJobs();
  const allJobsAdmin =useSelector(state=>state.job.adminCreatedJobs)
const navigate = useNavigate()
  
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredJobs = allJobsAdmin.filter(job => 
    job?.company.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
    <Navbar/>

<div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Filter by name, role"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button onClick={()=>navigate('/admin/jobs/post')}  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Add Job
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-6 font-medium text-gray-600">Company Name</th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">Role</th>
              <th className="text-left py-4 px-6 font-medium text-gray-600">Date</th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 px-6">{job.company.name}</td>
                <td className="py-4 px-6">{job.title}</td>
                <td className="py-4 px-6">{new Date(job.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => navigate(`/admin/jobs/applications/${job._id}`)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Applicants</span>
                    </DropdownMenuItem>
                    
                  </DropdownMenuContent>
                </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No jobs found
          </div>
        )}
        
        {filteredJobs.length > 0  && (
          <div className="text-center py-6 text-gray-500">
            A list of your recent posted jobs
          </div>
        )}
      </div>
    </div>
    </>
  );
}