

// import { useDispatch, useSelector } from 'react-redux';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
// import { setSingleJob } from '@/redux/jobSlice';
// import { toast } from 'sonner';

// const JobDescription = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const params = useParams();
//   const jobId = params.id;
//   const thisJob = useSelector(state => state.job.singleJob) || {};
//   const { user } = useSelector(store => store.auth);
  
//   const [isApplied, setIsApplied] = useState(false);

//   useEffect(() => {
//     if (!jobId) {
//       setLoading(false);
//       return;
//     }

//     const getSelectedJob = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));

//         }
//       } catch (error) {
//         console.log('Error while fetching job:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getSelectedJob();
//   }, [jobId,isApplied]);

//   const jobHandler = async () => {
//     try {
//       const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });

//       if (res.data.success) {
       
//         toast.success(res.data.message);
//         setIsApplied(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (thisJob && thisJob.applications) {
//       const alreadyApplied = thisJob.applications.some(
//         (application) => application.applicant === user._id
//       );
//       setIsApplied(alreadyApplied);
//     }
//   }, [thisJob, user]);

//   // Handle loading state or error state in JSX
//   return (
//     <div className="max-w-5xl mx-auto my-12 px-6">
//       {loading ? (
//         <div>Loading job details...</div>
//       ) : !thisJob || Object.keys(thisJob).length === 0 ? (
//         <h2 className="text-xl font-semibold text-red-600">
//           Could not load job details. Please try again later.
//         </h2>
//       ) : (
//         <>
//           {/* Title and Apply Button */}
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{thisJob?.title || 'No Title'}</h1>
//               <div className="flex flex-wrap items-center gap-3">
//                 <Badge className="text-blue-700 font-semibold" variant="ghost">
//                   {thisJob?.applications?.length || 0} Applicants
//                 </Badge>
//                 {thisJob?.location && (
//                   <Badge className="text-[#F83002] font-semibold" variant="ghost">
//                     {thisJob.location}
//                   </Badge>
//                 )}
//                 {thisJob?.salary && (
//                   <Badge className="text-[#7209b7] font-semibold" variant="ghost">
//                     {thisJob.salary} LPA
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <Button
//               onClick={jobHandler}
//               disabled={isApplied}
//               className={`rounded-lg px-6 py-3 text-base font-semibold transition-colors duration-200 ${
//                 isApplied
//                   ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
//                   : 'bg-[#7209b7] hover:bg-[#5c0b91] text-white'
//               }`}
//             >
//               {isApplied ? 'Already Applied' : 'Apply Now'}
//             </Button>
//           </div>

//           {/* Job Details */}
//           <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5 text-[17px] text-gray-800">
//             <div>
//               <span className="font-bold">Role:</span> {thisJob?.title || 'N/A'}
//             </div>
//             <div>
//               <span className="font-bold">Location:</span> {thisJob?.location || 'N/A'}
//             </div>
//             <div>
//               <span className="font-bold">Description:</span> {thisJob?.description || 'No description available'}
//             </div>
//             <div>
//               <span className="font-bold">Experience:</span> {thisJob?.experienceLevel || 'N/A'}
//             </div>
//             <div>
//               <span className="font-bold">Salary:</span> {thisJob?.salary ? `${thisJob.salary} LPA` : 'N/A'}
//             </div>
//             <div>
//               <span className="font-bold">Total Applicants:</span> 
//               {thisJob?.applications?.length || 'N/A'}
//             </div>
//             <div>
//               <span className="font-bold">Posted Date:</span> 
//               {thisJob?.createdAt ? new Date(thisJob.createdAt).toLocaleDateString() : 'N/A'}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default JobDescription;



// import { useDispatch, useSelector } from 'react-redux';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
// import { setSingleJob } from '@/redux/jobSlice';
// import { toast } from 'sonner';
// import { 
//   Building, 
//   MapPin, 
//   Clock, 
//   Briefcase, 
//   DollarSign, 
//   Users, 
//   Calendar, 
//   FileText
// } from 'lucide-react';

// const JobDescription = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const params = useParams();
//   const jobId = params.id;
//   const thisJob = useSelector(state => state.job.singleJob) || {};
//   const { user } = useSelector(store => store.auth);
  
//   const [isApplied, setIsApplied] = useState(false);

//   useEffect(() => {
//     if (!jobId) {
//       setLoading(false);
//       return;
//     }

//     const getSelectedJob = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//         }
//       } catch (error) {
//         console.log('Error while fetching job:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getSelectedJob();
//   }, [jobId, isApplied, dispatch]);

//   const jobHandler = async () => {
//     try {
//       const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });

//       if (res.data.success) {
//         toast.success(res.data.message);
//         setIsApplied(true);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to apply for this job");
//     }
//   };

//   useEffect(() => {
//     if (thisJob && thisJob.applications) {
//       const alreadyApplied = thisJob.applications.some(
//         (application) => application.applicant === user._id
//       );
//       setIsApplied(alreadyApplied);
//     }
//   }, [thisJob, user]);

//   // Format date nicely
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   // Handle loading state or error state in JSX
//   return (
//     <div className="max-w-5xl mx-auto my-12 px-6">
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-pulse flex flex-col items-center">
//             <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
//             <div className="h-6 bg-gray-200 rounded w-32"></div>
//           </div>
//         </div>
//       ) : !thisJob || Object.keys(thisJob).length === 0 ? (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <h2 className="text-xl font-semibold text-red-600">
//             Could not load job details. Please try again later.
//           </h2>
//         </div>
//       ) : (
//         <>
//           {/* Company & Job Header */}
//           <div className="mb-8 flex items-center">
//             {thisJob.company && thisJob.company.logo && (
//               <div className="mr-4 h-16 w-16 rounded-lg bg-white shadow-sm p-2 border border-gray-100">
//                 <img 
//                   src={thisJob.company.logo} 
//                   alt={`${thisJob.company?.name || 'Company'} logo`}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             )}
            
//             <div>
//               {thisJob.company && thisJob.company.name && (
//                 <p className="text-lg font-medium text-gray-600 flex items-center mb-1">
//                   <Building size={18} className="mr-2 text-gray-500" />
//                   {thisJob.company.name}
//                 </p>
//               )}
//               <p className="text-sm font-medium text-gray-500 flex items-center">
//                 <Clock size={16} className="mr-2 text-gray-400" />
//                 Posted {formatDate(thisJob.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Title and Apply Button */}
//           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
//                 {thisJob?.title || 'No Title'}
//               </h1>
//               <div className="flex flex-wrap items-center gap-3">
//                 <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 border-blue-200">
//                   <Users size={14} className="mr-1" />
//                   {thisJob?.applications?.length || 0} Applicants
//                 </Badge>
//                 {thisJob?.location && (
//                   <Badge className="bg-red-100 text-red-600 font-medium px-3 py-1 border-red-200">
//                     <MapPin size={14} className="mr-1" />
//                     {thisJob.location}
//                   </Badge>
//                 )}
//                 {thisJob?.salary && (
//                   <Badge className="bg-purple-100 text-purple-600 font-medium px-3 py-1 border-purple-200">
//                     <DollarSign size={14} className="mr-1" />
//                     {thisJob.salary} LPA
//                   </Badge>
//                 )}
//               </div>
//             </div>

//             <Button
//               onClick={jobHandler}
//               disabled={isApplied}
//               className={`rounded-lg px-6 py-3 text-base font-semibold transition-colors duration-200 ${
//                 isApplied
//                   ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md'
//               }`}
//             >
//               {isApplied ? 'Already Applied' : 'Apply Now'}
//             </Button>
//           </div>

//           {/* Job Details Card */}
//           <div className="mt-6 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//               <FileText size={24} className="mr-3 text-purple-600" />
//               Job Details
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
//               <div className="flex items-start">
//                 <Briefcase size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Role</p>
//                   <p className="text-gray-600">{thisJob?.title || 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <MapPin size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Location</p>
//                   <p className="text-gray-600">{thisJob?.location || 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <Users size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Experience Required</p>
//                   <p className="text-gray-600">{thisJob?.experienceLevel || 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <DollarSign size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Salary</p>
//                   <p className="text-gray-600">{thisJob?.salary ? `${thisJob.salary} LPA` : 'N/A'}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <Users size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Total Applicants</p>
//                   <p className="text-gray-600">{thisJob?.applications?.length || 0}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <Calendar size={20} className="mr-3 mt-1 text-gray-500" />
//                 <div>
//                   <p className="font-semibold text-gray-700">Posted Date</p>
//                   <p className="text-gray-600">{formatDate(thisJob.createdAt)}</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Job Description */}
//             <div className="mt-8 border-t border-gray-200 pt-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
//               <div className="prose max-w-none text-gray-600 whitespace-pre-line">
//                 {thisJob?.description || 'No description available'}
//               </div>
//             </div>
            
//             {/* Apply Button (Bottom) */}
//             <div className="mt-8 border-t border-gray-200 pt-6">
//               <Button
//                 onClick={jobHandler}
//                 disabled={isApplied}
//                 className={`rounded-lg w-full md:w-auto px-8 py-3 text-base font-semibold transition-colors duration-200 ${
//                   isApplied
//                     ? 'bg-gray-500 text-gray-200 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md'
//                 }`}
//               >
//                 {isApplied ? 'Already Applied' : 'Apply Now'}
//               </Button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default JobDescription;



import { useDispatch, useSelector } from 'react-redux';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { 
  Building, 
  MapPin, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Users, 
  Calendar, 
  CheckCircle
} from 'lucide-react';

const JobDescription = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const jobId = params.id;
  const thisJob = useSelector(state => state.job.singleJob) || {};
  const { user } = useSelector(store => store.auth);
  
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    const getSelectedJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log('Error while fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    getSelectedJob();
  }, [jobId, isApplied, dispatch]);

  const jobHandler = async () => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to apply for this job");
    }
  };

  useEffect(() => {
    if (thisJob && thisJob.applications) {
      const alreadyApplied = thisJob.applications.some(
        (application) => application.applicant === user._id
      );
      setIsApplied(alreadyApplied);
    }
  }, [thisJob, user]);

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Apply button component for reuse
  const ApplyButton = ({ className = "" }) => (
    <Button
      onClick={jobHandler}
      disabled={isApplied}
      className={`rounded-lg px-6 py-3 text-base font-semibold transition-all duration-300 ${
        isApplied
          ? 'bg-gray-100 text-gray-500 border border-gray-300 flex items-center gap-2'
          : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-md hover:shadow-lg'
      } ${className}`}
    >
      {isApplied ? (
        <>
          <CheckCircle size={18} /> 
          Already Applied
        </>
      ) : (
        'Apply Now'
      )}
    </Button>
  );

  // Handle loading state or error state in JSX
  return (
    <div className="max-w-5xl mx-auto my-12 px-4 sm:px-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 bg-gray-200 rounded-lg w-64"></div>
            <div className="h-8 bg-gray-200 rounded-lg w-48"></div>
            <div className="h-32 bg-gray-200 rounded-lg w-full max-w-md"></div>
          </div>
        </div>
      ) : !thisJob || Object.keys(thisJob).length === 0 ? (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Could not load job details. Please try again later.
          </h2>
        </div>
      ) : (
        <>
          {/* Header with sticky apply button */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="p-6 sm:p-8">
              {/* Company Info */}
              <div className="flex items-center mb-6">
                {thisJob.company && thisJob.company.logo && (
                  <div className="mr-4 h-16 w-16 rounded-lg bg-white shadow-sm p-2 border border-gray-100 flex items-center justify-center">
                    <img 
                      src={thisJob.company.logo} 
                      alt={`${thisJob.company?.name || 'Company'} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                
                <div>
                  {thisJob.company && thisJob.company.name && (
                    <p className="text-lg font-semibold text-gray-800">
                      {thisJob.company.name}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Clock size={14} className="mr-1 text-gray-400" />
                    Posted {formatDate(thisJob.createdAt)}
                  </p>
                </div>
              </div>

              {/* Title and First Apply Button */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    {thisJob?.title || 'No Title'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-0 text-bold font-medium px-5 py-3">
                      <Users size={14} className="mr-1" />
                      {thisJob?.applications?.length || 0} Applicants
                    </Badge>
                    {thisJob?.location && (
                      <Badge className="bg-red-50 hover:bg-red-100 text-red-600 border-0 text-bold font-medium px-5 py-3">
                        <MapPin size={14} className="mr-1" />
                        {thisJob.location}
                      </Badge>
                    )}
                    {thisJob?.salary && (
                      <Badge className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-0 font-medium text-bold px-5 py-3">
                        <DollarSign size={14} className="mr-1" />
                        {thisJob.salary} LPA
                      </Badge>
                    )}
                    {thisJob?.experienceLevel && (
                      <Badge className="bg-green-50 hover:bg-green-100 text-green-700 border-0 font-medium text-bold px-5 py-3">
                        <Briefcase size={14} className="mr-1" />
                        {thisJob.experienceLevel}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* First Apply Button */}
                {/* <div className="mt-4 lg:mt-0">
                  <ApplyButton />
                </div> */}
              </div>
            </div>
          </div>

          {/* Job Details Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Job Highlight Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 border-b border-gray-200">
              <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 mb-1">Role</p>
                <p className="font-semibold text-gray-800">{thisJob?.title || 'N/A'}</p>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-semibold text-gray-800">{thisJob?.location || 'N/A'}</p>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 mb-1">Experience</p>
                <p className="font-semibold text-gray-800">{`${thisJob?.experienceLevel} year`   || 'N/A'}</p>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm text-gray-500 mb-1">Salary</p>
                <p className="font-semibold text-gray-800">{thisJob?.salary ? `${thisJob.salary} LPA` : 'N/A'}</p>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-600 whitespace-pre-line mb-8">
                {thisJob?.description || 'No description available'}
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Users className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Total Applicants</h3>
                      <p className="text-gray-600">{thisJob?.applications?.length || 0} candidate(s) have applied</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-green-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-800">Posted Date</h3>
                      <p className="text-gray-600">{formatDate(thisJob.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Second Apply Button */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Ready to Apply?</h3>
                    <p className="text-gray-600 text-sm">Submit your application now</p>
                  </div>
                  <ApplyButton className="sm:w-auto w-full" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDescription;