const caesar = function(string, shift) {
    const abc = [   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' 
                ];
    let output = '';
    for (char of string.split('')) {
        if (/[a-z]/.test(char.toLowerCase())) {
            let newChar = '';
            let newIndex = abc.findIndex((el) => el == char.toLowerCase()) + shift%26;
            newIndex >= 26 ? newChar = abc[newIndex-26] 
                : newIndex < 0 ? newChar = abc[26+newIndex] 
                : newChar = abc[newIndex];
            if (char.toUpperCase() == char) { newChar = newChar.toUpperCase(); }
            output += newChar;
        } else { output += char; }
    }
    return output;
}
