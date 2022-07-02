import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('authType');
    localStorage.removeItem('token');
    window.location.href = '/';
  }, []);
  return (
    <div>
      <h1>Logeed out</h1>
    </div>
  );
};
export default Logout;
