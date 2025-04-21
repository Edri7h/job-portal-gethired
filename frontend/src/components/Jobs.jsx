// import React, { useEffect, useState } from "react"
// import FilterCard from "./FilterCard"
// import JobCards from "./JobCards"
// import Navbar from "./Navbar"
// import { useSelector } from "react-redux"

// const Jobs = () => {
//   const { allJobs, selectedValue } = useSelector(state => state.job)  // Fetching from store
//   const [filterJobs, setFilterJobs] = useState(allJobs)

//   useEffect(() => {
//     setFilterJobs(
//       allJobs.filter((job) =>
//         job.title.toLowerCase().includes(selectedValue.toLowerCase()) ||
//         job.description.toLowerCase().includes(selectedValue.toLowerCase()) ||
//         job.location.toLowerCase().includes(selectedValue.toLowerCase())
//       )
//     )
//   }, [selectedValue, allJobs])

//   return (
//     <>
//       <Navbar />
//       <div className="flex gap-2 p-7">
//         <div className="w-72">
//           <FilterCard />
//         </div>
//         <div className="w-3/4 grid grid-cols-3 gap-4">
//           {filterJobs.map((job) => (
//             <JobCards key={job._id} job={job} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Jobs



import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import FilterCard from './FilterCard'
// import Job from './Job';
import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
import JobCards from './JobCards';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            
                                            <JobCards key={job._id} job={job} />
                                            
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs