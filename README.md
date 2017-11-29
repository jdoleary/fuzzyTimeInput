# fuzzyTimeInput
Normalize inconsistent time strings ("3pm","3:00p","15:00","3PM") to a consistant format.
This small, no-dependency package supports a large variety of time entry formats (see the Unit Tests) and outputs military time (default) or JSON.

```
var fuzzytimeinput = require("fuzzytimeinput")
// It defaults to military time
fuzzytimeinput('3:30pm'); // '15:30'
fuzzytimeinput('3:30'); // '3:30'
fuzzytimeinput('15:00'); // '15:00'
fuzzytimeinput('4.4'); // '4:24'
// But you may prefer JSON if you wish to access the hours and minutes separately.
fuzzytimeinput('4.4','json'); // {hours:4,minutes:24}
```
