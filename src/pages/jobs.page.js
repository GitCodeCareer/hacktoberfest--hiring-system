import React, { useState, useEffect } from "react";
import { Container, ListGroup, Input } from "reactstrap";
import Navbar from "../components/navbar.component";

import JobCard from "../components/Job/Job.component";

import { listOfJob } from "../data/jobs";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  const filterWithPropery = (properyName, value) => {
    let filteredJobs = jobs.filter((item) => {
      return item[properyName].toLowerCase().includes(value.toLowerCase());
    });
    setJobs(filteredJobs);
  };

  const handleChange = (e) => {
    if (e.target.value.length >= 3) {
      filterWithPropery(e.target.name, e.target.value);
    } else {
      // This will be a problem later where jobs are lost and then needed later
      // huge network hit
      setJobs(listOfJob);
    }
  };

  useEffect(() => {
    setJobs(listOfJob);
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-4 mb-4">
        <h1>List of available jobs</h1>
        <div className="d-flex justify-content-end mt-3">
          <div className="w-25 mr-2">
            <Input
              name="jobCreator"
              onChange={handleChange}
              placeholder="Search with company name"
            />
          </div>
          <div className="w-25">
            <Input
              name="jobLocation"
              onChange={handleChange}
              placeholder="Search with location"
            />
          </div>
        </div>

        {jobs.length === 0 && (
          <h3 className="text-center mt-5">No result found</h3>
        )}

        <ListGroup className="mt-3">
          {jobs.map((job) => (
            <JobCard key={job.userId} job={job} />
          ))}
        </ListGroup>
      </Container>
    </>
  );
};

export default HomePage;
