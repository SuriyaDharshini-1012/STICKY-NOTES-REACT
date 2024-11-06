import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify'; 
import { useSigninMutation } from '../redux/Service/SignUpApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);  // userId will be stored in state
    const [signin] = useSigninMutation();  // Mutate API call to sign in

    // Sign-in function to authenticate and store the user information
    const signIn = async (data) => {
        try {
            // Perform the sign-in mutation
            const result = await signin(data);

            // If there's an error or no data, display an error toast
            if (!result?.data) {
                const errorMessage = result.error?.data?.message || "Login failed. Please try again.";
                toast.error(errorMessage, { autoClose: 2000 });
                return false;
            }

            const { accessToken, refreshToken } = result.data;

            // Check if accessToken exists in the response
            if (!accessToken) {
                toast.error("No access token found in the response.", { autoClose: 2000 });
                return false;
            }

            // Save tokens in localStorage
            localStorage.setItem('Token', accessToken);
            localStorage.setItem('RefreshToken', refreshToken);

            // Extract the userId from the token
            const userIdFromToken = extractUserIdFromToken(accessToken);

            if (!userIdFromToken) {
                toast.error("UserId not found in the token.", { autoClose: 2000 });
                return false;
            }

            // Set the userId state and show a success message
            setUserId(userIdFromToken);
            toast.success("Login successful!", { autoClose: 2000 });

            return true;
        } catch (error) {
            console.error("Error during login: ", error);
            toast.error(error.message || "An error occurred during login. Please try again.", { autoClose: 2000 });
            return false;
        }
    };

    // Function to extract userId from the decoded JWT token
    const extractUserIdFromToken = (token) => {
        if (typeof token !== 'string' || token.split('.').length !== 3) {
          console.error("Invalid token format.");
          return null;
        }
      
        try {
          const payload = token.split('.')[1];
          const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
          const parsedPayload = JSON.parse(decodedPayload);
      
          console.log("Decoded Payload:", parsedPayload); // Debugging the token payload
      
          return parsedPayload.UserId || null;  // Make sure UserId is actually in the payload
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      };

    return (
        <AuthContext.Provider value={{ userId, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
