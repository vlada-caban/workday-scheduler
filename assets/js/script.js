// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  //today's date
const today = dayjs();
$("#currentDay").text(today.format("MMM D, YYYY"));

  //gets current hour
  let currentHour = dayjs().hour();
  console.log(currentHour);

  //let currentHour =17;

  //create divisions for each hour from 9:00 - 18:00 - 9am-5pm sections
  const containerAllHours = $(".container-lg");

  const availableHours = [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
    ]; 

  for (let i = 0; i < availableHours.length; i++) {
    //creating div for each hour without past/present/future classes
    const hourDiv = $("<div>");
    hourDiv.addClass("row time-block");

    let hour = parseInt(availableHours[i].split(" ")[0]);
    let timeOfTheDay = availableHours[i].split(" ")[1];
    let formattedHour = 0;  
     if (timeOfTheDay === "PM" && hour !== 12) {
      formattedHour = hour + 12;
    } else {
      formattedHour = hour;
    }

if (currentHour === formattedHour) {
  hourDiv.addClass("present");
} else if (currentHour > formattedHour) {
  hourDiv.addClass("past");
} else {
  hourDiv.addClass("future");
}
    const hourTitleDiv = $("<div>");
    hourTitleDiv.text(availableHours[i]);
    hourTitleDiv.addClass("col-2 col-md-1 hour text-center py-3"); //can I do this?

    const taskDescription = $("<textarea>");
    taskDescription.addClass("col-8 col-md-10 description");
    taskDescription.attr("rows", "3"); 

    const saveBtn = $("<button>");
    saveBtn.addClass("btn saveBtn col-2 col-md-1");
    saveBtn.attr("aria-label", "save"); 

    saveBtn.on("click", function(event){
event.preventDefault();
//console.log(event.target.type);

let targetTextArea;
if (event.target.type === undefined) {
  targetTextArea = event.target.parentElement.previousElementSibling;
} else if (event.target.type === "submit") {
  targetTextArea = event.target.previousElementSibling;
} 
let hour = targetTextArea.previousElementSibling.innerHTML.split(" ")[0];

console.log(hour);
//console.log(targetTextArea);

let scheduleDetails = {
  taskContent: targetTextArea.value,
  taskHour: hour
};

let localStorageData = JSON.parse(localStorage.getItem("schedule"));

if (localStorageData === null) {
localStorageData = []
localStorageData.push(scheduleDetails)
} else {
  localStorageData.push(scheduleDetails);
}


  localStorage.setItem("schedule", JSON.stringify(localStorageData));

    })

    const iArea = $("<i>");
    iArea.addClass("fas fa-save");
    iArea.attr("aria-hidden", "true");

    // iArea.on("click", function (event) {
    //   event.preventDefault();
    //   console.log(event.target.previousElementSibling.previousElementSibling);
    // });

    saveBtn.append(iArea);
    hourDiv.append(hourTitleDiv, taskDescription, saveBtn);

    containerAllHours.append(hourDiv);
   
  }



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // TODO: Add code to display the current date in the header of the page.
  
});
