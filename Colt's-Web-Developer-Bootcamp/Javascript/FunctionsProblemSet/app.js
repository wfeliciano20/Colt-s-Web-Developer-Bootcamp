function isEven(num) {
    return num % 2 === 0;
}

console.log("isEven(4):" + isEven(4));
console.log("isEven(21):" + isEven(21));
console.log("isEven(68):" + isEven(68));
console.log("isEven(333):" + isEven(333));

function factorial(num) {
    if (num === 0) {
        return 1;
    }
    let result = num;
    for (let i = num - 1; i > 1; i--) {
        result *= i;
    }
    return result;
}

console.log("5!=" + factorial(5));
console.log("2!=" + factorial(2));
console.log("10!=" + factorial(10));
console.log("0!=" + factorial(0));


function kebabToSnake(str) {
    let newStr = str.replace(/-/g, "_");
    return newStr;
}

console.log(kebabToSnake("helllo-world"));