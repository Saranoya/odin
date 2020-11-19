# What is this? 

I made this project while running through the [Web Development 101 course](https://www.theodinproject.com/courses/web-development-101) at [The Odin Project](https://www.theodinproject.com/), which I (still, and always will) highly recommend. The end result as it currently stands can be viewed [here](https://saranoya.github.io/odin/javascript/etch_a_sketch/). 

It is designed to be remeniscent of an [Etch-a-Sketch](https://en.wikipedia.org/wiki/Etch_A_Sketch), which I was surprised to learn is actually considered a somewhat serious drawing tool by some. People with the requisite skillset can do [amazing things](https://www.youtube.com/watch?v=vVA9wdiIlN4) with it. I've never been much of a visual artist myself, which is why I chose to christen my knock-off 'Botch-a-Sketch'. But I had fun developing this replica in my quest to learn JavaScript!

# What I learned

## HTML

### Definition lists

In the footer of the page, I use a [definition list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) to describe the function of all of the buttons. It was developed originally by Mozilla for Firefox, but has long since been adopted by all desktop and mobile browsers. 

```html
<dl>
	<dt>Grid height/width:</dt>
	<dd>
		Determines the size of the pixels. 
		The larger the height/width, the smaller the pixels.
	</dd>
	<dt>Clear:</dt>
	<dd>
		Clears the drawing area completely.
	</dd>
	...
</dl>
```

## CSS

### 3D effects

Botch-a-sketch initially had a 'flat' design. After I'd already finished it, I started exploring some of the other student solutions at [the Odin Project's assignment page](https://www.theodinproject.com/courses/web-development-101/lessons/etch-a-sketch-project) for this project. [An Nguyen's solution](https://ann-codes.github.io/top-etch-a-sketch/) prompted major 'remodelling' of my existing solution, including a re-arrangement of the various buttons to make it look more like a 'real' etch-a-sketch. so hat tip to you, for that An! By then, I was already working on [another project](https://saranoya.github.io/odin/javascript/calculator/), where I'd used inset box shadows for the calculator buttons, so it proved relatively easy to 'imitate' An.

### How to add a custom font to any website 

I found [this great Etch-a-Sketch font](https://www.dafont.com/etchasketch.font) from [JOEBOB Graphics](https://www.joebobgraphics.com) perfect for use in this project. It consists of characters that were actually drawn on an Etch-a-Sketch, and subsequently turned into a digital font. 

I followed [this tutorial on PageCloud](https://www.pagecloud.com/blog/how-to-add-custom-fonts-to-any-website) to add the font to my project, in such a way that any browser should be able to display it correctly (regardless of whether the user has the font installed). This required the use of the [WebFont Generator](https://www.fontsquirrel.com/tools/webfont-generator) at FontSquirrel. In CSS, it is used as follows: 

```css
@font-face {
    font-family: 'etchasketch';
    src: url('../fonts/etch_a_sketch/etchaske-webfont.woff2') format('woff2'),
         url('../fonts/etch_a_sketch/etchaske-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: 'etchasketch';
}
```
 

 ### Flexible divs

 I first tried to implement the grid as a table. This did not work well (especially with the grid lines set to 'visible'), because it required imprecise pixel math that pushed some incarnations of the table outside of their boundary. The current implementation takes advantage of the CSS `repeat()` [function](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat), which allows for more precise height and width calculations left entirely to the computer: 

```css
#canvas {
    display: grid;
    grid-template-rows: repeat(var(--grid-dimension), 1fr);
    grid-template-columns: repeat(var(--grid-dimension), 1fr);
    background: rgb(190, 190, 190);
    width: 480px;
    height: 480px;
    margin: auto;
}
```

### 'Mobile first' responsive design is not easy!

I went looking for a way to have the square resize itself with the page responsively. Using the same percentage for both height and width does not work, because the screen/viewport itself is almost never square. In my quest to find a solution to this problem, I bumped into [this blog post](https://spin.atomicobject.com/2015/07/14/css-responsive-square/), which uses the pseudo-element `:after` to force a `div` to remain square at all times. I was unable to get that working under all circumstances, so I ended up going with [media quries](https://www.w3schools.com/css/css_rwd_mediaqueries.asp) to change the fixed canvas height and width based on current screen pixel resolution.  w

It was a fruitful exercise, but not of great utility on this particular project, since (as I discovered only when my project was already on Github Pages), apparently iOS has no use for events like `mouseover` and `mousemoved`. As such,the current version of this project is somewhat crippled on mobile devices. It works (sort of), but allows only pixel-by-pixel tapping to draw.  

There's also a problem with the color picker, which doesn't respect the maximum width when open. 



## JavaScript

### How to change a CSS variable with JavaScript

If I wanted to use the CSS repeat() function to calculate the height and width of the divs that form my grid, then I had to be able to adjust the number of columns and rows in the grid-template based on user input. [This article](https://css-tricks.com/updating-a-css-variable-with-javascript/) on how to dynamically change a CSS variable using JavaScript got me there: 

```css
:root {
    --grid-dimension: 1;
}

#canvas {
    display: grid;
    grid-template-rows: repeat(var(--grid-dimension), 1fr);
    grid-template-columns: repeat(var(--grid-dimension), 1fr);
    background: rgb(190, 190, 190);
    width: 480px;
    height: 480px;
    margin: auto;
}
```

```javascript
const root = document.documentElement;
const canvas = document.getElementById('canvas');

function generateGrid(dimension) {
    warning.textContent = ' ';
    if (dimension > 0 && dimension <= 100) {
        canvas.innerHTML = '';
        root.style.setProperty('--grid-dimension', dimension);
        for (i = 0; i < dimension * dimension; i++) {
            let div = document.createElement('div');
            canvas.appendChild(div);
            div.addEventListener('mouseover', fillSquare);
            div.addEventListener('mouseup', erase);
            div.addEventListener('mousemove', erase);
        }
        hidegrid.value = 'Hide grid';
    } else {
       warning.textContent = 'Pick a value between 2 and 100';
    }
}
```