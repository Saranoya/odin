def check_rows(board)
    has_winner = false, streak = 0, column = 1, row = 0, winning = 3
    until has_winner || row == board.length do
        while !has_winner && column < board[0].length do
            board[row][column] == board[row][column-1] ? streak += 1 : streak = 0
            has_winner = streak == winning-1
            column += 1
        end
        column = 0
        row += 1
    end
    has_winner
end

board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']]

check_rows(board)