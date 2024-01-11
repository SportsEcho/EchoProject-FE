import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchFootballGames(date.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 전달
  };

  return (
      <div>
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
      </div>
  );
}
