
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../components/images/Logo.png";

const Login = () => {
  const initialState = {
    userEmail: '',
    userPassword: ''
  };

  const [formValues, setFormValues] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  };

  // Clear input fields
  const handleClear = () => { 
    setFormValues(initialState);
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }; 

  // Validate inputs
  const validateForm = () => {
    if (!formValues.userEmail) {
      setError('Email is required');
      return false;
    }

    const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegexPattern.test(formValues.userEmail)) {
      setError('Invalid email format');
      return false;
    }

    if (!formValues.userPassword) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  // // Handle Submit - Login
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!validateForm()) {
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:8080/api/login',
  //       formValues,
  //       { withCredentials: true } 
  //     );
      
  //     if (response.status === 200) {
        
  //       navigate('/main');
  //     } else {
  //       setError('Unexpected login failure. Please try again.');
  //     }
  //   } catch (error) {
  //     setError('Invalid Email or Password');
  //     console.error("Login failed:", error);

  //     setFormValues({ ...formValues, userPassword: '' });
  //   }
  // };

// Handle Submit - Login
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!validateForm()) {
    return;
  }

  try {
    // Perform login request with provided userEmail and userPassword
    const response = await axios.post('http://localhost:8080/api/login', {
      // userEmail: formValues.userEmail,
      // userPassword: formValues.userPassword,
      userEmail: 'chuck@gritsly.co.za',
      userPassword: 'xY?mhd^ZGFFcn)',
    }, { 
      withCredentials: true  // Ensure cookies are included in the request
    });

    if (response.status === 200) {
      console.log('Login successful:', response.data);

      // After successful login, you can redirect or handle further actions
      navigate('/main');
    } else {
      setError('Unexpected login failure. Please try again.');
    }
  } catch (error) {
    if (error.response) {
      // If there's a response from the server (e.g., invalid credentials)
      setError('Invalid Email or Password');
      console.error('Error logging in:', error.response.data);
    } else {
      // If no response or network error
      setError('Network Error: Please check your connection.');
      console.error('Login failed:', error);
    }

    // Clear the password field after an error
    setFormValues({ ...formValues, userPassword: '' });
  }
};


  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-400 via-gray-100 to-gray-400"></div>

      <div className="text-center z-10 relative">
        <img src={logo} alt="Company Logo" className="w-90 md:w-80 lg:w-96 mx-auto block mb-5 max-w-full ml-4" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">Gritsly Login</h2>

        {error && <p className="text-red-600">{error}</p>}

        <form className="p-6 rounded-lg shadow-lg bg-transparent" onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <label htmlFor="userEmail" className="block text-gray-700"></label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              placeholder="Email"
              className="mt-1 p-2 w-full border rounded bg-white"
              value={formValues.userEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-4">
            <label htmlFor="password" className="block text-gray-700"></label>
            <input
              type={showPassword ? "text" : "password"}
              id="userPassword"
              name="userPassword"
              placeholder="Password"
              className="mt-1 p-2 w-full border rounded bg-white"
              value={formValues.userPassword}
              onChange={handleInputChange}
            />
            <div className="form-checkbox flex items-center absolute py-2 left-8">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="show-password" className="ml-2 text-gray-700">Show Password</label>
            </div>
          </div>
          <div className="button-group mt-7">
            <button
              type="button"
              className="w-full h-10 px-6 m-2 border-solid border-2 border-gray-400 text-gray-700 transition-colors duration-250 bg-yellow-300 rounded-lg focus:shadow-outline hover:bg-green-200"
              onClick={handleClear}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full h-10 px-6 m-2 bg-blue-500 text-white rounded-lg focus:shadow-outline hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 