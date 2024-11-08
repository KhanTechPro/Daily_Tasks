import React, { useState } from 'react';

const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

function WeeklyChallenge() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const weekDays = getWeekDays(startOfWeek);

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Week container with overlayed navigation buttons */}
      <div className="relative flex items-center justify-between">
        {/* Left Navigation Button */}
        <button
          className="absolute left-0 text-[#5200ff] bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
          onClick={goToPreviousWeek}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &lt;
        </button>

        {/* Weekdays Display without Scroll */}
        <div className="flex justify-center w-full space-x-2 px-10">
          {weekDays.map((date, index) => (
            <div
              key={index}
              className={`flex flex-col items-center px-4 border border-[#5200ff] transition duration-300 ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-[#5200ff] text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <div className="day-name text-md">
                {date.toLocaleDateString('en-EN', { weekday: 'long' })}
              </div>
              <div className="day-date text-[25px]">
                {date.getDate().toString().padStart(2, '0')}.
                {(date.getMonth() + 1).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          className="absolute right-0 text-[#5200ff] bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
          onClick={goToNextWeek}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &gt;
        </button>
      </div>

      {/* Task List */}
      <div className="mt-4">
   
      </div>
    </div>
  );
}

export default WeeklyChallenge;