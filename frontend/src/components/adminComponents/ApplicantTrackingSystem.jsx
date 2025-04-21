// import { useEffect, useState } from 'react';
// import { MoreVertical, FileText, Mail, Phone, Calendar, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
// import Navbar from '../Navbar';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';

// export default function ApplicantTrackingSystem() {
//     const [job, setJob] = useState([]);
//     const params = useParams();
//     useEffect(() => {
//         const fetchJob = async () => {
//             try {
//                 const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
//                     withCredentials: true
//                 })
//                 console.log(res.data.success)
//                 console.log(res.data.job)
//                 if(res.data.success)
//                 {
//                     setJob(res.data.job)
//                 }


//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchJob()

//     }, [params])









//     const [openActionId, setOpenActionId] = useState(null);

//     const handleAction = (id, action) => {
//         setApplicants(applicants.map(applicant =>
//             applicant.id === id ? { ...applicant, status: action } : applicant
//         ));
//         setOpenActionId(null);
//     };

//     const toggleActionMenu = (id) => {
//         setOpenActionId(openActionId === id ? null : id);
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">Applicants ({job?.applications?.length})</h1>
//                     <div className="relative">
//                         <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium flex items-center gap-1">
//                             Filter
//                             <ChevronDown size={16} />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                         <thead>
//                             <tr className="border-b border-gray-200">
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600 pl-2">Full Name</th>
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600">Email</th>
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600">Contact</th>
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600">Resume</th>
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600">Date</th>
//                                 <th className="py-3 text-left text-sm font-semibold text-gray-600">Status</th>
//                                 <th className="py-3 text-right text-sm font-semibold text-gray-600 pr-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {job.applications?.map((application) => (
//                                 <tr key={application._id} className="border-b border-gray-100 hover:bg-gray-50">
//                                     <td className="py-4 pl-2">
//                                         <div className="flex items-center">
//                                             <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
//                                                 {application.applicant.fullname.split(' ').map(n => n[0]).join('')}
//                                             </div>
//                                             <div className="ml-4">
//                                                 <div className="text-sm font-medium text-gray-900">{application.applicant.fullName}</div>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         <div className="flex items-center">
//                                             <Mail size={16} className="text-gray-400 mr-2" />
//                                             <span className="text-sm text-gray-600">{application.applicant.email}</span>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         <div className="flex items-center">
//                                             <Phone size={16} className="text-gray-400 mr-2" />
//                                             <span className="text-sm text-gray-600">{application.applicant.contact}</span>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         <div className="flex items-center">
//                                             <FileText size={16} className="text-blue-500 mr-2" />
//                                             <a href={application.applicant.profile.resume} className="text-sm text-blue-500 hover:underline">View Resume</a>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         <div className="flex items-center">
//                                             <Calendar size={16} className="text-gray-400 mr-2" />
//                                             <span className="text-sm text-gray-600">{new Date(application.createdAt).toLocaleDateString()}</span>
//                                         </div>
//                                     </td>
//                                     <td className="py-4">
//                                         {application.applicant.status === 'accepted' && (
//                                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                                 <CheckCircle size={14} className="mr-1" /> Accepted
//                                             </span>
//                                         )}
//                                         {application.applicant.status === 'rejected' && (
//                                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                                                 <XCircle size={14} className="mr-1" /> Rejected
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td className="py-4 text-right pr-2">
//                                         <div className="relative">
//                                             <button onClick={() => toggleActionMenu(application._id)} className="text-gray-500 hover:text-gray-700">
//                                                 <MoreVertical size={20} />
//                                             </button>
//                                             {openActionId === application.applicant.id && (
//                                                 <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//                                                     <div className="py-1" role="menu">
//                                                         <button
//                                                             onClick={() => handleAction(application._id, 'accepted')}
//                                                             className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                                         >
//                                                             <CheckCircle size={16} className="mr-2 text-green-500" />
//                                                             Accept
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleAction(applicant._id, 'rejected')}
//                                                             className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                                         >
//                                                             <XCircle size={16} className="mr-2 text-red-500" />
//                                                             Reject
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {applicants.length === 0 && (
//                     <div className="text-center py-8">
//                         <p className="text-gray-500">No applicants found</p>
//                     </div>
//                 )}

//                 <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
//                     <div>
//                         Showing {applicants.length} applicants
//                     </div>
//                     <div className="flex gap-2">
//                         <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">Previous</button>
//                         <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200">1</button>
//                         <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">Next</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



import { useEffect, useState } from 'react';
import { MoreVertical, FileText, Mail, Phone, Calendar, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';

export default function ApplicantTrackingSystem() {
    const [job, setJob] = useState({});
    const [openActionId, setOpenActionId] = useState(null);
    const params = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    setJob(res.data.job);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchJob();
    }, [params]);

    const handleAction = async (applicationId, status) => {
        try {
          // Update status via API
          const response = await axios.post(
            `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
            { status },
            { withCredentials: true }
          );
      
          // If successful, update UI and show message
          if (response.data.success) {
            toast.success(`application ${status}`);
            
            // Update application status in local state
            setJob(prevJob => ({
              ...prevJob,
              applications: prevJob.applications.map(app => 
                app._id === applicationId ? {...app, status} : app
              )
            }));
          }
          
          // Close menu
          setOpenActionId(null);
          
        } catch (error) {
          console.log(error);
        }
      };

    const toggleActionMenu = (id) => {
        setOpenActionId(openActionId === id ? null : id);
    };

    return (
        <>
            <Navbar />
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Applicants ({job?.applications?.length || 0})</h1>
                    <div className="relative">
                        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium flex items-center gap-1">
                            Filter
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 text-left text-sm font-semibold text-gray-600 pl-2">Full Name</th>
                                <th className="py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                                <th className="py-3 text-left text-sm font-semibold text-gray-600">Contact</th>
                                <th className="py-3 text-left text-sm font-semibold text-gray-600">Resume</th>
                                <th className="py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="py-3 text-right text-sm font-semibold text-gray-600 pr-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {job.applications?.map((application) => (
                                <tr key={application._id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 pl-2">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                                {application.applicant.fullname?.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{application.applicant.fullname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <Mail size={16} className="text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">{application.applicant.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <Phone size={16} className="text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">{application.applicant.phoneNumber}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <FileText size={16} className="text-blue-500 mr-2" />
                                            {
                                                application.applicant.profile.resume ? (
                                                    <>
                                                        <a
                                                            href={application.applicant.profile?.resume}
                                                            className="text-sm text-blue-500 hover:underline"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            View Resume
                                                        </a>
                                                    </>
                                                ):(<p className=''>N/A</p>)
                                           }
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <Calendar size={16} className="text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-600">
                                                {new Date(application.createdAt || Date.now()).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        {application.status === 'accepted' && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircle size={14} className="mr-1" /> Accepted
                                            </span>
                                        )}
                                        {application.status === 'rejected' && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <XCircle size={14} className="mr-1" /> Rejected
                                            </span>
                                        )}
                                        {application.status === 'pending' && (
                                            <span className="inline-flex items-center px-2.5 py-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 text-right pr-2">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleActionMenu(application._id)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                <MoreVertical size={20} />
                                            </button>
                                            {openActionId === application._id && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1" role="menu">
                                                        <button
                                                            onClick={() => handleAction(application._id, 'accepted')}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            <CheckCircle size={16} className="mr-2 text-green-500" />
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(application._id, 'rejected')}
                                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        >
                                                            <XCircle size={16} className="mr-2 text-red-500" />
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {job.applications?.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No applicants found</p>
                    </div>
                )}

                <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                    <div>
                        Showing {job.applications?.length || 0} applicants
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200">1</button>
                        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}