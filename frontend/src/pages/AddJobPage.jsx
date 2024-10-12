import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { toast } from "react-toastify";
const AddJobPage = ({ addJobSubmit }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [salaryRange, setSalaryRange] = useState("Not Specified");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await fetch("http://localhost:3000/companies");
      const data = await res.json();
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const addJob = (event) => {
    event.preventDefault();
    const newJob = {
      title,
      type,
      description,
      salaryRange,
      location,
      country,
      company_id,
    };

    addJobSubmit(newJob);
    toast.success("Job Successfully Added!");
    return navigate("/jobs");
  };
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={addJob}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="company_id"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Company Name
                </label>
                <select
                  id="company_id"
                  name="company_id"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={company_id}
                  onChange={(event) => setCompany_id(event.target.value)}
                >
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <Card>
                  <p className="mt-1 mb-1">
                    Company not in list? Click to add company
                  </p>
                  <Link
                    to="/add-company"
                    className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                  >
                    New Company
                  </Link>
                </Card>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Junior Backend Engineer"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="Add any job duties, expectations, requirements, etc"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Salary
                </label>
                <select
                  id="salaryRange"
                  name="salaryRange"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={salaryRange}
                  onChange={(event) => setSalaryRange(event.target.value)}
                >
                  <option value="Not Specified">Not Specified</option>
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - 60K">$50K - $60K</option>
                  <option value="$60K - 70K">$60K - $70K</option>
                  <option value="$70K - 80K">$70K - $80K</option>
                  <option value="$80K - 90K">$80K - $90K</option>
                  <option value="$90K - 100K">$90K - $100K</option>
                  <option value="$100K - 125K">$100K - $125K</option>
                  <option value="$125K - 150K">$125K - $150K</option>
                  <option value="$150K - 175K">$150K - $175K</option>
                  <option value="$175K - 200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Location"
                  required
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Country"
                  required
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
