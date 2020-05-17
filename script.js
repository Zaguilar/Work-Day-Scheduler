var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){
//  console.log(toDoItems);

//for each time block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      //set the todo hour 
      hour: thisBlockHr,
      //make space for input
      text: "",
    }
    //add this object to array
    toDoItems.push(todoObj);
  });
  //stringify after loop
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  //console.log(toDoItems);
}

//assigning tenses to make blocks respond to color
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //loop thru then assign according to current time
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //check which hour needs to be updated depending on which is clicked
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set text to what was added
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// document loads
$(document).ready(function(){

  //format depending on the time
  setUpTimeBlocks();
  //if nothing in todos
  if(!localStorage.getItem("todos")){
    //initialize array
    initializeSchedule();
  } 

  //display the date
  $currentDay.text(currentDate);

  //render from local storage
  renderSchedule();
  //save when a todo item save button is clicked
  $scheduleArea.on("click", "button", saveHandler);
  
});