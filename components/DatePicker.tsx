"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-jalaali";
import { usePathname } from "next/navigation";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

interface JalaliDatePickerProps {
  value: moment.Moment;
  name: string;
  onChange: (date: moment.Moment) => void;
}

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  value,
  name,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(value);
  const [inputName, setInputName] = useState(name);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const timePickerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  console.log(pathname)
  const years = Array.from({ length: 20 }, (_, i) => moment().jYear() - 5 + i); // 5 years before and 5 years after current year
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i); // Hours from 0 to 23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // Minutes from 0 to 59

  const currentMonth = moment(selectedDate).startOf("jMonth");
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("jMonth").day();

  const handleDateClick = (day: number) => {
    const date = moment(currentMonth).jDate(day);
    setSelectedDate(date);
    onChange(date);
    setIsCalendarOpen(false);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value, 10);
    const date = moment(selectedDate).jYear(year);
    setSelectedDate(date);
    onChange(date);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    const date = moment(selectedDate).jMonth(month);
    setSelectedDate(date);
    onChange(date);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const hours = parseInt(e.target.value, 10);
    const date = moment(selectedDate).hours(hours);
    setSelectedDate(date);
    onChange(date);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = parseInt(e.target.value, 10);
    const date = moment(selectedDate).minutes(minutes);
    setSelectedDate(date);
    onChange(date);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      timePickerRef.current &&
      !timePickerRef.current.contains(event.target as Node)
    ) {
      setIsTimePickerOpen(false);
    }
  };

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`day cursor-pointer p-2 text-center ${
            day === selectedDate.jDate()
              ? "bg-blue-500 text-white rounded-full"
              : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="jalali-date-picker relative flex gap-5">
      <input
        type="text"
        readOnly
        name={inputName}
        value={selectedDate.format("jYYYY/jMM/jDD")}
        className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />
      {isCalendarOpen && (
        <div className="calendar absolute top-12 z-10 bg-white border border-gray-300 p-4 rounded-lg">
          <div className="selectors flex justify-between mb-2">
            <select
              value={selectedDate.jYear()}
              onChange={handleYearChange}
              className="border p-1 rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={selectedDate.jMonth()}
              onChange={handleMonthChange}
              className="border p-1 rounded"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="days-of-week flex justify-between">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
              <div
                key={index}
                className="day-of-week w-8 text-center font-bold"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="days grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>
      )}
      {pathname !== "/personnel" && (
        <input
          type="text"
          readOnly
          value={selectedDate.format("HH:mm")}
          className="border border-gray-300 px-3 w-full rounded-lg focus:outline-none"
          onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
        />
      )}

      {isTimePickerOpen && (
        <div
          ref={timePickerRef}
          className="time-picker absolute top-16 left-0 z-10 bg-white border border-gray-300 p-3 rounded-lg flex justify-between"
        >
          <select
            value={selectedDate.minutes()}
            onChange={handleMinuteChange}
            className="p-1 rounded"
          >
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <span className="m-2">:</span>
          <select
            value={selectedDate.hours()}
            onChange={handleHourChange}
            className="p-1 rounded"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default JalaliDatePicker;
