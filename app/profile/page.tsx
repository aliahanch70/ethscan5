'use client'; // Ensure this is here

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use the new Next.js 13 router hook for app directory
import { Divider, TextInput } from '@tremor/react'; // Importing Tremor components for styling consistency

const Profile = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [file, setFile] = useState(null);
  const router = useRouter(); // Make sure this is correctly used in a client component

  // Handle profile picture change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setProfilePicture(URL.createObjectURL(file)); // Temporary URL for preview
  };

  // Save profile data to server
  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (file) {
      formData.append("profilePicture", file);
    }

    // Send data to the API route
    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // Refresh the page to show updated data
      router.push("/"); // This should redirect to the homepage after saving
    }
  };

  return (
    <div className="sm:mx-auto sm:max-w-2xl">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Edit Profile
      </h3>
      <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        Update your profile details below.
      </p>
      <form onSubmit={handleSave} encType="multipart/form-data" className="mt-8">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="col-span-full sm:col-span-3">
            <label
              htmlFor="name"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Name
              
            </label>
            <TextInput
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="mt-2"
              
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="bio"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="mt-2 w-full h-24 border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="profile-picture"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              onChange={handleFileChange}
              className="mt-2"
            />
          </div>

          {profilePicture && (
            <div className="col-span-full mt-4">
              <div className="profile-picture-preview">
                <Image
                  src={profilePicture}
                  alt="Profile Picture Preview"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        <Divider />

        <div className="flex items-center justify-end space-x-4 mt-4">
          <button
            type="button"
            className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
