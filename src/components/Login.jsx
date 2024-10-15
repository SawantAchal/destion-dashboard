import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters')
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});



const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const navigate = useNavigate();

  // Define the schema based on the current state
  const validationSchema = currentState === 'login' ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const { name, email, password } = data;

    if (currentState === 'Sign up') {
      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      toast.success('Sign up successful! Navigating to login page...');
      setCurrentState('login');
      reset();
    } else {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser && storedUser.password === password) {
        localStorage.setItem('authUser', email);
        toast.success('Login successful! Navigating to dashboard...');
        navigate('/');
      } else {
        toast.error('Failed to authenticate. Please try again.');
      }
    }
  };

  const handleStateChange = (newState) => {
    setCurrentState(newState);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-[90%] sm:max-w-lg mt-14 gap-6 m-auto text-gray-800"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center mb-6">
          <p className="text-3xl font-semibold text-gray-700">{currentState}</p>
          <hr className="border-t-2 w-10 mt-2" />
        </div>

        {currentState === 'Sign up' && (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
            placeholder="Name"
            {...register('name')}
          />
        )}
        {errors.name && <p className="text-red-500 mb-4">{errors.name.message}</p>}

        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}

        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && <p className="text-red-500 mb-4">{errors.password.message}</p>}

        {currentState === 'Sign up' && (
          <>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="text-red-500 mb-4">{errors.confirmPassword.message}</p>}
          </>
        )}

        <div className="w-full flex justify-between text-sm mb-4">
          <p className="text-gray-600 cursor-pointer hover:text-blue-500 transition-all">Forgot Password?</p>
          {currentState === 'login' ? (
            <p className="text-gray-600 cursor-pointer hover:text-blue-500 transition-all" onClick={() => handleStateChange('Sign up')}>
              Create Account
            </p>
          ) : (
            <p className="text-gray-600 cursor-pointer hover:text-blue-500 transition-all" onClick={() => handleStateChange('login')}>
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#023047] text-white py-2 rounded-lg hover:bg-[#5072A7] transition-all focus:outline-none"
        >
          {currentState === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;