// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useGetUserByIdQuery } from '../redux/Service/UserApi' 
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// const Profile = () => {
//   const navigate = useNavigate();

//   // Get the logged-in user's ID (this can be stored in state or fetched from localStorage)
//   const userId = localStorage.getItem('userId'); // Example for demo purposes, replace with actual auth state

//   // Use RTK Query to fetch user details by user ID
//   const { data: userDetails, error, isLoading } = useGetUserByIdQuery(userId);

//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     if (error) {
//       toast.error("Failed to load user details.");
//     }
//   }, [error]);

//   // Navigate to the edit profile page when the user wants to edit their profile
//   const handleEditProfile = () => {
//     setEditMode(true);
//     navigate(`/edit-profile/${userId}`);
//   };

//   // Handle logout by clearing user session and redirecting to the sign-in page
//   const handleLogout = () => {
//     localStorage.removeItem('userId'); // Clear user session
//     navigate('/SignIn'); // Redirect to Sign-In page
//   };

//   if (isLoading) {
//     return <p>Loading...</p>; // Loading state
//   }

//   return (
//     <div className="container mt-5">
//       <h2>{userDetails?.first_name}'s Profile</h2>
//       <div className="card profile-details mt-3">
//         <div className="card-body">
//           <h3 className="card-title">User Details</h3>
//           <p className="card-text"><strong>First Name:</strong> {userDetails?.first_name || 'N/A'}</p>
//           <p className="card-text"><strong>Last Name:</strong> {userDetails?.last_name || 'N/A'}</p>
//           <p className="card-text"><strong>Phone Number:</strong> {userDetails?.contact_number || 'N/A'}</p>
//           <p className="card-text"><strong>Email:</strong> {userDetails?.email || 'N/A'}</p>
         

//           {/* Edit Profile Button */}
//           <button
//             onClick={handleEditProfile}
//             className="btn mt-3"
//             style={{ color: 'white', backgroundColor: '#0066b8' }}
//           >
//             Edit Profile
//           </button>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="btn mt-3 ms-2"
//             style={{ color: 'white', backgroundColor: '#ff6f61' }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Profile;
