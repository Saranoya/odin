require_relative 'game'

class Menu
    def initialize
        @title = "welcome  to tic tac toe by saranoya".upcase
        print_player_options
    end

    def print_title
        @title.length.times { print "=".light_black }
        puts "\n" + @title.light_black
        @title.length.times { print "=".light_black }
        puts "\n\n"
    end

    def print_rules
        title = "tic tac toe: help".upcase
        title.length.times { print "=".light_black }
        puts "\n" + title.light_black
        title.length.times { print "=".light_black }
        puts "\n\n"
        puts "In Tic Tac Toe, 2 players take turns putting their symbol (X or O) on a 3 by 3 grid:"
        Board.new(3, 3, 3).draw 
        puts "\nPlayers can pick the square on which they wish to play by entering its number."
        puts "The game is won by the first player who gets a full horizontal, vertical or diagonal line of their symbols in a row."
        puts "These are all winning configurations: "
        board = Board.new
        board.set_cell(0, 0, "X")
        board.set_cell(1, 1, "X")
        board.set_cell(2, 2, "X")
        board.draw
        board = Board.new
        board.set_cell(0, 0, "O")
        board.set_cell(1, 0, "O")
        board.set_cell(2, 0, "O")
        board.draw
        board = Board.new
        board.set_cell(2, 2, "O")
        board.set_cell(2, 1, "O")
        board.set_cell(2, 0, "O")
        board.draw
        puts "The game can end in one of two ways:"
        puts "(1) One of the players gets enough of the same symbols in a row to win." 
        puts "(2) The board is full (this game will be a draw)."
        puts "\n"
        print "Hit ENTER to start a new game, or Q to quit: "
        input = gets.chomp.upcase
        until input =~ /^Q$/ || input =~ /^$/
            puts "That does not appear to be a valid option!".red
            print "What would you like to do? "
            input = gets.chomp.upcase
        end
        if input == ""
            print_player_options 
        else
            puts "Thanks for playing, goodbye!"
        end
    end

    def print_player_options
        self.print_title
        puts "(C) Play against the computer"
        puts "(F) Play against a friend"
        puts "\n"
        puts "(H) Get help: read the rules".light_black
        puts "(Q) Quit".light_black
        puts "\n"
        print "What would you like to do? "
        input = gets.chomp.upcase
        until input =~ /^[CFHQ]$/
            puts "That does not appear to be a valid option!".red
            print "What would you like to do? "
            input = gets.chomp.upcase
        end 
        self.parse_player_options(input)
    end

    def parse_player_options(input)
        case input
        when "C"
            @player1 = Novice.new(0)
            @player2 = Human.new(1)
            Game.new(@player1, @player2, Board.new).play
        when "F"
            @player1 = Human.new(0)
            @player2 = Human.new(1)
            Game.new(@player1, @player2, Board.new).play
        when "H"
            self.print_rules
        when "Q"
            puts "Thanks for playing, goodbye!"
        end
    end
end