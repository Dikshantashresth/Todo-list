let contain = document.getElementById('contain');
let btn = document.getElementById('insert');
let input = document.getElementById('todo-input');
let clear = document.getElementById('clear');
let quote = document.getElementById('quote');
let toggle = document.querySelector('.toggle');
let h1 = document.getElementById('title');

let flag = 0;

let counter = 0;
let todos = {
    todo: []
};
// Fetch anime data from 'anime.json'
async function fetchAnime() {
    try {
        let res = await fetch('anime.json');
        let data = await res.json();

        let rand = Math.floor(Math.random() * 121)
        quote.innerHTML = `"${data[rand].Quote}" - ${data[rand].Character}`;
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
}
fetchAnime(); // Call the function to fetch anime data
// Load tasks from localStorage on page load (if any)


if (localStorage.getItem('task')) {
    let storedTask = JSON.parse(localStorage.getItem('task'));
    todos = storedTask;
    counter = storedTask.todo.length; // Set counter based on the number of stored tasks

    // Render stored tasks
    renderTasks();
}

function addtask(val, id) {
    todos.todo.push({
        id: id,
        task: val,
    });
}

function insert() {
    if (input.value.trim() === "") {
        alert('Task cannot be empty!');
        return;
    }

    // Insert task
    addtask(input.value, counter);

    // Save in localStorage
    localStorage.setItem('task', JSON.stringify(todos));

    // Render the updated task list
    renderTasks();

    // Clear input field
    input.value = '';

    // Increment the counter for the next task
    counter++;
}

// Function to render the task list
function renderTasks() {
    contain.innerHTML = ''; // Clear the previous content

    todos.todo.forEach((e) => {
        contain.innerHTML += `<li><input class="checkbox" type="checkbox">${e.task} </li><button class="remo" onclick="remove(${e.id})">Remove</button>`;
    });
}

// Remove the item
function remove(pos) {
    todos.todo = todos.todo.filter((e) => e.id !== pos); // Keep tasks that don't match the given ID

    // Update localStorage after removing the task
    localStorage.setItem('task', JSON.stringify(todos));

    // Re-render the updated task list
    renderTasks();
}


toggle.onclick = ()=>{
    if(flag==0){
        document.body.style.backgroundColor = '#090909';
        contain.style.color = 'white'
        quote.style.color = 'white'
        flag = 1;
        
        toggle.textContent = 'light'
    }
    else{
        document.body.style.backgroundColor = 'white'
        contain.style.color ='black'
        flag = 0;
        h1.style.color = 'black'
        toggle.textContent = 'dark'
        toggle.style.backgroundColor = 'black'
        toggle.style.color = 'white';
        input.style.backgroundColor = 'black'
        input.style.color = 'white'
    
    }
}
// Add task when 'insert' button is clicked
btn.addEventListener('click', insert);

// Clear all tasks
clear.onclick = () => {
    contain.innerHTML = ''; // Clear displayed tasks
    localStorage.clear(); // Clear all localStorage
    todos.todo = []; // Clear the todo array
    counter = 0; // Reset counter
    fetchAnime();
};
