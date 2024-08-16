import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem/index'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: ''}

  onChangeTitleField = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDateField = event => {
    this.setState({
      date: event.target.value,
    })
  }

  toggleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFormSubmitted = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        isStarred: false,
        title,
        date,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  onClickedStarredBtn = () => {
    const {appointmentsList} = this.state
    const filteredAppointmentsList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred !== false,
    )
    this.setState({
      appointmentsList: filteredAppointmentsList,
    })
  }

  render() {
    const {appointmentsList, title, date} = this.state
    return (
      <div className="app-container">
        <div className="box-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-and-image-container">
            <form className="form-container" onSubmit={this.onFormSubmitted}>
              <div className="inputfield-container">
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  className="input-title-field input-field"
                  placeholder="Title"
                  id="title"
                  onChange={this.onChangeTitleField}
                  value={title}
                />
              </div>
              <div className="inputfield-container">
                <label htmlFor="date">DATE </label>
                <input
                  type="date"
                  className="input-date-field input-field"
                  id="date"
                  onChange={this.onChangeDateField}
                  value={date}
                />
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <div className="appointments-header">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className="appointments-button"
              type="button"
              onClick={this.onClickedStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleStarred={this.toggleStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
