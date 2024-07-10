'use client'

import axios from 'axios';
import { useToken, verifyToken } from '/src/lib/auth';
import { redirect } from 'next/navigation'
import { store } from '/src/redux/store';
import { useAppDispatch, useAppSelector } from "/src/redux/hooks";
import { set as setUser, remove as removeUser, populateSession } from '/src/redux/Features/Auth/currentUserSlice';
import { set as setAuth, remove as removeAuth } from '/src/redux/Features/Auth/authSlice';


const useLoggedStatus = async () => {

  var response = null;
  const decodedToken  =  await useToken(true);

  if(!decodedToken){
    response = false;
    // TODO: Validate real user object instead
    if(decodedToken?.name === 'TokenExpiredError'){
      response = false;
    }

  }
  return response;
}

// Redirect after successful login
const loginCallback = () => {
  console.log("CALLBACK: sign in <action>");
  store.dispatch( populateSession() );
  // redirect('/courses');
  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}courses`;
}

// Redirect after successful login
const logoutCallback = () => {
  console.log("CALLBACK: sign out <action>")
  // Do not redirect home or login, could cause loop
  //redirect('/goodbye');
}

const handleLogin = async (e: React.FormEvent) => {

  e.preventDefault();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const endpoint = `${baseUrl}auth`;
  const target = e.target as typeof e.target & {
      email: { value: string },
      password: { value: string },
  };
  const email     = target.email.value;
  const password  = target.password.value;

  await axios.post(endpoint, { email, password })
              .then( (response) => {
                if(response.status === 200){
                  const token = response.data.jwt;
                  store.dispatch(setAuth(token));

                  const userObject = verifyToken(response.data.jwt);
                  console.log(userObject.user);
                  if(userObject?.user)
                    store.dispatch(setUser(userObject.user));

                  loginCallback();
                }

              }, (error) => {
                console.log('Login failed from the start', error);
              });


}

// What happens when token is no longer valid
const faultyTokenCallback = () => {

  console.log(" :: This is perceived as a faulty token ::");

  // Dispatch events to the Redux store
  // TODO: Only dispatch these events if the store contains information and is not null
  // store.dispatch(removeUser());
  // store.dispatch(removeAuth());

  logoutCallback();
}



export { handleLogin, useLoggedStatus, faultyTokenCallback };
