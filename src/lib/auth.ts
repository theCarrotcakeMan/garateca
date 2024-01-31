"use client"

import jwt from 'jsonwebtoken';
import { store } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { set, remove } from 'src/redux/Features/Auth/currentUserSlice';
import { redirect } from 'next/navigation'



const verifyToken = (token) => {

  if (!token) {
    return null;
  }
  var decoded = null;
  try {
    decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
  } catch(err) {
    console.error(err);
    decoded = err;
  }
  return decoded;
};

const fetchToken = (decoded = false) => {

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  return (!decoded) ?  accessToken : verifyToken(accessToken);
}

export { verifyToken, fetchToken }
