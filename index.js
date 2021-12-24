// declare runningTotal and set it to 0. This will act as a user's typed-in numbers.
let runningTotal = 0;
// declare a variable that will keep a track of user's input. String because numbers displayed in calc is a string
let buffer = "0";
// previousOperator to keep a track of user's previously clicked operator button in order to calculate the number properly.
let previousOperator = null;
// grab the screen element and set it to screen variable
const screen = document.querySelector(".screen");

// create a function buttonClick that will fire off diff function depending on the input value- check if value is number or not. if it is not a number, invoke handleSymble passing in value. if it is , invoke handlenumber with vlaue passed in. lastly, invoke a function rerender because you should always reernder everytime button is clicked.
const buttonClick = value => {
  if(isNaN(parseInt(value))) handleSymbol(value);
  else handleNumber(value);
  rerender();
};

// write handleNumber function passing in value 
  //if buffer is 0, reassign buffer to its value. else, append value into buffer. ex) 0 -> 5, 555
 const handleNumber = value => {
   if(buffer === "0") buffer = value;
   else buffer += value;
 }; 

// write a function rerender that displays the buffer in the screen.
const rerender = value => {
  screen.innerText = buffer;
};

// write a function handleSymbol that takes in value using switch statement. this will handle all the symbols in the calculator.
  // if it is 'C", reassign variables accordingly and break
  // if case is =, check if previousOperator exists or not. if it doesn't do nothing (jus treturn) but if it does, invoke flushOperation passing it parseInt'd buffer. will write flushOperation later.  
  // if it is "back arrow", check if buffer length strickly equals to 1, buffer will beocme 0. else buffer is getting reassiend to the value with the last letter removed. 
  // if default, invoke handleMath passing in value and break
const handleSymbol = value => {
  switch(value){
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if(previousOperator === "null"){
        return;
      } else {
        flushOperator(parseInt(buffer));
        previousOperator = null;
        buffer = '' + runningTotal;
        runningTotal = 0;
        break;
      }
    case "🔙":
      console.log('buffer!')
      if(buffer.length === 1) buffer = 0;
      else buffer = buffer.substring(0, buffer.length-1);
      break;
    default:
      handleMath(value);
      break;
  }
};
  
// create a function handleMath passing in value. coerce buffer into a number. if running totla stricly eaul to 0, reassign running total into intbuffer. else invoke flushoperation of intBuffer
const handleMath = value => {
  const intBuffer = parseInt(buffer);
  if(runningTotal === 0) runningTotal = intBuffer;
  else flushOperator(intBuffer);
  previousOperator = value //???
  buffer = "0" 
};

// create a func flushOperation passing it intbuffer, write if statemnbet for each operator. This function is to actually commit math part and update runningTotal.  
const flushOperator = intBuffer => {
  if(previousOperator === "+") runningTotal += intBuffer;
  else if(previousOperator === "-") runningTotal -= intBuffer;
  else if(previousOperator === "x") runningTotal *= intBuffer;
  else runningTotal /= intBuffer;
}


// create an event listner for the entire calculator
document.querySelector(".calc-buttons").addEventListener("click", function(event){
  buttonClick(event.target.innerText);
})
