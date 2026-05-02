import { useNavigate } from "react-router-dom";

const Header = () => {       

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  }

  const handleSignIn = () => {
    navigate('/login');
  }
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
    history.go(0);
  }
  
  return (
    <header className="bg-gray-700 p-4">
        <h1 className="text-2xl text-yellow-400 font-bold">My Todo App</h1>
        
        <div className="absolute top-4 right-4">
          <button className="btn rounded-full bg-green-500 text-white text-sm" onClick={ handleSignUp }>Sign Up</button>
          <button className="btn rounded-full bg-blue-500 text-white text-sm" onClick={ handleSignIn }>Login</button>
          <button className="btn rounded-full bg-red-500 text-white text-sm" onClick={ handleLogout }>Logout</button>
        </div>
    </header>
    )
}

export default Header;