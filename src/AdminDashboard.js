import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      {submissions.map((submission, index) => (
        <div key={index} className="submission">
          <h3>{submission.name}</h3>
          <p>{submission.socialHandle}</p>
          <div className="images">
            {submission.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`User submission ${idx}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default AdminDashboard;
