function SuccessMessage({ message }) {
  if (!message) return null
  return <p className="success">{message}</p>
}

export default SuccessMessage
