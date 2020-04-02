const colors = ['red', 'orange', 'yellow'];
colors.push('green');

console.log(colors);

//You can copy an entire array with slice
const colors2 = colors.slice();

console.log(colors2);

const numbers = [22, 67, 33, 96, 88];

console.log(numbers[numbers.length]);

// TODO LIST

const todos = [];

var input = prompt("What would you like to do?");



while (input !== 'quit') {
    if (input === 'list') {
        console.log(todos);
    } else if (input === 'new') {
        const newTodo = prompt('Enter new todo');
        todos.push(newTodo);
    }

    input = prompt("What would you like to do?");
}

console.log("Ok, you quit the app");