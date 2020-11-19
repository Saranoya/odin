class Hangman
    def initialize
        @hangman = []
        @hangman << " ___________ "
        @hangman << " | /   |   | " 
        @hangman << " |/    O     "
        @hangman << " |    /|\\   "
        @hangman << " |   ( | )   "
        @hangman << " |    / \\   "
        @hangman << " |\\   \\ /  "
        @hangman << " | \\  ( )   " 
        @hangman << " |  \\       "
        @hangman << "============="
    end

    def draw(lines=@hangman.length)
        puts "\n"
        for i in 0...lines
            puts @hangman[i]
        end
        puts "\n"
    end
end

hank = Hangman.new.draw