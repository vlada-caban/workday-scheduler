$(function () {
  //getting today's date
  const today = dayjs();

  //displaying today's date in dedicated section
  $("#currentDay").text(today.format("MMM D, YYYY"));

  //getting current hour
  let currentHour = dayjs().hour();
  //console.log(currentHour);

  //to test different current hours, please use 24-hour format
  //let currentHour = 13;

  //selecting container for schedule
  const containerAllHours = $(".container-lg");

  //creating array for all available hours to display
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

  //getting current data from local storage
  let localStorageData = JSON.parse(localStorage.getItem("schedule"));
  //console.log(localStorageData);

  let taskToRender = "";
  let timeOfTaskToRender = "";

  //let updatedStorageData = [];

  for (let i = 0; i < availableHours.length; i++) {
    //creating div for each hour without past/present/future classes first
    const hourDiv = $("<div>");
    hourDiv.addClass("row time-block");

    //formatting hour from displayed to 24 hour format to be able to compare
    let displayedHour = parseInt(availableHours[i].split(" ")[0]);
    let timeOfTheDay = availableHours[i].split(" ")[1];
    let formattedHour = 0;
    if (timeOfTheDay === "PM" && displayedHour !== 12) {
      formattedHour = displayedHour + 12;
    } else {
      formattedHour = displayedHour;
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

    //if storage not empty, rendering tasks to the page
    if (localStorageData !== null) {
      for (let j = 0; j < localStorageData.length; j++) {
        timeOfTaskToRender = localStorageData[j].taskHour;
        taskToRender = localStorageData[j].taskContent;

        //comparing the hour that is being rendered if it has any tasks already stored in the storage against it
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

      // console.log($(this));
      // console.log($(this).prev());
      // console.log($(this).prev()[0].value);
      // console.log($(this).prev().prev()[0].textContent);

      //storing into object task and hour of the clicked button
      let scheduleDetails = {
        taskContent: $(this).prev()[0].value,
        taskHour: $(this).prev().prev()[0].textContent,
      };

      //!before pushing to local storage, need to check if this hour already had task and update that entry OR remove and add new

      // if (localStorageData === null) {
      //   localStorageData = [];
      //   localStorageData.push(scheduleDetails);
      //   localStorage.setItem("schedule", JSON.stringify(localStorageData));
      // } else {
      //   for (let k = 0; k < localStorageData.length; k++) {
      //     if (scheduleDetails.taskHour === localStorageData[k].taskHour) {
      //       updatedStorageData = localStorageData.filter(
      //         (e) => !localStorageData.includes(scheduleDetails.taskHour)
      //       );
      //     }
      //     updatedStorageData.push(scheduleDetails);
      //   }
      //   localStorage.setItem("schedule", JSON.stringify(updatedStorageData));
      // }

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

});
