import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import EmptyState from "./EmptyState";

const JobListings = () => {
  let featuredJobs= useSelector(state=>state.job.allJobs)
  // console.log(featuredJobs)
  // featuredJobs=[]
  

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Background decoration - improved blur spots positioning */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-blue-400/20 blur-xl z-0"></div>
      <div className="absolute top-40 left-1/4 w-32 h-32 rounded-full bg-purple-400/15 blur-xl z-0"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-blue-500/20 blur-xl z-0"></div>
      
      {/* Right side blur spots - adjusted for better balance */}
      <div className="absolute top-10 right-0 w-52 h-52 rounded-full bg-blue-400/15 blur-xl z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-36 h-36 rounded-full bg-purple-400/20 blur-xl z-0"></div>
      <div className="absolute center-0 right-10 w-24 h-24 rounded-full bg-blue-500/25 blur-xl z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12">
          <span className="text-purple-700">Latest & Top</span>
          <span className="text-black"> Job Openings</span>
        </h2>
        
       {
        featuredJobs.length>0?(
          <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            { featuredJobs.map((job) => (
              <CarouselItem key={job._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{job.company.name}</h3>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  
                  <h4 className="text-xl font-bold mb-3">{job.title}</h4>
                  
                  <p className="text-gray-600 text-sm mb-6 flex-grow">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-indigo-800 font-medium text-sm">
                      {job.position} Positions
                    </span>
                    <span className="text-red-800 font-medium text-sm">
                      {job.type}
                    </span>
                   
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 z-20 px-2">
            <CarouselPrevious className="h-10 w-10 bg-white shadow-lg border-0" />
            <CarouselNext className="h-10 w-10 bg-white shadow-lg border-0" />
          </div>
        </Carousel>
        ):(
          <EmptyState/>
        )
       }
      </div>
    </section>
  );
};

export default JobListings;