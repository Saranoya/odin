const reverseString = function(string) {
    let output = [];
    for(i = 0; i < string.length; i++) {
        output[string.length-1-i] = string[i];
    }
    return output.join('');
}
