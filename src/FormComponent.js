import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [data, setData] = useState([]);
  const [fileB64, setFileB64] = useState('');
  const [file, setFile] = useState(null);

  const handleDataChange = (e) => {
    const value = e.target.value;
    setData(value.split(',')); // Split input by commas for an array
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileB64(reader.result.split(',')[1]); // Get base64 string without the metadata
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/bfhl', {
        data,
        file_b64: fileB64,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter data (comma-separated):
        <input type="text" onChange={handleDataChange} />
      </label>
      <br />
      <label>
        Upload File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
