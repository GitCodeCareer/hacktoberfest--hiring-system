import React, { useState } from "react";

import PropTypes from "prop-types";

import moment from "moment";

import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faEllipsisV,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-regular-svg-icons";

import "../Job/job.styles.css";

const Job = ({ job }) => {
  const {
    userId,
    jobTitle,
    jobCreatorLogo,
    jobLocation,
    // jobApplyURL,
    jobCreator,
    dateModified,
    jobDescription,
    jobWorkType,
  } = job;

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <ListGroupItem className="job-card" key={userId}>
      <div className="d-flex flex-column">
        <div className="job-card--header mb-3">
          {jobCreatorLogo ? (
            <img className="job-image" src={jobCreatorLogo} alt={jobCreator} />
          ) : (
            <h3 className="company mr-4">{jobCreator}</h3>
          )}

          <span className="text-tiny job-time">
            {moment(dateModified).fromNow()}
          </span>

          <Dropdown
            className="drop-down-icon"
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle>
              <FontAwesomeIcon icon={faEllipsisV} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <FontAwesomeIcon icon={faHeart} className="mr-1" /> Save Job
              </DropdownItem>
              <DropdownItem>
                <FontAwesomeIcon icon={faBan} className="mr-2" />
                Not Interested
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="mr-auto">
          <h4 className="job-card--title text-dark">{jobTitle}</h4>
          <h6 className="text-muted">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="ml-2">{jobLocation}</span>
          </h6>

          <p>
            {jobDescription.replace(/(<([^>]+)>)/gi, "").substring(0, 100)} ...
          </p>

          <Badge className="p-2 mt-1 mr-2" color="primary">
            {jobWorkType}
          </Badge>
        </div>
      </div>
    </ListGroupItem>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default Job;
