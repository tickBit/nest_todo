
import { useNavigate } from "react-router-dom";

const Header = () => {         
  const navigate = useNavigate();

  const getLink = () => {
    
    // call the backend endpoint to get the login link
    fetch('http://localhost:3000/auth/login-with-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: (document.querySelector('input[type="text"]') as HTMLInputElement).value })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Magic link sent:', data);
            
      alert(data.message);
    }
    )
    .catch(error => console.error('Error sending magic link:', error));
  }
  
  
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
        
        <div>
          <button className="btn rounded-full bg-purple-500 text-white text-sm" onClick={ getLink }>Get Magic Link</button>
          <input className="email" type="text" placeholder="Enter your email" />
        </div>
        
        <div className="absolute top-4 right-4">
          <button className="btn rounded-full bg-green-500 text-white text-sm" onClick={ handleSignUp }>Sign Up</button>
          <button className="btn rounded-full bg-blue-500 text-white text-sm" onClick={ handleSignIn }>Login</button>
          <button className="btn rounded-full bg-red-500 text-white text-sm" onClick={ handleLogout }>Logout</button>
        </div>
    </header>
    )
}

export default Header;