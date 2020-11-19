def substrings(string, dictionary)
    output = Hash.new
    words = string.gsub(/[^0-9a-z ]/i, '').downcase.split(' ')
    substrings = []
    words.each do |word|
        for start_at in 0...word.length
            for length in 1..(word.length - start_at)
                substrings << word[start_at, length]
            end
        end
    end
    dictionary.each do |entry|
        substrings.each do |substring|
            if substring == entry && !output.key?(entry)
                output[entry] = 1
            elsif substring == entry
                output[entry] = output[entry] + 1
            end
        end
    end
    output
end
