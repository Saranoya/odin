def echo(s)
    s
end

def shout(s)
    s.upcase
end

def repeat(s, reps = 2)
    ([s] * reps).join(" ")
end

def start_of_word(word, length)
    word[0...length]
end

def first_word(s)
    s.split[0]
end

def titleize(s)
    output = s.split
    for i in 0...output.length do
        output[i] = output[i].capitalize if output[i].length > 4 || i == 0 || i == output.length-1
    end
    output.join(" ")
end
