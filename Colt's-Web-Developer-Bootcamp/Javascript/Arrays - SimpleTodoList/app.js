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
        listTodos();
    } else if (input === 'new') {
        addTodo();
    } else if (input === 'delete') {
        deleteTodo();
    }

    input = prompt("What would you like to do?");
}

console.log("Ok, you quit the app");

const listTodos = () => {
    console.log('************');
    let index = 0;
    for (const todo of todos) {
        console.log(index + ": " + todo);
        index++;
    }
    console.log('************');
};

const addTodo = () => {
    const newTodo = prompt('Enter new todo');
    todos.push(newTodo);
    console.log('Added todo');
};

const deleteTodo = () => {
    let indexToDelete = prompt("Enter index of todo to delete");
    todos.splice(indexToDelete, 1);
    console.log('Deleted todo');
};