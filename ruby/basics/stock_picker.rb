def stock_picker(prices)
    best_days = [0, 0]
    best_profit = 0
    for i in 0...prices.length
        for j in i+1...prices.length
            if prices[j]-prices[i] > best_profit
                best_profit = prices[j]-prices[i]
                best_days = [i, j]
            end
        end
    end
    best_days
end
