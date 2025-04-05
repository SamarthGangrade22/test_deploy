import useSignup from "../hooks/useSignup";
export default function Signup(){

    const {signup,error,isLoading} = useSignup();
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    await signup(data.email, data.password)
    event.target.reset();
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        name="email" required
      />
      <label>Password:</label>
      <input 
        type="password" 
        name="password" required
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}