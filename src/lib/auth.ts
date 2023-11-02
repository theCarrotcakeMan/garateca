"use client"

import jwt from 'jsonwebtoken';
import { store } from 'src/redux/store';
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  jwt.verify(token, process.env.NEXT_PUBLIC_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    // Attach the decoded token data to the request
    req.user = decoded.user;
    next();
  });
};

const fetchToken = () => {

  try {

    const accessToken = useAppSelector((state) => state.auth.accessToken);
    console.log("authAccessInfoMaxPlus", accessToken);
    return (accessToken) ? accessToken : null;

  } catch (error) {
    console.log(error);
  }

}

export { verifyToken, fetchToken }
