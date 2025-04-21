import { useState } from "react";

export default function SimpleBrowse() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechGrowth Inc.",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio",
      location: "Remote",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      location: "New York, NY",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "Boston, MA",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>

      <input
        type="text"
        placeholder="Search job titles..."
        className="border p-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredJobs.map((job) => (
            <li key={job.id} className="border p-4 rounded">
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
