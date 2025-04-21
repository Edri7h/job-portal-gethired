// import { Avatar } from "./ui/avatar"
// import { Badge } from "./ui/badge"
// import { Button } from "./ui/button"
// import { Bookmark } from "lucide-react"
// import miclogo from "../assets/miclogo.png"
// import { useNavigate } from "react-router-dom"

// const JobCards = ({job}) => {

//   const navigate=useNavigate();
//   // const jobId="wdjhwjed"
//   return (
//     <div className="p-4 bg-white rounded-2xl shadow-md flex flex-col gap-3 w-full max-w-sm relative">
//       {/* Bookmark Icon */}
//       <div className="absolute top-4 right-4 cursor-pointer">
//         <Bookmark className="text-gray-400 hover:text-black" size={20} />
//       </div>

//       {/* Meta */}
//       <p className="text-sm text-gray-400">{ Math.floor((new Date() - new Date(job.createdAt)) / (24 * 60 * 60 * 1000)) === 0 ? <>Recently osted</>:(
// <>
// Math.floor((new Date() - new Date(job.createdAt)) / (24 * 60 * 60 * 1000)) days ago
// </>
//       )
      


// } </p>

//       {/* Company Info */}
//       <div className="flex items-center gap-3">
//         <Avatar className="h-10 w-10">
//           <img src={job.company.logo} alt="Company Logo" />
//         </Avatar>
//         <div>
//           <p className="font-medium">{job.company.name}</p>
//           <p className="text-sm text-gray-400">{job.location}</p>
//         </div>
//       </div>

//       {/* Title */}
//       <h2 className="font-semibold text-lg">{job.title}</h2>

//       {/* Description */}
//       <p className="text-sm text-gray-500">
//         {
//           job?.description
//         }
//       </p>

//       {/* Badges */}
//       <div className="flex flex-wrap gap-2">
//         <Badge variant="outline" className="text-blue-600 border-blue-600  px-3 py-2">{job.position}</Badge>
//         <Badge variant="outline" className="text-red-500 border-red-500 px-3 py-2">{job?.jobType}</Badge>
//         <Badge variant="outline" className="text-purple-600 border-purple-600 px-3 py-2">{job.salary} lpa</Badge>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-2 mt-3">
//         <Button  variant="outline" onClick={()=>{navigate(`/description/${job._id}`)}}>Details</Button>
//         <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white">Save For Later</Button>
//       </div>
//     </div>
//   )
// }

// export default JobCards



import { Avatar } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Bookmark, MapPin, Calendar, ExternalLink } from "lucide-react"
import { useNavigate } from "react-router-dom"

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  
  // Calculate days since posted
  const getDaysAgo = () => {
    const daysDiff = Math.floor((new Date() - new Date(job.createdAt)) / (24 * 60 * 60 * 1000));
    
    if (daysDiff === 0) return "Recently Posted";
    if (daysDiff === 1) return "1 day ago";
    return `${daysDiff} days ago`;
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col w-full max-w-sm h-[420px] relative">
      {/* Top row with bookmark and date */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-purple-500" />
          <p className="text-sm font-medium text-gray-500">{getDaysAgo()}</p>
        </div>
        <button className="group" aria-label="Bookmark this job">
          <Bookmark className="text-gray-400 group-hover:text-purple-600 transition-colors" size={20} />
        </button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-4">
        <Avatar className="h-12 w-12 ring-2 ring-gray-100 shadow-sm">
          <img src={job.company.logo} alt={`${job.company.name} logo`} />
        </Avatar>
        <div>
          <p className="font-semibold text-gray-700">{job.company.name}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={14} className="text-gray-400" />
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="font-bold text-xl text-gray-900 mt-4">{job.title}</h2>

      {/* Description - Fixed height with overflow ellipsis */}
      <div className="mt-3 flex-grow overflow-hidden" style={{ minHeight: "80px" }}>
        <p className="text-sm text-gray-600 line-clamp-4">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        {job.position && (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 px-3 py-1 font-medium">
            {job.position}
          </Badge>
        )}
        {job.jobType && (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 px-3 py-1 font-medium">
            {job.jobType}
          </Badge>
        )}
        {job.salary && (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200 px-3 py-1 font-medium">
            {job.salary} lpa
          </Badge>
        )}
      </div>

      {/* Actions - Always at the bottom */}
      <div className="flex gap-3 mt-auto pt-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 border-gray-300 hover:bg-gray-50 font-medium flex items-center gap-2"
        >
          <ExternalLink size={16} />
          Details
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-medium shadow-sm"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default JobCards;