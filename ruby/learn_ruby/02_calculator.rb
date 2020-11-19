#write your code here
def add(num1, num2)
    num1+num2
end

def subtract(num1, num2)
    num1-num2
end

def sum(array)
    sum = 0
    array.each { |el| sum += el }
    sum
end

def multiply(num, *args)
    args.each { |el| num *= el }
    num
end

def power(base, exponent)
    output = base
    (exponent-1).times do
        output = output*base
    end
    output
end

def factorial(n)
    n == 0 ? output = 1 : output = n*factorial(n-1)
end