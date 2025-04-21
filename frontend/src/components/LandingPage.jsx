import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedJobsCarousel from "./FeaturedJobsCarousel";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LandingPage = () => {
  useGetAllJobs()
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background Design Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-blue-500/30 blur-xl"></div>
            <div className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-blue-500/30 blur-xl"></div>
            <div className="absolute top-40 right-40 w-72 h-72 rounded-full bg-blue-400/30 blur-xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center py-24 px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Find your dream job
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              We connect talented professionals with the best companies around the globe. Your next career move starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg">
                Find Jobs
              </Button>
              <Button variant="outline" className="py-6 px-8 text-lg">
                For Employers
              </Button>
            </div>
            
            <div className="text-gray-500 text-lg">
              Trusted by thousands of companies and millions of job seekers worldwide.
            </div>
          </div>
        </section>

        <section>
          <FeaturedJobsCarousel/>
        </section>
        
        {/* Stats or Featured Section */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
                <div className="text-gray-600">Jobs Posted Monthly</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5M+</div>
                <div className="text-gray-600">Active Job Seekers</div>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">2k+</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
            </div>
          </div>
        </section>
         */}
        {/* Feature Section */}
        {/* <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Get Hired</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
                <p className="text-gray-600">Our AI-powered platform matches your skills and preferences with the perfect job opportunities.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Time-Saving Tools</h3>
                <p className="text-gray-600">Apply to multiple jobs with one click and track all your applications in a single dashboard.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Employers</h3>
                <p className="text-gray-600">All companies on our platform are thoroughly vetted to ensure quality opportunities.</p>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* CTA Section */}
        
      </main>
      <Footer/>
      
     
    </div>
  );
};

export default LandingPage;

// App.jsx - Main entry point for your application
