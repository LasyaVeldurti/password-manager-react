import './index.css'

const PasswordItem = props => {
  const {listDetails, deleteLog} = props
  const {website, username, id} = listDetails
  const {starImage} = (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )
  const onDelete = () => {
    deleteLog(id)
  }
  return (
    <li className="li-container">
      <div className="name-icon">{website[0].toUpperCase()}</div>
      <div className="input-details">
        <p>{website} </p>
        <p>{username} </p>
        <p>{starImage} </p>
      </div>
      <button
        onClick={onDelete}
        className="delete-btn"
        data-testid="delete"
        type="button"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
