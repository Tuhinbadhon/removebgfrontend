import { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/removebg", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result.data);
      // const blob = new Blob([response.data], { type: "image/jpeg" });
      // const url = URL.createObjectURL(blob);
      setEnhancedImage(result.data);
    } catch (error) {
      console.error("Error enhancing image:", error);
    }
  };

  return (
    <div className="App">
      <h1>Remove Background App</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Remove Background</button>

      {enhancedImage && (
        <div>
          <h2>Output Image:</h2>
          <img
            src={`http://localhost:5000/${enhancedImage}`}
            alt="Enhanced"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;

// import React, { useState } from "react";

// const RemoveBgApp = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [outputPath, setOutputPath] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("image", selectedFile);

//       const response = await fetch("http://localhost:5000/removebg", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       setOutputPath(data.output_path);

//       // Fetch the generated image
//       const generatedImageResponse = await fetch(
//         `http://localhost:5000/${data.output_path}`
//       );
//       const generatedImageBlob = await generatedImageResponse.blob();
//       const generatedImageUrl = URL.createObjectURL(generatedImageBlob);

//       // Update the UI with the generated image
//       // (You can display the image in an <img> tag or use it as a background)
//       console.log("Generated Image URL:", generatedImageUrl);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Remove Background App</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Remove Background</button>

//       {outputPath && (
//         <div>
//           <h2>Output Image:</h2>
//           <img src={`http://localhost:5000/${outputPath}`} alt="Output" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RemoveBgApp;
