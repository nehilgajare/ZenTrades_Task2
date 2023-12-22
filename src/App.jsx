import React, { useState } from 'react';
import './App.css'; // Import Tailwind CSS styles

function App() {
  const [products, setProducts] = useState([]);
  const [displayFields, setDisplayFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result);

          // Check if products property exists in the JSON data
          if (jsonData && jsonData.products) {
            const productsData = Object.values(jsonData.products);

            // Check if productsData is an array and has at least one element
            if (Array.isArray(productsData) && productsData.length > 0) {
              const fileFields = Object.keys(productsData[0]);
              setProducts(productsData);
              setAvailableFields(fileFields);
              setDisplayFields(fileFields); // Optionally, set display fields initially
            } else {
              console.error('Invalid JSON file format: "products" should be an array with at least one element.');
            }
          } else {
            console.error('Invalid JSON file format: "products" property not found.');
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error.message);
        }
      };
      reader.readAsText(selectedFile);
      setFile(selectedFile);
    }
  };




  const handleDisplayChange = (selectedFields, action) => {
    if (action === 'add') {
      const newDisplayFields = Array.from(
        new Set([...displayFields, ...selectedFields])
      );
      setDisplayFields(newDisplayFields);
      setAvailableFields(
        availableFields.filter((field) => !newDisplayFields.includes(field))
      );
    } else if (action === 'remove') {
      const newDisplayFields = displayFields.filter(
        (field) => !selectedFields.includes(field)
      );
      setDisplayFields(newDisplayFields);
      setAvailableFields(
        Array.from(new Set([...availableFields, ...selectedFields])) 
      );
    }
  };







  const renderTableHeaders = () => {
    return displayFields.map((field) => <th key={field}>{field}</th>);
  };

  const renderTableRows = () => {
    return products
      .sort((a, b) => b.popularity - a.popularity)
      .map((product, index) => (
        <tr key={index}>
          {displayFields.map((field) => (
            <td key={field}>{product[field]}</td>
          ))}
        </tr>
      ));
  };


  return (
    <div className="container mx-auto my-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Product Data</h1>
      </div>

      <div className="mb-4">
        Step 1:-
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="mb-2"
        />
      </div>
      <div className='mb-4 mt-4'>
        <p>Step 2:- Specify Format</p> 
        <div className='mt-2'>
        <p className='mt-2'>File Format</p>
        <select>
          <option>JSON</option>
          <option>CSV</option>
        </select>
        </div>
        <p className='mt-2'>Character Encoding</p>
        <select>
          <option>UTF-8</option>
          <option>ASCII</option>
        </select>
      </div>


      {file && (
        <div className="flex mb-4">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Available Fields</h2>
            <select
              multiple
              className="w-full h-40 p-2 border"
              value={availableFields}
              onChange={(e) =>
                setAvailableFields(
                  Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  )
                )
              }
            >
              {Object.keys(products[0] || {}).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center">
            <button
              className="mb-2 px-4 py-2 bg-blue-500 text-white"
              onClick={() => handleDisplayChange(availableFields, 'add')}
            >
              {'>>'}
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={() => handleDisplayChange(displayFields, 'remove')}
            >
              {'<<'}
            </button>
          </div>

          <div className="w-1/2">
            <h2 className="text-lg font-semibold mb-2">Fields to Display</h2>
            <select
              multiple
              className="w-full h-40 p-2 border"
              value={displayFields}
              onChange={(e) =>
                setDisplayFields(
                  Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  )
                )
              }
            >
              {displayFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>  
      )}
    </div>
  );
}

export default App;
