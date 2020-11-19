# What is this? 

I developed this command-line game while going through the [Ruby Programming course](https://www.theodinproject.com/courses/ruby-programming/lessons/oop) at at [The Odin Project](https://www.theodinproject.com/). It is a traditional [Tic Tac Toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game, in which two players play on a 3 by 3 board, each trying to be the first to get 3 of their symbols in a (vertical, horizontal or diagonal) row. If you simply type 'Tic Tac Toe' into Google, you'll be able to play a game of Tic Tac Toe right there on the search results page, to get a feel for how it goes. Or you can go straight to trying out my version on [Repl.it](). 

# New things I learned

## Object-Oriented Programming


In the Odin Project's [course on Ruby Programming](https://www.theodinproject.com/courses/ruby-programming), this project is included as a first foray for students into [Object-Oriented Programming in Ruby](https://launchschool.com/books/oo_ruby/read/introduction). And so, dutifully, while working on this project, I tried to go the OOP way.

### Classes and Inheritance

I implemented my game as a collection of classes, making use of [inheritance](http://www.eriktrautman.com/posts/ruby-explained-inheritance-and-scope) when I thought it was appropriate: 

```ruby
class Player
class Human < Player
class AI < Player
class Novice < AI
class Intermediate < AI
class Expert < AI
class Board
class Game
```

### Getters, setters and accessors

In the initial version, all of these classes included laboriously typed-out [getter and setter methods](https://dev.to/k_penguin_sato/ruby-getters-and-setters-1p30). But then I wised up and learned to use `attr_reader`, `attr_writer` and (most often) `attr_accessor`: 

```ruby
class Board
    attr_accessor :height, :width, :winning
    def initialize(height=3, width=3, winning=3)
        self.height = height
        self.width = width
        self.winning = winning
        @board = []
        for i in 0...self.height
            row = []
            for j in 1..self.width
                row << j + i*self.width
            end
            @board << row
        end
    end
    ...
end
```

## An adjustable-size board is ... possible, but boring?

When first researching how the game should work, I came across the following on the aforementioned [Wikipedia page](https://en.wikipedia.org/wiki/Tic-tac-toe):

> The game can be generalized into an m,n,k-game, in which two players alternate placing stones of their own color on an m×n board, with the goal of getting k of their own color in a row.

I implemented a version of the game that did exactly that: although, by default, it was played on a 3 by 3 board, it could also be played on an adjustable-size board (height and width did not necessarily have to be the same), where the player(s) got to decide how many symbols in a row it would take to win. 

I ultimately scrapped this feature when fellow Odinite [Javier Arias F.](https://github.com/jfariasf), who was working on [a JavaScript version of Tic Tac Toe](https://jfariasf.github.io/TOP-tictactoe/) at the time, pointed out to me that implementing Tic Tac Toe as a game that can be played on a board of any size not only makes for unnecassarily complex logic in the AI's `move` method; it also makes for boring and long-winded games that are (too) easy to win. In principle, however, this game remains ready to be played on a board of any size.

### Iinitialize method with default parameters

One of the things that makes this possible is that the Board's `initialize` method has [default values](https://medium.com/podiihq/ruby-parameters-c178fdcd1f4e) for its three parameters: 

```ruby
class Board
    attr_accessor :height, :width, :winning
    def initialize(height=3, width=3, winning=3)
        self.height = height
        self.width = width
        self.winning = winning
        ...
    end
    ...
end
```

As such, it will construct a 3x3 board where it takes 3 in a row to win unless otherwise instructed, but it *can* accept other values, and for the most part, it will still work with those. 

### (Mostly) dimension-independent methods

Another thing that helps this game be playable (in principle) on a board of any size, is that Board's `draw` and `has_winner` methods are implemented such that they still work on a larger board, with the caveat that `has_winner` only checks 2 diagonals: from the top left to the bottom right corner, and from the top right to the bottom left corner. This means diagonal wins on boards that aren't square will not be counted. So in practice, the current version of this code is really only useable for playing Tic Tac Toe on square boards.   


## A 'perfect' AI ... or not

My first implementation of the `move` method on the `AI < Player` class was extremely dumb: on each turn, it would pick a random empty square and place its mark there. In a subsequent version, I set out to implement a 'perfect' AI, using the strategy [described on Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy).  

However, when playing against an opponent who doesn't make mistakes, Tic Tac Toe is an unwinnable game. The best strategy then is to avoid losing, which means the game will always (at best) end in a draw. I figured human players might prefer to play a game they can actually win. Therefore, in the current version of this game, players who elect to play against the computer can pick a 'novice' opponent or an 'intermediate' opponent. I used [Stephen Ostermiller's](https://blog.ostermiller.org/tic-tac-toe-strategy) definitions of these terms, when implementing their repective `move` methods:

* The **novice** picks an empty square at random. Its `move` method is identical to the original implementation of that method.  
* The **intermediate player** will block its opponent when the opponent is poised to make a winning move, but otherwise pick an empty square at random.
* The **expert** will win or tie every time, depending on the moves the opponent makes, but it can never lose.       

https://jfariasf.github.io/TOP-tictactoe/ -> Tyrael JS Tic Tac Toe
