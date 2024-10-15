import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const { name, email, password } = data;

    if (currentState === 'Sign up') {
      const user = { name, email, password };
      localStorage.setItem(email, JSON.stringify(user));
      alert('Sign up successful! Navigating to login page...');
      setCurrentState('login');
      reset();
    } else {
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser && storedUser.password === password) {
        alert('Login successful! Navigating to dashboard...');
        navigate('/dashboard');
      } else {
        alert('Invalid email or password. Please try again.');
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
            {...register('name', { required: currentState === 'Sign up' })}
          />
        )}

        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <p className="text-red-500 mb-4">Email is required.</p>}

        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <p className="text-red-500 mb-4">Password is required.</p>}

        {currentState === 'Sign up' && (
          <>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all mb-4"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                validate: value => value === watch('password') || "Passwords don't match"
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 mb-4">{errors.confirmPassword.message}</p>}
          </>
        )}

        <div className="w-full flex justify-between text-sm mb-4">
          <p className="text-gray-600 cursor-pointer hover:text-blue-500 transition-all">Forgot Your Password?</p>
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all focus:outline-none"
        >
          {currentState === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
