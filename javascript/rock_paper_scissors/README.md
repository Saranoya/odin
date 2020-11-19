# What is this? 

I built this 'Rock, Paper, Scissors' game while running through the 'Web Development 101' course at [The Odin Project](https://www.theodinproject.com/courses/web-development-101/lessons/rock-paper-scissors), which I highly recommend to anyone who wants to get into web development. The end result, as it currently stands, can be viewed [here](https://saranoya.github.io/odin/javascript/rock_paper_scissors/). 

Before I started this project, I had gone through the Learn to Code 1 and 2 courses in [Swift Playgrounds](https://www.apple.com/swift/playgrounds/) on iPad, which gave me a basic familiarity with standard programming control structures and ways to group related code (i.e., functions). 

# New things I learned

## CSS

### Cursor appearance options

I [change the appearance of the cursor](https://www.w3schools.com/cssref/pr_class_cursor.asp) when it hovers over an image that serves as a button, using the `cursor` property:

```css
#content img { cursor: pointer; } 
```

### Transparancy on hover
I [make the button image transparent](https://www.w3schools.com/css/css_image_transparency.asp) when the cursor hovers over it:

```css
#content img:hover { opacity: 0.5; filter: alpha(50); }
```

## JavaScript

### Dynamically triggering functions

In version 2 of this project (the current version), I use [Event Listeners](https://www.w3schools.com/js/js_htmldom_eventlistener.asp) to trigger each new round as the user clicks an image to make their choice. They are removed once either the computer or the player has won 5 rounds. 

**NOTE:** Getting this code to work correctly requires that the script be included at the bottom of the page (right before the closing `html` tag), rather than in the header section. 

```javascript
for (let button of document.querySelectorAll('.button')) { button.addEventListener('click', playRound); }

function playRound() { 
	...
    if (pWins == 5 || cWins == 5) { 
        for (button of document.querySelectorAll('.button') { button.removeEventListener('click', playRound); }
    }
    ...
}
```

### Dynamically building a table

I [retrieve existing page elements, add (styled) new elements, and populate them](https://www.freecodecamp.org/news/dom-manipulation-in-vanilla-js-2036a568dcd9/) dynamically, to create the table of previously played rounds: 

```javascript
function displayChoices(pChoice, cChoice) {
	message = `You picked ${getText(options[pChoice])}. Computer picked ${getText(options[cChoice])}. `;
	const tBody = document.querySelector('tbody'), row = document.createElement('tr');
	for (i = 0; i < 2; i++) {
		const move = document.createElement('td');
      	i%2 == 0 ? move.innerHTML = options[pChoice] : move.innerHTML = options[cChoice];
       row.appendChild(move);
    } tBody.appendChild(row);
}    
```

### The ternary operator

The above code snippet also happens to contain one of my first uses of the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), which I've since come to love and use all over the place, often in cases where I would otherwise use a [switch statement](https://www.w3schools.com/js/js_switch.asp) (with an ugly `break` at the end of each `case`), or a long chain of `if/else if` statements with little code between the brackets.

### Template literals

[Template literals](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Template_literals) are a nice way to include variables in a string without having to use concatenation, as seen above:

```javascript
message = `You picked ${getText(options[pChoice])}. Computer picked ${getText(options[cChoice])}. `;
```
### Generating random numbers

This project required me to figure out how to [generate random integers](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/basic-javascript/generate-random-whole-numbers-with-javascript/), which I did with `Math.floor(Math.random()*upperBound)`. 

There is a fascintating challenge many applications that need random numbers face, in that  most built-in random number generators (including JavaScript's `Math.random()`) [do not generate truly random numbers](https://hackernoon.com/how-does-javascripts-math-random-generate-random-numbers-ef0de6a20131). In cryptography (used among other things to encrypt web trafic with SSL), this can pose security risks. The problem has been tackled in many creative ways, including [Cloudflare's wall of lava lamps](https://www.youtube.com/watch?v=1cUUfMeOijg). 

However, for this game, I decided `Math.random()` will suffice, even knowing that it isn't truly random. 

### Refreshing the page

The player can reset the game or start a new round by clicking on a link that will [refresh the current page](https://www.w3schools.com/jsref/met_loc_reload.asp) with `location.reload()`:

```html
<a id="reset" href="#" onclick="location.reload(true)">RESET</a>
```
