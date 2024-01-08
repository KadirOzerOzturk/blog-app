/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);

  async function login() {
    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        axios.get(`/roles/${username}`)
           .then((res)=>{
             
            const roleDataString =JSON.stringify(res.data);

            // Parse the JSON string to an array of objects
            const roleDataArray = JSON.parse(roleDataString);
            
            // Access the roleName property of the first object in the array
            const firstRoleName = roleDataArray[0].roleName;
        window.localStorage.setItem("role",firstRoleName)
            
            
           });
        window.localStorage.setItem("username",username)
        window.localStorage.setItem("isLoggedIn",true)
        window.location="/"
      } else if (response.status === 400) {
        console.log(response.status);
      }
    } catch (error) {
      console.error("Request error: ", error);
      setWarning(true);
    }
  }

  function handleLoginClick(e) {
    e.preventDefault();
    login();
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input 
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input 
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {warning ? <h1 className='text-red-700'>Password is not correct</h1> : <br />}
            <div>
              <button
                onClick={handleLoginClick}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
         

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              onClick={() => navigate('/signup')}
              className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
