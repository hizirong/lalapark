// frontend/src/pages/Login.js
import React from 'react';
import { googleLoginURL } from '../services/api';

function Login() {
  return (
    <div>
      <h2>登入</h2>
      <a href={googleLoginURL}>使用 Google 帳號登入</a>
    </div>
  );
}

export default Login;
