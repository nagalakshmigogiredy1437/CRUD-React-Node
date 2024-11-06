import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [student, setStudent] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []); // Added empty dependency array to run effect once

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/post" className="btn btn-success">
          ADD +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((dta, i) => (
              <tr key={i}>
                <td>{dta.name}</td>
                <td>{dta.email}</td>
                <td>
                  <Link to={`/update/${dta.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) => handleDelete(dta.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
