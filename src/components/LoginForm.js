const LoginForm = ({ username, password, handleLogin, handleUsername, handlePassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
          username <input type="text" value={username} name="username" id="username" onChange={handleUsername} />
      </div>
      <div>
          password <input type="password" value={password} name="password" id="password" onChange={handlePassword} />
      </div>
      <button type="submit" id="login">login</button>
    </form>
  )
}

export default LoginForm