# What is this?
I built this page while running through the 'Web Development 101' course at [The Odin Project](https://www.theodinproject.com/courses/web-development-101/lessons/html-css), which I highly recommend. The end result as it currently stands can be viewed [here](https://saranoya.github.io/odin/html_css/google/homepage/). 

It is meant to be an (almost) exact visual copy of the Google Homepage, as viewed in a desktop browser from Belgium. And yes, that last bit is actually important. If you want to see how different the Google homepage (and especially its search results) can look when viewed from different countries, I suggest you try [OpenVPN](https://openvpn.net/community/). 

I already had a basic, if severely outdated understanding of both HTML and CSS when I embarked on this project. I still learned quite a few new things.

## What I learned while working on this project

### HTML

* How to apply [HTML 5 semantic elements](https://www.w3schools.com/html/html5_semantic_elements.asp) such as main, header, footer, nav. 
* How to [make a favicon appear](https://stackoverflow.com/questions/4888377/how-to-add-a-browser-tab-icon-favicon-for-a-website/35625707) in the page's title tab:

	```html
	<head>
  		...
  		<link rel="shortcut icon" type="image/x-icon" href="./images/favicon.ico" />
  		<title>Google by Saranoya</title>
	</head>
	``` 
* How to convert an image to `.ico` format: <https://icoconvert.com/> allows editing (i.e., add a border or a round badge in the background) before conversion.
* How to put the [focus on a textfield](https://www.w3schools.com/tags/att_input_autofocus.asp) when the page first loads: 

	```html
	<input type="text" autofocus />
	```

### CSS

* What [CSS resets](https://bitsofco.de/a-look-at-css-resets-in-2018/) are, and what [normalize.css](https://necolas.github.io/normalize.css/) does.
* How to [center elements on the page](https://css-tricks.com/centering-css-complete-guide/) in all directions and under all circumstances. For this page, only horizontal centering (which I actually already knew how to do) was relevant: 
	
	```css
	main, #logo, #search, #languages {
    	display: block;
    	margin: 0 auto;
    	text-align: center;
	}
	```
* How to [make the footer stick](https://css-tricks.com/couple-takes-sticky-footer/) to the bottom of the page. There are many possible methods, but here's the one used on this project:

	```css
	#footer-top {
    	position: fixed;
    	bottom: 41px;
	}
	
	#footer-bottom {
    	position: fixed;
    	bottom: 0;
	}
	
	```
* How to correctly use [float, clear and overflow](https://www.w3schools.com/Css/css_float.asp) to create horizontal lists of elements. 
* How to render a form field (the search box) with [rounded corners](www.askdavetaylor.com/round-edges-text-input-element-web-form/) and [shadow effects](https://www.w3schools.com/css/css3_shadows.asp) on focus and/or hover: 

	```css
	#search .textfield {
    	border: 1px solid rgb(212, 212, 212);
    	border-radius: 34px;
    	-moz-border-radius: 34px;
    	-webkit-border-radius: 34px;
    	height: 34px;
    	padding: 10px 20px;
	}
	
	search .textfield:focus, #search .textflield:hover {
		border: none;
		outline: none;
    	-webkit-box-shadow: 1px 1px 5px 0px rgba(100,100,100,0.75);
    	-moz-box-shadow: 1px 1px 5px 0px rgba(100,100,100,0.75);
    	box-shadow: 1px 1px 5px 0px rgba(100,100,100,0.75);
	}
	
	```
	
* In the process of figuring out the above, I discovered [CSSMatic](https://cssmatic.com), which allows WYSIWYG creation and live previewing of **gradient**, **border-radius**, **noise texture** and **box shadow** effects.

### Git

* How to install git (this step wasn't difficult: MacOS comes bundled with ot), and use `git init, git add, git commit -m` from the terminal on my local machine.
* How to create a new repository and clone my local git repository to it on [Github](https://help.github.com/en/articles/adding-an-existing-project-to-github-using-the-command-line). 
* How to make the rendered output of my code visible to outsiders using [Github Pages](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages).

### VSCode

* How to leverage [code completion](https://code.visualstudio.com/docs/languages/html) (including but not limited to [Emmet](https://docs.emmet.io)) for speedy basic HTML page creation. 
* How to install, manage and use [new extensions](https://code.visualstudio.com/docs/editor/extension-gallery).
* How to [use git and push to Github](https://code.visualstudio.com/docs/editor/versioncontrol) from VSCode.

###UNIX command line

Delete [all files with a given filename from all subdirectories](https://superuser.com/questions/112078/delete-matching-files-in-all-subdirectories) (useful for removing .DS_Store files before pushing to Github):

```bash
find . -name '.DS_Store' -type f -delete
```
### Markdown

* Basic [Markdown syntax](https://daringfireball.net/projects/markdown/syntax), as conceived of by Markdown's original creator [John Gruber](https://en.wikipedia.org/wiki/John_Gruber) and subsequently [extended](https://www.markdownguide.org/extended-syntax/), in order to write this README. 
* How to use [Homebrew Cask](https://github.com/Homebrew/homebrew-cask) to install the lovely open-source [Macdown](https://macdown.uranusjr.com) Markdown editor from the command line.

## Known Issues

Links and buttons don't work on this page, That's actually a feature, or at least it's meant as one: I hope it will aid in preventing people from confusing this page with the real Google when they have both open at the same time. There are, however, also a few visual details that aren't quite right about this copy:

* __The look of the search buttons when hovered over and/or in focus__: It seems like Google puts a subtle gradient on these buttons when hovered over, but I can't quite figure out the right values for it, so I've left it off. There's also a drop shadow on my buttons (on hover) that isn't quite right when compared to 'the real deal'. Perhaps I'll change it some day, but probably not. This was just an exercise, after all. 
* __Right padding on the right half of the bottom navigation bar__: I implemented the bottom navigation bar using two inner divs within the bottom half of the footer. Both of them float left. They both have a width of 49%, which results in a somewhat uncontrollable amount of whitespace at the right edge of the page. This could be solved by using CSS-grid or Flexbox for positioning, but those apparently aren't supported in all browsers.
 