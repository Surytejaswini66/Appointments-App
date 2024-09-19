// Write your code here
import React from 'react';
import { format } from 'date-fns';
import './index.css';

const AppointmentItem = props => {
  const { appointmentDetails, toggleStar } = props;
  const { id, title, date, isStarred } = appointmentDetails;

  const onStarClick = () => {
    toggleStar(id);
  };

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png';

  return (
    <li className="appointment-item">
      <div className="appointment-header">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onStarClick}
          data-testid="star"
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">{format(new Date(date), 'dd MMMM yyyy, EEEE')}</p>
    </li>
  );
};

export default AppointmentItem;
