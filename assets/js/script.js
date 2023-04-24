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

  //getting today's date
  const today = dayjs();
  $("#currentDay").text(today.format("MMM D, YYYY"));

  //getting current hour
  let currentHour = dayjs().hour();
  //console.log(currentHour);

  //to test different current hours, please use 24-hour format
  //let currentHour = 13;

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

  let localStorageData = JSON.parse(localStorage.getItem("schedule"));
  console.log(localStorageData);

  let taskToRender = "";
  let timeOfTaskToRender = "";

  for (let i = 0; i < availableHours.length; i++) {
    //creating div for each hour without past/present/future classes
    const hourDiv = $("<div>");
    hourDiv.addClass("row time-block");


//formatting hour from displayed to 24 hour format to be able to compare
    let hourDisplayed = parseInt(availableHours[i].split(" ")[0]);
    let timeOfTheDay = availableHours[i].split(" ")[1];
    let formattedHour = 0;
    if (timeOfTheDay === "PM" && hourDisplayed !== 12) {
      formattedHour = hourDisplayed + 12;
    } else {
      formattedHour = hourDisplayed;
    }

    //adding past/present/future classes based on the current hour
    if (currentHour === formattedHour) {
      hourDiv.addClass("present");
    } else if (currentHour > formattedHour) {
      hourDiv.addClass("past");
    } else {
      hourDiv.addClass("future");
    }

    const hourTitleDiv = $("<div>");
    hourTitleDiv.text(availableHours[i]);
    hourTitleDiv.addClass("col-2 col-md-1 hour text-center py-3");
    //console.log(availableHours[i]);

    const taskDescription = $("<textarea>");
    taskDescription.addClass("col-8 col-md-10 description");
    taskDescription.attr("rows", "3");

    if (localStorageData !== null) {
      for (let j = 0; j < localStorageData.length; j++) {
        timeOfTaskToRender = localStorageData[j].taskHour;
        taskToRender = localStorageData[j].taskContent;
        // console.log("Time: " + timeOfTaskToRender);
        // console.log("Task: " + taskToRender);
        if (availableHours[i] === timeOfTaskToRender) {
          taskDescription.text(taskToRender);
        }
      }
    }

    const saveBtn = $("<button>");
    saveBtn.addClass("btn saveBtn col-2 col-md-1");
    saveBtn.attr("aria-label", "save");

    const iArea = $("<i>");
    iArea.addClass("fas fa-save");
    iArea.attr("aria-hidden", "true");

    saveBtn.append(iArea);
    hourDiv.append(hourTitleDiv, taskDescription, saveBtn);

    containerAllHours.append(hourDiv);

    saveBtn.on("click", function (event) {
      event.preventDefault();
      //console.log(event.target.type);

      let targetTextArea;
      //if user clicks on save image, need to get to parent button and then previous sibling, text area; otherwise, if user clicks the button itself, just looking for previous sibling, text area
      if (event.target.type === undefined) {
        targetTextArea = event.target.parentElement.previousElementSibling;
      } else if (event.target.type === "submit") {
        targetTextArea = event.target.previousElementSibling;
      }

      //getting hours from previous sibling of text area
      let hourSelected = targetTextArea.previousElementSibling.innerHTML;

      //console.log(hourSelected);
      //console.log(targetTextArea);

      //object to store schedule details
      let scheduleDetails = {
        taskContent: targetTextArea.value.trim(),
        taskHour: hourSelected,
      };

      //pushing details into local storage data array
      if (localStorageData === null) {
        localStorageData = [];
        localStorageData.push(scheduleDetails);
      } else {
        localStorageData.push(scheduleDetails);
      }

      //saving local storage data array into localStorage in the browser
      localStorage.setItem("schedule", JSON.stringify(localStorageData));
    });
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
