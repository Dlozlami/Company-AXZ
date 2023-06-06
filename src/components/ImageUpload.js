import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
