import useLogin from "../hooks/useLogin";
export default function Login() {
  const { login, error, isLoading } = useLogin();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    await login(data.email, data.password);
    event.target.reset();
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input type="email" name="email" required />
      <label>Password:</label>
      <input type="password" name="password" required />

      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
