/*
supported input types
3:30 is 3:30
15:00 is 3pm
4pm is 4pm
4.4 is 4 hours and 24 minutes
*/

function fuzzyTimeInput(input, returnType){
  if(!input || input.length == 0){
    return null;
  }
  if(!returnType){
    returnType = 'string';
  }
  var isAM = false;
  var isPM = false;
  // determine am or pm
  if(input.indexOf('a') != -1 || input.indexOf('A') != -1){
    isAM = true;
  }else if(input.indexOf('p') != -1 || input.indexOf('P') != -1){
    isPM = true;
  }
    
  var val = {hours:0,minutes:0};
  if(input.indexOf(':') != -1){
    var split = input.split(':');
    val.hours = parseInt(split[0]) || 0;
    // if in the PM add 12 hours
    if(isPM && val.hours <= 12){
      val.hours += 12;
    }
    val.minutes = parseInt(split[1]) || 0;
    return returnWithType(val,returnType);
  }
  if(input.indexOf('.') != -1){
    var split = input.split('.');
    val.hours = split[0];
    // 60 minutes / 10
    val.minutes = 60 * split[1]/10;
    return returnWithType(val,returnType);
  }
  var num = parseInt(input);
  if(num<=12 && ((input.indexOf('m') == -1 && input.indexOf('M') == -1) || isPM || isAM)){
    if(isPM){
      return returnWithType({hours:num+12,minutes:0},returnType);
    }else {
      // if AM or unspecified, assume hours
      return returnWithType({hours:num,minutes:0},returnType);
    }
  }else{
    // 1512 == 15:12 format
    if((''+num).length == 4){
      val.hours = Math.floor(num/100);
      val.minutes = num%100;
      // if in the PM add 12 hours
      if(isPM && val.hours <= 12){
        val.hours += 12;
      }
      return returnWithType(val,returnType);
    }
    // 310 == 3:10 or 310p == 15:10
    if((''+num).length == 3){
      val.hours = Math.floor(num/100);
      val.minutes = num%100;
      // if in the PM add 12 hours
      if(isPM && val.hours <= 12){
        val.hours += 12;
      }
      return returnWithType(val,returnType);
    }

    // otherwise, just minutes
    return returnWithType({hours:0,minutes:num},returnType);
  }  
}

function returnWithType(val,type){
  if(val.hours >= 24 || val.minutes >= 60){
    return null;
  }
  switch(type.toLowerCase()){
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