const fibonacci = function(member) {
    let inputParsed = parseInt(member), output = 'OOPS', previous = 1, current = 1;
    if (inputParsed != NaN && inputParsed > 2) {
        for (i = 3; i <= inputParsed; i++) { output = previous + current; previous = current; current = output; }
    } else if (inputParsed > 0) { output = 1; }
    return output;
}
