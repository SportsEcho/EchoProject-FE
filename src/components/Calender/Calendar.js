import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar({ onDateChange }) {
  return (
      <DatePicker
          selected={new Date()}
          onChange={(date) => onDateChange(date)}
          dateFormat="yyyy-MM-dd"
      />
  );
}

export default Calendar;
