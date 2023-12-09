'use client'

const AuthToken = () => {

  const token = localStorage.getItem('access_token');
  return !!token;
}

export default AuthToken