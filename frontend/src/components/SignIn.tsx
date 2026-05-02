import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<string[]>([]);
  
  const handleSignIn = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) return;

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        })
          
        const data = await response.json();
      
        if (!response.ok) {
          setMessages([]);
          console.error('SignIn failed:', response.status, data);
          
          setMessages([data.message]);
          
          return;
        }
        
        setMessages([]);
        console.log('User registered:', data);
        localStorage.setItem('access_token', data.access_token);
        navigate('/');
            
      } catch (error) {
        console.error('Error registering user:', error);
      }
        
  }
  
  return (
    <div>
        <Header />
        <div className="center">
        <h2>Login</h2>
        </div>
        <div className="center">
        <form onSubmit={handleSignIn}>
            <input type="email" name="email" placeholder="Email" className="input" />
            <input type="password" name="password" placeholder="Password" className="input" />
            <button type="submit" className="btn bg-blue-500 text-white">Login</button>
        </form>
        </div>
        <div className="error-container">
        {messages.length > 0 ? (
          <>
            <h2 className="text-xl text-red-500">Errors:</h2>
              {messages.map((msg, index) => (
                <p key={index} className="text-red-500">{msg}</p> 
            
              ))}
          </>
         ) : null}
        </div>
    </div>
  )
}

export default SignIn;
