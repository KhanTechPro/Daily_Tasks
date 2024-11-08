import React, { useState } from 'react';


function MonthlyChallenge() {
    const months = [
        { name: "Yanvar", number: 1 },
        { name: "Fevral", number: 2 },
        { name: "Mart", number: 3 },
        { name: "Aprel", number: 4 },
        { name: "May", number: 5 },
        { name: "Iyun", number: 6 },
        { name: "Iyul", number: 7 },
        { name: "Avgust", number: 8 },
        { name: "Sentyabr", number: 9 },
        { name: "Oktyabr", number: 10 },
        { name: "Noyabr", number: 11 },
        { name: "Dekabr", number: 12 },
    ];

    const currentMonth = new Date().getMonth(); // Current month
    const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);

    const handlePrevMonth = () => {
        setCurrentMonthIndex((prevIndex) =>
            prevIndex === 0 ? months.length - 1 : prevIndex - 1
        );
    };

    const handleNextMonth = () => {
        setCurrentMonthIndex((prevIndex) =>
            prevIndex === months.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    className="nav-button text-[#5200ff] font-bold transition duration-300"
                    onClick={handlePrevMonth}
                >
                    &lt;
                </button>
                <div className="grid grid-cols-12 md:grid-cols-6 lg:grid-cols-12">
                    {months.map((month, index) => (
                        <div
                            key={month.number}
                            className={`text-center py-4 px-3 border border-[#5200ff] transition-all duration-300 ${
                                index === currentMonthIndex
                                    ? "bg-[#5200ff] font-bold text-white"
                                    : "text-gray-700"
                            }`}
                        >
                            <div className="month-name">{month.name}</div>
                            <div className="month-number">{month.number}</div>
                        </div>
                    ))}
                </div>
                <button
                    className="nav-button text-[#5200ff] font-bold transition duration-300"
                    onClick={handleNextMonth}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default MonthlyChallenge;