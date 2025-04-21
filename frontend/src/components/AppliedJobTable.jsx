// import { useEffect } from "react"
// import { Badge } from "./ui/badge"
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
// import axios from "axios"
// import { APPLICATION_API_END_POINT } from "@/utils/constants"
// import { useDispatch, useSelector } from "react-redux"
// import { setUserAppliedJobs } from "@/redux/jobSlice"

// const AppliedJobTable = () => {
// const dispatch =useDispatch();
// const userApplications= useSelector(state=>state.job.userAppliedJobs) || []

//   useEffect(() => {
//     const getAppliedJobs = async ()=>{
//       try {
//         const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{
//           withCredentials:true
//         })
//         console.log(res.data.success)
//         console.log(res.data.applications)
//         if(res.data.success){
//           dispatch(setUserAppliedJobs(res.data.applications))

//         }
       
        
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getAppliedJobs()
   
//   }, [dispatch])
  
//     return (
//       <>
//       <div>
//         <Table>
//           <TableCaption>A list of your applied jobs</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Date</TableHead>
//               <TableHead>Job Role</TableHead>
//               <TableHead>Company</TableHead>
//               <TableHead className="text-right">Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {
//              userApplications.map((userApplication, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{new Date(userApplication.createdAt).toLocaleDateString()}</TableCell>
//                   <TableCell>{userApplication.job.title}</TableCell>
//                   <TableCell>{userApplication.job.company.name}</TableCell>
//                   <TableCell className="text-right">
//                     <Badge className="px-3 py-2">{userApplication.status}</Badge>
//                   </TableCell>
//                 </TableRow>
//               ))
//             }
//           </TableBody>
//         </Table>
//       </div>
//       </>
//     )
//   }
  
//   export default AppliedJobTable
  




import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, AlertCircle, Search, Filter, RefreshCw, Briefcase, Calendar, Building } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserAppliedJobs } from "@/redux/jobSlice";

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const userApplications = useSelector(state => state.job.userAppliedJobs) || [];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
        withCredentials: true
      });
      
      if (res.data.success) {
        dispatch(setUserAppliedJobs(res.data.applications));
      } else {
        setError("Failed to load applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load your applications. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [dispatch]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchApplications();
  };

  const getBadgeColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case 'rejected':
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case 'interview':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case 'accepted':
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const filteredAndSortedApplications = userApplications
    .filter(app => {
      const matchesSearch = 
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.company.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" ||
        app.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      if (sortConfig.key === 'createdAt') {
        return direction * (new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortConfig.key === 'title') {
        return direction * a.job.title.localeCompare(b.job.title);
      } else if (sortConfig.key === 'company') {
        return direction * a.job.company.name.localeCompare(b.job.company.name);
      } else if (sortConfig.key === 'status') {
        return direction * a.status.localeCompare(b.status);
      }
      return 0;
    });

  const statusOptions = ["all", "pending", "interview", "accepted", "rejected"];

  if (isLoading && !isRefreshing) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-64 bg-gray-50 rounded-lg border shadow-sm">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-700 font-medium">Loading your applications...</p>
        <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-64 bg-red-50 rounded-lg border border-red-100 shadow-sm">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-red-700 font-medium">{error}</p>
        <button 
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          <div className="flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-blue-500" />
            Job Applications
          </div>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-md w-full bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {userApplications.length === 0 ? (
        <div className="text-center p-12 border rounded-lg bg-gray-50 shadow-sm">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Applications Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You haven't applied to any jobs yet. When you do, they'll appear here.
          </p>
        </div>
      ) : filteredAndSortedApplications.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No applications match your filter criteria.</p>
          <button 
            onClick={() => {setSearchTerm(""); setStatusFilter("all");}}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="rounded-lg border shadow-sm overflow-hidden bg-white">
          <Table>
            <TableCaption className="pb-4">
              Showing {filteredAndSortedApplications.length} of {userApplications.length} applications
            </TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead 
                  className="font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Date
                    {sortConfig.key === 'createdAt' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    Job Role
                    {sortConfig.key === 'title' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    Company
                    {sortConfig.key === 'company' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right font-semibold cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center justify-end">
                    Status
                    {sortConfig.key === 'status' && (
                      <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedApplications.map((app, index) => (
                <TableRow 
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                >
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{formatDate(app.createdAt)}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(app.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{app.job.title}</div>
                    <div className="text-sm text-gray-500">
                      {app.job.location || "Remote"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-6 w-6 mr-2 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {app.job.company.logo ? (
                          <img 
                            src={app.job.company.logo} 
                            alt={`${app.job.company.name} logo`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold">
                            {app.job.company.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span>{app.job.company.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${getBadgeColor(app.status)} px-3 py-1`}>
                      {app.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;