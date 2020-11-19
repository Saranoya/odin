const sumAll = function(num1, num2) {
    let result = 0;
    if (Number.isInteger(num1) && Number.isInteger(num2) && num1 >= 0 && num2 >= 0) {
        let lowerBound = num1, upperBound = num2;
        if (num1 > num2) { lowerBound = num2; upperBound = num1; }
        let sum = lowerBound;
        for (currentNumber = lowerBound+1; currentNumber<=upperBound; currentNumber++) {
            sum += currentNumber;
        }
        result += sum;
        parseInt(result);
    } else {
        result = 'ERROR';
    } 
    return result;
}
