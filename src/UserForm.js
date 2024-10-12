// UserForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';  // Ensure this file exists or remove the import if not using custom CSS

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleImageChange = (e) => {
    setImages(e.target.files);
    console.log(e.target.files); // This logs selected files to the console for debugging
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    
    // Append images with 'images' key (needed for multer in the backend)
    Array.from(images).forEach((image) => {
      formData.append('images', image); // 'images' is the key expected in the backend
    });

    try {
      // Send the POST request to the backend API
      await axios.post('http://localhost:5000/api/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Submission successful!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input
          type="text"
          value={socialHandle}
          onChange={(e) => setSocialHandle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleImageChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
