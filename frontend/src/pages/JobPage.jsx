import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error(`fetchJob Error: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);
  return loading ? <Spinner /> : <h1>{job._id}</h1>;
};

export default JobPage;
