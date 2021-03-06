function reverseString(string) {
    let output = [];
    for(i = 0; i < string.length; i++) { output[string.length-1-i] = string[i]; }
    return output.join('');
}

function palindromes(string) {
    let sanitizedString = string.toLowerCase().replace(/[ !,;:\.\?]/gi, '') // removes spaces and punctuation
    return sanitizedString == reverseString(sanitizedString);
}
