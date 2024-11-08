import React from 'react'
import ToDoList from './ToDoList';

function DailyChellenge() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

  return (
  <div className="min-h-screen lg:flex-row  p-4">
  <div className="flex lg:space-x-0 lg:flex-row justify-center items-center bg-[#5200ff] h-14">
  <div className="text-white text-2xl ">
    Today {formattedDate}
  </div>
  </div>
  
  <ToDoList/>
</div>
  )
}

export default DailyChellenge