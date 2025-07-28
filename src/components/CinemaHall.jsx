import { useEffect, useState } from "react";

const ROW = 10,
  COL = 10;

const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

export default function CinemaHall() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [bookSeats, setBookSeats] = useState([]);

  const handleSeatClick = (e) => {
    const value = e.target.innerText;

    const copySelectedSeats = [...selectedSeats];
    if (copySelectedSeats.includes(value)) {
      e.target.className = "col";
      const indexOfSeat = copySelectedSeats.indexOf(value);
      copySelectedSeats.splice(indexOfSeat, 1);
    } else {
      e.target.className += " selected-seat";
      copySelectedSeats.push(value);
    }
    setSelectedSeats(copySelectedSeats);
  };

  const handleBookSeat = () => {
    if (!selectedSeats.length) {
      alert("Please select atleast one seat");
      return;
    }
    setBookSeats((prevSeats = []) => {
      const updatedSeats = [...prevSeats, ...selectedSeats];
      return updatedSeats;
    });
    const divs = document.querySelectorAll(".selected-seat");
    divs.forEach((element) => {
      element.classList.remove("selected-seat");
      element.classList.add("disabled-seat");
      return;
    });
    setSelectedSeats([]);
  };

  const handleClear = () => {
    const divs = document.querySelectorAll(".selected-seat");
    divs.forEach((element) => {
      element.classList.remove("selected-seat");
      return;
    });
    setSelectedSeats([]);
  };

  const handleReset = () => {
    const selectedDivs = document.querySelectorAll(".selected-seat");
    selectedDivs.forEach((element) => {
      element.classList.remove("selected-seat");
      return;
    });
    setSelectedSeats([]);
    const bookedDivs = document.querySelectorAll(".disabled-seat");
    bookedDivs.forEach((element) => {
      element.classList.remove("disabled-seat");
      return;
    });
    setBookSeats([]);
  };

  useEffect(() => {
    console.log("booked seats: ", bookSeats);
    console.log("selected seats: ", selectedSeats);
  }, [bookSeats, selectedSeats]);

  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>
      <div className="button-section">
        <button data-testid="book-button" onClick={handleBookSeat}>
          Book Seats
        </button>
        <button data-testid="clear-button" onClick={handleClear}>
          Clear
        </button>
        <button data-testid="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="cinema-hall" data-testid="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              return (
                <div className={`col`} key={colIdx}>
                  <div
                    onClick={handleSeatClick}
                    className="seat"
                    data-testid={`seat-${alphabets[rowIdx]}${colIdx}`}
                  >
                    {`${alphabets[rowIdx]}${colIdx}`}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {bookSeats.length !== 0 && <h4>Booked Seats: {bookSeats.join(", ")}</h4>}
    </div>
  );
}
