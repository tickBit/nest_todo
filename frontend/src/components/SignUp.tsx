import Header from "./Header";

const SignUp = () => {
    
  // read form data and send to backend API to create a new user
  const handleSignUp = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
        
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    if (!email || !password) return;

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
        console.error('Signup failed:', response.status, data);
        return;
      }

      console.log('User registered:', data);
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
    </div>
  )
}

export default SignUp;
