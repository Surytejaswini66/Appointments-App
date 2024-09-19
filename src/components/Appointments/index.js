// Write your code here
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import AppointmentItem from '../AppointmentItem';
import './index.css';

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    showStarred: false,
  };

  onChangeTitle = event => {
    this.setState({ titleInput: event.target.value });
  };

  onChangeDate = event => {
    this.setState({ dateInput: event.target.value });
  };

  onAddAppointment = event => {
    event.preventDefault();
    const { titleInput, dateInput } = this.state;

    if (titleInput && dateInput) {
      const newAppointment = {
        id: uuidv4(),
        title: titleInput,
        date: dateInput,
        isStarred: false,
      };

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
      }));
    }
  };

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(appointment => {
        if (appointment.id === id) {
          return { ...appointment, isStarred: !appointment.isStarred };
        }
        return appointment;
      }),
    }));
  };

  toggleShowStarred = () => {
    this.setState(prevState => ({ showStarred: !prevState.showStarred }));
  };

  getFilteredAppointments = () => {
    const { appointmentsList, showStarred } = this.state;
    if (showStarred) {
      return appointmentsList.filter(appointment => appointment.isStarred);
    }
    return appointmentsList;
  };

  render() {
    const { titleInput, dateInput, showStarred } = this.state;
    const filteredAppointments = this.getFilteredAppointments();

    return (
      <div className="app-container">
        <div className="add-appointment-container">
          <form className="form-container" onSubmit={this.onAddAppointment}>
            <h1 className="form-title">Add Appointment</h1>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input"
              placeholder="Title"
              value={titleInput}
              onChange={this.onChangeTitle}
            />
            <label className="label" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="input"
              value={dateInput}
              onChange={this.onChangeDate}
            />
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
            className="appointments-image"
          />
        </div>
        <hr className="separator" />
        <div className="appointments-container">
          <div className="header-container">
            <h1 className="appointments-title">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${showStarred ? 'active' : ''}`}
              onClick={this.toggleShowStarred}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointments.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                appointmentDetails={appointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Appointments;
