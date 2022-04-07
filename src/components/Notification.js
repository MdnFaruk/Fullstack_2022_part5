const Notification = ({ message,isError }) => {

  let color = isError ? 'red' : 'green'
  if (message === null) {
    return null
  }

  return (
    <div className="message" style={{ color:`${color}` }}>
      {message}
    </div>
  )
}

export default Notification