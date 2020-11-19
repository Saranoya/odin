function add (num1, num2) { return num1+num2; }
function subtract (num1, num2) { return num1-num2; }

function sum (array) {
	let sum = 0;
	for (i=0; i<array.length; i++) {
		sum += array[i];
	}
	return sum; 	
}

function multiply (array) {
	let product = 1;
	for (i=0; i<array.length; i++) {
		product *= array[i];
	}
	return product;
}

function power(base, exponent) {
	let result = base;
	for (i=1; i<exponent; i++) {
		result *= base;
	}
	return result;
}

function factorial(number) {
	let factorial = 1;
	for (i=number; i > 1; i--) {
		factorial *= i;
	}
	return factorial;
}
