/*
supported input types
3:30 is 3:30
15:00 is 3pm
4pm is 4pm
4.4 is 4 hours and 24 minutes
*/

function fuzzyTimeInput(input, returnType){
  if(!returnType){
    returnType = 'string';
  }
  var am = true;
  // determine am or pm
  if(input.indexOf('a') != -1 || input.indexOf('A') != -1){
    am = true;
  }else if(input.indexOf('p') != -1 || input.indexOf('P') != -1){
    am = false;
  }
    
  var val = {hours:0,minutes:0};
  if(input.indexOf(':') != -1){
    var split = input.split(':');
    val.hours = parseInt(split[0]);
    // if in the PM add 12 hours
    if(!am){
      val.hours += 12;
    }
    val.minutes = parseInt(split[1]);
    return returnWithType(val,returnType);
  }
  if(input.indexOf('.') != -1){
    var split = input.split('.');
    val.hours = split[0];
    // 60 minutes / 10
    val.minutes = 60 * split[1]/10;
    return returnWithType(val,returnType);
  }
  
  
}
function returnWithType(val,type){
  if(val.hours >= 24 || val.minutes >= 60){
    return null;
  }
  switch(type){
    case 'json':
      return val;
    break;
    case 'string':
      val.minutes = parseInt(val.minutes);
      if(val.minutes < 10){
          val.minutes = '0' + val.minutes;
      }
      return val.hours + ':' + val.minutes;
    break;
  }
}

module.exports = fuzzyTimeInput;