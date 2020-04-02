const printReverse = (array) => {
    const lastIndex = array.length - 1;
    for (let i = lastIndex; i >= 0; i--) {
        console.log(array[i]);
    }
}

const isUniform = (array) => {
    const first = array[0];
    for (const element of array) {
        if (first !== element) {
            return false;
        }
    }
    return true;
}

const sumArray = (array) => {
    let sum = 0;
    for (const element of array) {
        sum += element;
    }
    return sum;
}

const max = (array) => {
    let max = array[0];
    for (const element of array) {
        if (max < element) {
            max = element;
        }
    }
    return max;
}

const letters = ['a', 'b', 'c'];
const nums = [1, 2, 3, 4];
const uni = [1, 1, 1, 1];
const notUni = [2, 2, 1, 1, 1];
const sum1 = [1, 2, 3];
const sum2 = [10, 3, 10, 4];


printReverse(letters);
printReverse(nums);

console.log(isUniform(uni));
console.log(isUniform(notUni));

console.log(sumArray(sum1));
console.log(sumArray(sum2));

console.log(max(sum1));
console.log(max(sum2));