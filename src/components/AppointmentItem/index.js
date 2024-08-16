import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickedStar = () => {
    toggleStarred(id)
  }

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointment-list-item">
      <div className="appointment">
        <div className="appointment-info-container">
          <p className="appointment-name">{title}</p>
          <p className="appointment-date">Date: {newDate}</p>
        </div>
        <button
          className="star-icon-btn"
          type="button"
          data-testid="star"
          onClick={onClickedStar}
        >
          <img src={starImageUrl} alt="star" className="fav-star-icon" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
