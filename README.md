# What is this?

This is a repository of the projects I created and some of the exercises I completed while running through [The Odin Project](https://www.theodinproject.com/). A brief description of each significant project in this repo, alongside links to its source files on GitHub and a live browser preview (hosted on [GitHub Pages](https://pages.github.com) when possible, or elsewhere when necessary) can be found below. 


## HTML / CSS

### Google knock-off

As a first project for Odin's [Web Development 101](https://www.theodinproject.com/courses/web-development-101) primer, I created a visual knock-off of Google's homepage, and another one of the first page of results for [Robert Cailliau](https://en.wikipedia.org/wiki/Robert_Cailliau). 

These pages look more or less like the real Google on a desktop machine (tested in Safari 12, Chrome 76 and Firefox 68 on a MacBook Pro). They do, however, reveal themselves as bad copies on mobile, since I hadn't yet incorporated media queries and/or responsive design into my toolbox when I made them.

- Homepage: [Source](https://github.com/Saranoya/odin/tree/master/html_css/google/homepage) - [View in browser](https://saranoya.github.io/odin/html_css/google/homepage/)
- Search results: [Source](https://github.com/Saranoya/odin/tree/master/html_css/google/search_results) - [View in browser](https://saranoya.github.io/odin/html_css/google/search_results/)

## JavaScript

### Rock, Paper, Scissors

A Rock, Paper, Scissors game that lets the player pick a move from a row of three images (rock, paper or scissors), and counters with a random move from the computer. It dynamically builds a table of previous moves using JavaScript, keeps track of who wins each round, and stops accepting input once either the player or the computer has accumulated 5 wins. It then displays a 'play again?' link that starts a new game by reloading the document.  

[Source](https://github.com/Saranoya/odin/tree/master/javascript/rock_paper_scissors) - [View in browser](https://saranoya.github.io/odin/javascript/rock_paper_scissors/)

### Botch a Sketch

A rudimentary pixelart editor, inspired by [Etch a Sketch](https://en.wikipedia.org/wiki/Etch_A_Sketch). By default, it draws a pixel on a canvas when the mouse pointer hovers over the div representing that pixel. It has: 

- A color picker, to change the color with which a pixel passed over will be filled. 
- A 'shader' mode, in which the pixel being hovered over is darkened by 10% on each pass (until it reaches 100% opacity). 
- A 'random' mode, in which the color of each new pixel drawn is determined at random.
- An eraser, which lets the user click on individual pixels to remove their color.
- A 'clear' button, to empty the whole canvas.

The number of pixels on the canvas, and therefore their size, can be changed up to a maximum of 250 * 250 pixels (and down to a minimum of 1). 

On load, the canvas displays grid lines. The visibility of these lines can be toggled by clicking the hide grid/show grid button above the canvas. When the canvas is set to have more than 100 * 100 pixels, the grid lines are hidden by default, and the hide grid / show grid button is disabled, until the grid dimension is changed again to something below 101. 

On desktop devices (targeted by looking at the user agent string, which is potentially buggy but mostly triggers the correct behavior for this use case), a switch appears atop the canvas. This switch allows the user to choose between 'click to draw' and 'hover to draw' mode. In 'click to draw' mode, a pixel will only change color if the user clicks on it. On mobile devices, 'click to draw' behavior is default and cannot be changed (since there is no 'mouseover' event), so the switch will remain hidden.  

[Source](https://github.com/Saranoya/odin/tree/master/javascript/etch_a_sketch) - [View in browser](https://saranoya.github.io/odin/javascript/etch_a_sketch/)

### Calculator

A simple calculator written in JavaScript. It allows for the addition, subtraction, multiplication and division of 2 numbers, including floating point and negative numbers. It cannot correctly apply order of operations in calculations involving more than 2 numbers, and/or more than 1 operator. Therefore, it displays an intermediary result each time the user clicks an operator. The code uses regular expressions on multiple occasions, both for input validation and in deciding what exactly to calculate. 

By default, the calculator is supposed to emulate the look of a 'real' calculator. But on devices with a screen width of less than 500 pixels (which includes most phones, but not most tablets), it will assume a flat design with room for larger buttons, to make them easier touch targets. This is accomplished using a media query. 

[Source](https://github.com/Saranoya/odin/tree/master/javascript/calculator) - [View in browser](https://saranoya.github.io/odin/javascript/calculator/)

### Pomodoro Timer

This web app implements a [Pomodoro Timer](https://en.wikipedia.org/wiki/Pomodoro_Technique), with customizable work and break lenghts, as well as a customizable number of Pomodoros to complete before a longer break.  

[Source](https://github.com/Saranoya/odin/tree/master/javascript/pomodoro) - [View in browser](https://saranoya.github.io/odin/javascript/pomodoro/)
