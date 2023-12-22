function Steps2() {
    return (


        <div className="w-auto  p-6 bg-slate-400 border border-gray-200 rounded-lg shadow  ">
            <p>Step 2: Specify Format</p>
            File Type
           
            <select id="fileType" className="bg-gray-50 border border-gray-300 mt-2">
                <option selected>CSV</option>
                <option value="JSON">JSON</option>
              
            </select>
            <p></p>
            Character Encoding
            
            <select id="fileType" className="bg-gray-50 border border-gray-300 mt-4">
                <option selected>UTF-8</option>
                <option value="JSON">ASCII</option>
              
            </select>
            <p></p>
            Delimiter

            
            <select id="fileType" className="bg-gray-50 border border-gray-300  mt-2">
                <option selected>CSV</option>
                <option value="JSON">JSON</option>
              
            </select>



        </div>

    )
}

export default Steps2;