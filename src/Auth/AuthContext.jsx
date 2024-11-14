// import React, { createContext, useContext, useState } from 'react';
// import { toast } from 'react-toastify'; 
// import { useSigninMutation } from '../redux/Service/SignUpApi';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [userId, setUserId] = useState(null);  
//     const [signin] = useSigninMutation();  
   
//     const signIn = async (data) => {
//         try {
            
//             const result = await signin(data);
//             if (!result?.data) {
//                 const errorMessage = result.error?.data?.message || "Login failed. Please try again.";
//                 toast.error(errorMessage, { autoClose: 2000 });
//                 return false;
//             }

//             const { accessToken, refreshToken } = result.data;

//             if (!accessToken) {
//                 toast.error("No access token found in the response.", { autoClose: 2000 });
//                 return false;
//             }

        
//             localStorage.setItem('Token', accessToken);
//             localStorage.setItem('RefreshToken', refreshToken);

//             const userIdFromToken = extractUserIdFromToken(accessToken);

//             if (!userIdFromToken) {
//                 toast.error("UserId not found in the token.", { autoClose: 2000 });
//                 return false;
//             }

        
//             setUserId(userIdFromToken);
//             toast.success("Login successful!", { autoClose: 2000 });

//             return true;
//         } catch (error) {
//             console.error("Error during login: ", error);
//             toast.error(error.message || "An error occurred during login. Please try again.", { autoClose: 2000 });
//             return false;
//         }
//     };

//     const extractUserIdFromToken = (token) => {
//         if (typeof token !== 'string' || token.split('.').length !== 3) {
//           console.error("Invalid token format.");
//           return null;
//         }
      
//         try {
//           const payload = token.split('.')[1];
//           const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
//           const parsedPayload = JSON.parse(decodedPayload);
      
//           console.log("Decoded Payload:", parsedPayload); 
      
//           return parsedPayload.UserId || null;  // Make sure UserId is actually in the payload
//         } catch (error) {
//           console.error("Failed to decode token:", error);
//           return null;
//         }
//       };

//     return (
//         <AuthContext.Provider value={{ userId, signIn }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
