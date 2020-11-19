def caesar_cipher(string, shift)
    abc = ("a".."z").to_a
    output = ""
    string.split('').each do |char|
        if char.downcase =~ /[a-z]/
            i = abc.index(char.downcase) + shift%26
            i >= 26 ? newChar = abc[i-26] : i < 0 ? newChar = abc[26-i] : newChar = abc[i]
            newchar = newchar.upcase if char.upcase == char
            output += newchar
        else
            output += char
        end
    end
    output
end
