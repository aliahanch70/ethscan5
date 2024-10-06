"use client";

import { useState } from "react";

const Profile = () => {
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!image || !username) {
      alert("Please select an image and enter your username.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed.");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Profile;
