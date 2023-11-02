'use client'

import axios from 'axios';
import { fetchToken } from 'src/lib/auth';
import { set, remove } from 'src/redux/Features/Auth/authSlice';
import { store } from 'src/redux/store';


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
                  const dispatched = store.dispatch(set(token));

                  // window.localStorage.setItem('seshToken', token);
                  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}courses`;
                }

              }, (error) => {
                console.log('Login failed from the getgo', error);
              });


}

const isLoggedIn = () => {
  const token =  fetchToken();
  return token ? token : false;
}

export { handleLogin, isLoggedIn };
