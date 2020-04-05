const body = document.querySelector('body');

const btn = document.querySelector('button');

let isPurple = false;

btn.addEventListener('click', () => {
    if (isPurple) {
        body.style.backgroundColor = 'white';
        isPurple = false;
    } else {
        body.style.backgroundColor = 'purple';
        isPurple = true;
    }
});