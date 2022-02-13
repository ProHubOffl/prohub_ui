import { API_URL } from "../../data/ApiUrl";
import axios from "axios";
import { headers } from "../../data/RequestHeader";

const createNewProject = (
  teamName,
  projectName,
  projectDescription,
  startDate,
  endDate,
  projectType,
  storyPoints,
  setTotalSprints
) => {
  return axios.post(
    API_URL + "project",
    {
      teamName,
      projectName,
      projectDescription,
      startDate,
      endDate,
      projectType,
      storyPoints,
      setTotalSprints,
    },
    {
      headers
    }
  );
};

export default {
  createNewProject,
};
