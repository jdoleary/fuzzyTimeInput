# fuzzyTimeInput
A small, no-dependency package for normalizing time (hours, minutes, second) inputs from users.

```
var fuzzytimeinput = require("fuzzytimeinput")
fuzzytimeinput('3:30pm'); // '15:30'
fuzzytimeinput('3:30'); // '3:30'
fuzzytimeinput('15:00'); // '3:00'
fuzzytimeinput('4.4'); // '4:24'

fuzzytimeinput('4.4','json'); // {hours:4,minutes:24}
```
