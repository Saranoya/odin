def translate(s)
    output = []
    s.split do |word|
        capitalized = word == word.capitalize
        w = word.sub(/^(\W*)([^aeiou]*qu*|[^aeiou]*)([\w']*)(\W*)$/i, '\1\3\2' + 'ay' + '\4')
        capitalized ? output << w.downcase.capitalize : output << w
    end
    output.join(" ")
end