# What is this? 

I developed this simple calculator widget while running through the [Web Development 101 course]() at The Odin Project. I wholeheartedly recommend this free curriculum to anyone wanting to get into web development. 

The end result as it currently stands can be viewed [here](https://saranoya.github.io/odin/javascript/calculator/). 

# New things I learned

## CSS

### 3D box-shadow effects

[This tutorial](https://designmodo.com/3d-css3-button/) proved very useful in helping me design the '3D' look I gave the calculator buttons, as well as the calculator itself. [CSSMatic's box shadow generator](https://www.cssmatic.com/box-shadow) came in handy for WYSIWYG creation of the necessary CSS. I then went back and added the same kind of shadow effects to [Botch a Sketch](https://saranoya.github.io/odin/javascript/etch_a_sketch/). 

## JavaScript

### Dealing with whitespace in the DOM

See [this Stack Overflow question](https://stackoverflow.com/questions/20259742/why-am-i-getting-extra-text-nodes-as-child-nodes-of-root-node) or [this Mozilla article](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM) for pointers on how to avoid whitespace issues when iterating over a NodeList of elements that were *not* dynamically generated. The solution I picked, this time, ended up looking like this:

```html
<div id="buttons"
><input type="button" id="plusminus" value="&PlusMinus;"
><input type="button" id="clear" value="AC"
><input type="button" id="del" value="&larr;"
...
></div>
```

The formatting looks a little weird in hand-written HTML, but if it's not written this way, the output of `document.getElementById('buttons').childNodes` will contain `#text` nodes where there is whitespace between the elements. It then becomes more difficult to iterate over correctly.

### Regular Expressions

I made good use of [Regular Expressions and their associated methods](https://www.w3schools.com/jsref/jsref_obj_regexp.asp) for input processing in several places, perhaps most notably to isolate an operator from the input string: 

```javascript
const getOperator = () => numString.replace(/\-?[0-9\.]+([\+\-\*\/])\-?[0-9\.]+/g, '$1');
``` 

### Executing code after an interval

To make button clicks visible, I had to change the initial appearance of the button being clicked, and then (almost) immediately change it back. I could have done this by adding Event listeners for both the `mousedown` and the `mouseup` event to all buttons. But as it turns out, that approach doesn't work for users (like me) who have their laptop touchpad configured for 'tap to click'. So in the end, I went with this approach, which removes the class I just added after a 100 milisecond interval:

```javascript
function signalClick() { this.classList.add('noshadow'); setTimeout(() => this.classList.remove('noshadow'), 100); }
```
