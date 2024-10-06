// components/Profile.tsx
import Image from 'next/image';

const Profile = ({ user }: { user: any }) => {
  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <Image src={user.profilePicture || '/default-profile.png'} alt={user.name} width={100} height={100} />
      <p>Bio: {user.bio}</p>
      {/* Other user info and editing capabilities */}
    </div>
  );
};

export default Profile;
