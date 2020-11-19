require 'colorize'
require_relative 'run'

class Player
    attr_accessor :id, :symbol, :is_ai
    def initialize(id)
        self.is_ai = false
        self.id = id
        self.id == 0 ? self.symbol = "X" : self.symbol = "O"
    end
end

class Human < Player
    attr_accessor :name
    def initialize(id)
        super(id)
        print "\nPlayer #{id+1}, what's your name? "
        self.name = gets.chomp
        puts "Welcome, #{self.name}! You will use #{self.symbol} as your symbol.".light_black
    end

    def move(board)
        executed = false
        until executed
            puts "\nYour turn, #{self.name}!"
            print "Enter the number of the square where you would like to place your #{self.symbol} (1-#{board.height*board.width}): ".light_black
            input = gets.chomp.to_i
            until input > 0 && input <= board.height*board.width
                puts "That does not appear to be a valid choice!".red
                print "Enter a number between 1 and #{board.height*board.width}: ".light_black
                input = gets.chomp.to_i
            end
            multiplier = 1
            while multiplier*board.width < input
                multiplier += 1
            end
            row = multiplier-1
            input%board.width == 0 ? column = board.width-1 : column = (input%board.width)-1
            executed = board.set_cell(row, column, self.symbol)
            puts "That square is already filled!".red if !executed
        end
        board.draw
        board
    end
end

class AI < Player
    attr_accessor :name
    def initialize(id)
        super(id)
        self.is_ai = true
        self.name = "The AI"
        puts "#{self.name} will use #{self.symbol} as its symbol.".light_black
    end
end

class Novice < AI
    def move(board)
        executed = false
        until executed
            executed = board.set_cell(rand(0...board.height), rand(0...board.width), self.symbol) 
        end
        board.draw
        board
    end
end

class Intermediate < AI
    def move(board)
        executed = false
        until executed
            executed = board.set_cell(rand(0...board.height), rand(0...board.width), self.symbol) 
        end
        board.draw
        board
    end
end

class Intermediate < AI
    def move(board)
        executed = false
        until executed
            executed = board.set_cell(rand(0...board.height), rand(0...board.width), self.symbol) 
        end
        board.draw
        board
    end
end

class Board
    attr_accessor :height, :width, :winning, :filled
    def initialize(height=3, width=3, winning=3)
        self.height = height
        self.width = width
        self.winning = winning
        self.filled = 0
        @board = []
        for i in 0...self.height
            row = []
            for j in 1..self.width
                row << j + i*self.width
            end
            @board << row
        end
    end
    
    def get_cell(row, column)
        @board[row][column]
    end

    def set_cell(row, column, input)
        executed = false
        if get_cell(row, column).is_a? Integer
            @board[row][column] = input
            executed = true
            self.filled += 1
        end
        puts "Now #{self.filled} squares are filled."
        executed
    end

    def draw
        # max number of chars in a cell, +2 for left and right space
        cell_width = (self.height*self.width).to_s.length+2  
        print "\n"
        for i in 0...self.height do
            for j in 0...self.width do
                content = @board[i][j]
                print " X ".green if content == "X"
                print " O ".red if content == "O"
                print " #{content} " if content.is_a? Integer
                current_width = content.to_s.length+2
                while current_width < cell_width
                    print " " # append spaces as necessary, so all cells get same width 
                    current_width += 1
                end    
                print "|".light_black if j < @board[i].length - 1 # no right border on final column
            end 
            if i < self.height-1 # no bottom border on final row
                puts "\n"
                for i in 0...self.width do
                    cell_width.times { print "-".light_black} # print as many dashes as a cell is wide
                    print "+".light_black unless i == self.width - 1 # no + on final column
                end
                puts "\n"
            end
        end
        puts "\n\n"
    end

    def check_rows
        has_winner = false
        streak = 0
        column = 1
        row = 0
        until has_winner || row == self.height do
            while !has_winner && column < self.width do
                @board[row][column] == @board[row][column-1] ? streak += 1 : streak = 0
                has_winner = streak == self.winning-1
                column += 1
            end
            column = 0
            row += 1
        end
        has_winner
    end

    def check_columns
        has_winner = false
        streak = 0
        column = 0
        row = 1
        until has_winner || column == self.width do
            while !has_winner && row < self.height do
                @board[row][column] == @board[row-1][column] ? streak += 1 : streak = 0
                has_winner = streak == self.winning-1
                row += 1
            end
            row = 0
            column += 1
        end
        has_winner
    end

    def check_diagonal_lr
        has_winner = false
        streak = 0
        column = 1
        row = 1
        until has_winner || column == self.width || row == self.height do
            @board[row][column] == @board[row-1][column-1] ? streak += 1 : streak = 0
            has_winner = streak == self.winning-1
            row += 1
            column += 1
        end
        has_winner
    end

    def check_diagonal_rl
        has_winner = false
        streak = 0
        column = self.width-1
        row = 0
        until has_winner || column == 0 || row == self.height do
            @board[row][column] == @board[row+1][column-1] ? streak += 1 : streak = 0
            has_winner = streak == self.winning
            row += 1
            column -= 1
        end
        has_winner
    end

    def has_winner
        has_winner = check_rows
        has_winner = check_columns if !has_winner
        has_winner = check_diagonal_lr if !has_winner
        has_winner = check_diagonal_rl if !has_winner
        has_winner
    end
end 

class Game
    attr_accessor :board
    def initialize(player1, player2, board)
        @players = [player1, player2]
        @active_player = rand(0...@players.size)
        @board = board
        @board.draw
        puts "It takes #{self.board.winning} in a row to win on this board." unless self.board.width == 3 && self.board.height == 3
    end

    def play
        until self.board.has_winner || self.board.filled == self.board.height*self.board.width do
            @active_player == @players.length-1 ? @active_player = 0 : @active_player += 1
            self.board = @players[@active_player].move(self.board)
        end
        name = @players[@active_player].name
        if self.board.has_winner && @players[@active_player].is_ai
            puts name + " has won."
        elsif self.board.has_winner
            puts "You have won, #{name}. Congratulations!"
        else 
            puts "This game is a draw."
        end
        Menu.new 
    end
end

Menu.new