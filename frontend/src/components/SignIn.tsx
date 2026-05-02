import Header from "./Header";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) return;

    await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        }).then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('User logged in:', data);
          localStorage.setItem('access_token', data.access_token);
          navigate('/');
        })
        .catch(error => console.error('Error logging in user:', error));
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
    </div>
  )
}

export default SignIn;
