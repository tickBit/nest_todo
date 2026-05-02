import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate()

  const [messages, setMessages] = useState<string[]>([]);
        
  // read form data and send to backend API to create a new user
  const handleSignUp = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
        
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      console.log('Sending signup request:', { email });

      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setMessages([]);
        for (const msg of data.message) {
          setMessages(current => [...current, msg]);
        }
        console.error('Signup failed:', response.status, data);
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
            <h2 className="text-xl">Sign Up</h2>
        </div>
        <div className="center">
        <form onSubmit={handleSignUp}>
            <input type="email" name="email" id="email" placeholder="Email" className="input" required />
            <input type="password" name="password" id="password" placeholder="Password" className="input" required />
            <button type="submit" className="btn bg-green-500 text-white">Sign Up</button>
        </form>
        </div>
        <div className="error-container">
        {messages.length > 0 ? (
          <>
            <h2 className="text-xl text-red-500">Errors:</h2>
              {messages.map((msg, index) => (
                <p key={index} className="text-red-500">{msg}</p> 
            
              ))}
          </>)
          : null}
        </div>
    </div>
  )
}

export default SignUp;
