# What is this? 

I developed this Pomodoro widget while running through the [Web Development 101 course](https://www.theodinproject.com/courses/web-development-101/lessons/pairing-project) at The Odin Project. I wholeheartedly recommend this free curriculum to anyone wanting to get into web development. 

The end result as it currently stands can be viewed [here](https://saranoya.github.io/odin/javascript/pomodoro/). 

# What I *did not* learn

This project is included in the Odin curriculum not (primarily) because it is expected to teach any significant new HTML / CSS / JavaScript skills or concepts after the [rock, paper, scissors](https://github.com/Saranoya/odin/tree/master/javascript/rock_paper_scissors/), [etch-a-sketch](https://github.com/Saranoya/odin/tree/master/javascript/etch_a_sketch/) and [calculator](https://github.com/Saranoya/odin/tree/master/javascript/calculator/) projects, but rather as an exercise in [pair programming](https://www.agilealliance.org/glossary/pairing/#q=~(infinite~false~filters~(postType~(~'page~'post~'aa_book~'aa_event_session~'aa_experience_report~'aa_glossary~'aa_research_paper~'aa_video)~tags~(~'pair*20programming))~searchTerm~'~sort~false~sortDirection~'asc~page~1)). 

I did originally start this project with partner Martin Kruger (check out his work [here](https://github.com/martink-rsa)), but a major health crisis on my part derailed our collaboration early on. Only months later did I pick this little project up again, pretty much starting from scratch, with a new visual design and an empty script file. I completed it on my own, thereby foregoing any lessons I could have learned regarding pair programming.  

In the short time that I did work with Martin, however, I did learn some things about myself that I didn't like very much. I apparently have difficulty communicating programming logic that is perfectly clear in my head to people who are not me. One important takeaway from this is that if I ever really want to be a programmer professionally, I'm going to have to find ways to communicate better. 

# New things I learned

## HTML

### The importance of buttons for accessibility

In previous projects, I sometimes used a `div` styled as a button, to essentially perform all of the functions buttons were invented for, albeit without the 'hassle' of having to remove the browser's standard styling before applying my own look to it. 

In the course of working on this project, I discovered [why buttons are important](http://rachievee.com/use-button-element-improve-accessibility/). Among other things, they:

1. Make a website keyboard-navigable 
2. Automatically change appearance when in focus, even without a mouse pointer anywhere nearby
3. Have their `value`attribute read by screen readers automatically

I don't much like the standard 'in-focus' styling buttons get in most browsers, but there are solutions for that, too (see below). 

## CSS

### How to prevent text from being selected inadvertently when clicked / tapped

Since I use quite a few [unicode characters](https://developer.spotify.com/documentation/web-api/quick-start/) in all of my projects (I do this mostly in an effort to avoid the use of potentially copyrighted icons, and so that [I will not have to design my own](https://tutorialzine.com/2014/12/you-dont-need-icons-here-are-100-unicode-symbols-that-you-can-use), I often end up with user interface elements that, by default, are selectable as text. 

In the desktop browser version of this project in particular, that was somewhat uniquely annoying, since it completely breaks the already somewhat fragile illusion that the user is setting the timer on a smartwatch. I made the whole smartwatch container's contents, as well as the settings button in the toping th left corner of the screen, non-selectable using the following CSS snippet: 

```css
.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
```

### How to use the `:focus` pseudoclass to preserve accessibility after removing the browser's standard in-focus styling 

For esthetic reasons, I wanted to remove the 'ugly' standard dark-blue border most browsers use to indicate a button (or any other form element, really) is in focus. I did not, however, want to lose keyboard navigability. The solution was to use the `:focus` pseudo-class to apply my own styles to buttons that get focus (I gave them a lighter background color than a button with no focus): 

```css
input[type=button]:focus { 
    outline:0 !important; 
    background-color: rgb(140, 180, 250);
}
```

## JavaScript

### Drawing various arcs and text on a canvas element

At first, I toyed with the idea of manually creating a bunch of images of the circular 'elapsed time' indicator in various stages of completion, and then dynamically swapping the images as the timer ran down. I realized quickly that this would not work reliably once I allowed the user to customize the length of work- and breaktimes. Not to mention, it would have implied hours wasted on boring image editing work.  

I needed a way to draw (fractions of) circles dynamically, and I found it in the combination of the [HTML canvas element](https://www.w3schools.com/html/html5_canvas.asp), and various [JavaScript methods to draw on a canvas](https://eloquentjavascript.net/17_canvas.html) (this is a link to chapter 17 of [Marijn Haverbeke's Eloquent JavaScript](https://eloquentjavascript.net/), which I have so far found invaluable in learning front-end web development). I also borrowed heavily from [W3School's canvas clock tutorial](https://www.w3schools.com/graphics/canvas_clock.asp) in the process of making my circular timer work, and [this Medium article from Zak Frisch](https://medium.com/@zfrisch/understanding-start-and-end-angles-487dabe1d9ce) was instrumental in helping me understand the proper start and end angles to use. 

In its entirety, the logic that redraws the canvas once every second looks like this:

```javascript
let canvas = document.getElementById('canvas').getContext('2d');

...

function redraw() {
    canvas.clearRect(0, 0, 250, 250);
    // full circle
    canvas.beginPath();
    canvas.arc(125, 125, 100, 0, (2*Math.PI));
    canvas.strokeStyle = 'black';
    canvas.lineWidth = '10';
    canvas.stroke();
    // timer text
    canvas.font = '4em Helvetica Neue';
    canvas.strokeStyle = 'white';
    canvas.lineWidth = '1'; 
    canvas.strokeText(secToTimer(currentTime), 50, 150, 200);
    // loading circle
    canvas.beginPath();
    canvas.arc(125, 125, 100, 1.5*Math.PI, (3.5-(2/timerValues[currentTimer])*currentTime)*Math.PI);
    canvas.strokeStyle = spinner_colors[currentTimer];
    canvas.lineWidth = '10';
    canvas.stroke();
}
``` 

### The proper use of `setTimeout()` to create a countdown timer

I lost quite a bit of time on this one. At first, I was convinced I needed the combination of a `while` loop and the `setTimeout()` function. However, `setTimeout()` in JavaScript does not halt the execution of the rest of the code during the timeout. I eventually figured out how to do it properly using `setInterval()`, with a bit of help and borrowed code from the aforementioned W3Schools clock tutorial: 

```javascript
function countDown() {
    let interval = setInterval(() => {
        currentTime--;  
        redraw();    
        if (currentTime == 0) { 
            clearInterval(interval);
            switchTimer(); 
        } else if (!timeRunning) { clearInterval(interval); }
    }, 1000);
}
```

This countdown function is started by a click on the start button, and paused by the pause button. 

### Playing sounds using JavaScript

This one turned out to be easier than I thought it would be. My implementation involves a bit of HTML5, and a tiny bit of JavaScript. In the HTML:

```html
<audio id="back-to-work-alarm" preload="auto">
    <source src="./sounds/back_to_work.wav" type="audio/wav">
</audio>
<audio id="break-alarm" preload="auto">
    <source src="./sounds/long_break.wav" type="audio/wav">
</audio>
```

These tags are hidden by default. They don't render any visible controls to the screen unless I tell them to, which is exactly what I wanted for this project. Once embedded in the HTML, they can be called easily from JavaScript as such: 

```javascript
const backToWorkAlarm = document.getElementById('back-to-work-alarm'); 
backToWorkAlarm.play();
```

Wes Bos' [vanilla JavaScript drumkit tutorial](https://www.youtube.com/watch?v=VuN8qwZoego) pointed me in the right direction. 

There is a feature in Safari that will prevent this implementation from working unless the user has explicitly enabled autoplay, though. 

# Ideas for the future

Find a way to make the app work in Safari without forcing the user to change their default settings. 

Populate the select boxes dynamically.  

Add more sound effects, so the user can choose what the various alarms will sound like, and perhaps also assign different alarm sounds to the start of long vs. short breaks. 

[Spotify integration](https://developer.spotify.com/documentation/web-api/) to let the user select playlists to use during work- and breaktimes. 
