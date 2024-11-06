import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams(); // Destructured `id` from useParams
  const navigate = useNavigate();

  // Fetch student data when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3001/student/${id}`) // Assuming you have an endpoint to get student data by ID
      .then((res) => {
        setName(res.data.name); // Set initial name
        setEmail(res.data.email); // Set initial email
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
      });
  }, [id]); // Dependency array includes `id` to refetch if it changes

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:3001/update/${id}`, { name, email }) // Updated endpoint
      .then((res) => {
        console.log(res);
        navigate("/"); // Navigate back to the homepage or students list after updating
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
  }

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name} // Set the value to the name state
              placeholder="Enter name"
              className="form-control"
              onChange={(e) => setName(e.target.value)} // Update name state on change
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email} // Set the value to the email state
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStudent;
