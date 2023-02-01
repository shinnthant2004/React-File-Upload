import { useState } from "react";
import FormUpload from "./FileUpload";

function App() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (files) => {
    setImageFile(files[0]);
  };

  console.log(imageFile);

  return (
    <div className="App">
      <h2>File Upload</h2>
      <FormUpload handleImageChange={handleImageChange} />
    </div>
  );
}

export default App;
