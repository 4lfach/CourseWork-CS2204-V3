function ValidateForm(bookDate, bookTime, bookSeatNumber) {
  var error_handler = document.getElementById("error-handler");
  var isError = false;

  var error_message = "";

  console.log(typeof (bookSeatNumber));

  var bookSeatInt = parseInt(bookSeatNumber);
  if (bookSeatInt <= 0 || bookSeatInt == "") {
    error_message += "Please enter a valid number of people!\n";
    isError = true;
  }

  if ((bookDate == null || bookDate == "") || (bookTime == null || bookTime == "") || (bookSeatNumber == null || bookSeatNumber == "")) {
    error_message = "Data not completed; please re-enter";
    isError = true;
  }

  if (isError) {
    error_handler.innerHTML = error_message;
    error_handler.style.display = "block";
  } else {
    error_handler.innerHTML = "";
    error_handler.style.display = "none";
  }

  return isError;
}

function ReserveSeat() {

  var bookDate = document.forms["Form"]["book_date"].value;
  var bookTime = document.forms["Form"]["book_time"].value;
  var bookSeatNumber = document.forms["Form"]["book_seat_number"].value;

  var error = ValidateForm(bookDate, bookTime, bookSeatNumber);

  if (!error) {
    //let is used to avoid using bookseatInt outside of ReserveSeat function scope
    let bookSeatInt = parseInt(bookSeatNumber);
    if (reserve(bookDate, bookTime, bookSeatInt)) {
      alert("Your reservation is successful!");
    } else {
      alert("Sorry, the reservation is full!");
    }
  }
  return false;
}