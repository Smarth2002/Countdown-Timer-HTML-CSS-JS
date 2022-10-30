const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// Date() =current date
//we can also set a specific date using (specify year, month, day, hour, minute, second, and millisecond (in that order))
//let futureDate = new Date(2022, 11, 15, 11, 30, 0);

//setting future date 10 days later from current date each time on opening window
//so that counter never expires and whenever we open 10 days are left

const tempDate = new Date(); //current date

let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//setting future date 10 days later from tempDate (current date)
let futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDate.getFullYear();
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

const month = months[futureDate.getMonth()]; //0-11
const day = weekdays[futureDate.getDay()]; //0-6

//displaying future date when giveaway ends
giveaway.textContent = `giveaway ends on ${day}, ${date} ${month} ${year}, ${hours}:${minutes}am`;

//now to get days, hours, minutes, seconds left
//we need difference btw 2 dates and we get it in mili sec
//and then find hours, min, days,... from those millisec

// future time in milli seconds
const futureTime = futureDate.getTime();

//it just place 0 at beginning if timing unit < 10 (eg 09 hours)
function format(time) {

  if (time < 10) {
    return "0" + time;
  }

  return time;
}

//display days, hours, min, sec left as counter 
function getRemainingTime() {

  //current time in millisec
  const today = new Date().getTime();

  //millisec left
  const t = futureTime - today;

  //calculate ms in day, hour, min to find them by dividing them from total ms left(t)
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(t / oneDay);

  let hours = Math.floor((t % oneDay) / oneHour); //t%oneDay give millisec left after days
  //alternatively
  // hours=t/oneHour; all hours in duration t
  // hours= (hours-(24*days)); subtracting hours covered already by days

  //get millisec left after no hour can be extracted and get minutes from those milisec
  let minutes = Math.floor((t % oneHour) / oneMinute);

  //get ms left after extracting all minutes and get seconds by dividing by 1000
  let seconds = Math.floor((t % oneMinute) / 1000);

  //set values array
  const values = [days, hours, minutes, seconds];

  //setting each h4 element with its idx in values
  for (let i = 0; i < items.length; i++) {

    items[i].textContent = format(values[i]);
  }

  //if giveaway date is reached then ms left (t) will be negative
  //so display giveaway expired 
  //and clear interval using id (stored in countdown) which we get using setInterval() 
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, giveaway has expired<h4>`;
  }
}

//countdown
//The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
//To execute the function only once, use the setTimeout() method instead.
let countdown = setInterval(getRemainingTime, 1000); // countdown stores id