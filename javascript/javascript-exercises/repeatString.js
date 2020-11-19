function repeatString(string, numRepeats) {
    let output = '';
    if (numRepeats < 0) {
        output = 'ERROR';
    } else {
        for (i=0; i<numRepeats; i++) {
            output += string;
        }
    }
    return output;
}
