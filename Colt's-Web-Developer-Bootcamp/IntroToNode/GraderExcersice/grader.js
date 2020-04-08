function average(arr) {
    let avg = 0;
    for (const element of arr) {
        avg += element;
    }
    avg = Math.round(avg / arr.length);
    return avg;
}

let scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores) + ' expected value:94')

let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2) + ' expected value:68')