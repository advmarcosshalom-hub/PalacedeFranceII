import React from 'react';

const CSVUploadModal = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            // Handle CSV upload logic here
        } else {
            alert('Please upload a valid CSV file.');
        }
    };

    return (
        <div>
            <h2>Upload CSV File</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
        </div>
    );
};

export default CSVUploadModal;