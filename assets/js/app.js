// select the Element

const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");

// selecting class names of font-awesome we can toggle with when carrying out actions on the to-do list
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

console.log(axios);


const http = axios.create({
   baseURL: BASE_URL
});

async function fetchTodo(){
  try {
    const response = await http.get('/todo/all');
    return response.data.map((todo, index) => {
      return {
        id: index,
        docId: todo._id,
        name: todo.name,
        done: false,
        trash: false
      }
    });
  } catch (error) {
      console.log(error);
      return [];
  }
}


// declaring variables to add items to the list

let LIST, id = 0;


// ** getting items from localStorage **// 

let data = localStorage.getItem("TODO");

// to check if data is not empty 
// if(data){
//   LIST = JSON.parse(data);

//   id = list.length; //this sets the id to the last one in the list 
//   loadList(LIST) //load the list stored in local storage to the user interface.
// } else {
//   // if data is empty
//   LIST = [];
//   id = 0;
// }


fetchTodo().then((items) => {
  if(items.length) {
    loadList(items);
  }
  LIST = items;
})

// function designed to load items from local storage to the user interface


function loadList(array){
  array.forEach(function(item){
    addToDo(item.name,item.id,item.done,item.trash);
    id++;
  });
}

/**clearing items from the local storage */

clear.addEventListener("click",()=>{

  // this is to clear all inputted and save data already existent in data storage
  localStorage.clear();
  // this helps to refresh/reload the page when the refresh or clear icon is clicked on
  location.reload();
})
// to display today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);



// this is the logic for the function to add a todo  to the already existing list
function addToDo(todo, id, done, trash) {
  // this block of code indicates that if the element has been deleted the code below does not run.
  if (trash) {
    return;
  }

  // this block of code seeks to check if the item on the todo list is either done or undone

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `<li class="item">
  <i class=" fa ${DONE} co" job="complete" id=${id}></i>
<p class="text ${LINE}">${todo}</p>
<i class="fa fa-trash-o de" job ="delete" id=${id}></i>
</li>`;

  const position = "beforeEnd";
  // inserting adjacent html,this is to make elements added into the todo list to aggregate upon each other on addition
  list.insertAdjacentHTML(position, item);
}

// seeded data to test if our code to add a todo actually works
// addToDo("sleep on bed");
addToDo("play video games", 1, false, true);

// this is designed to add an event listener which triggers when we add an item to the list using the enter key
document.addEventListener("keyup", event => {
  if (event.keyCode == 13) {
    // the const todo is equivalent to the value that we get from the input field
    const toDo = input.value;

    // if a todo is added the addtodo function is triggered it will add the todo to the list
    if (toDo) {
      // if the input isnt empty
      console.log(toDo)
      http.post('/todo/create', {
        name: toDo
      }).then((response) => {
        if(response.status === 200) {
          addToDo(toDo, id, false, false);
            LIST.push({
              name: toDo,
              id: id,
              docId: response.data._id,
              done: false,
              trash: false,
            });
            id++;
        }

        
        // else handle errors here
      }).catch((error) => {
        // handle request sending error;
      })
      // add item to LocalStorage(this code must be added where the list array is updated)

      // localStorage.setItem("TODO", JSON.stringify(LIST));
    }
   
    // when empty
    input.value = "";
  }
});

// function designed to check if a particular todo is completed

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// to remove a to do
 
function removeToDo(element) {
    //display something to the user that a background operation is ongoing
    console.log(LIST, element);
    const todo = LIST[element.id];
    todo.trash = true;
    console.log('sending request to delete');
    http.delete(`/todo/delete/${todo.docId}`).then((response) => {
      element.parentNode.parentNode.removeChild(element.parentNode);
      //show a notification that todo has been deleted
      console.log(response);
    });
  };

// an event listener designed to target items created dynamically

list.addEventListener("click", event => {
  const element = event.target; //return the clicked element inside the list

  const elementJob = element.attributes.job.value; //this returns the custom set attributes in the items field i.e complete or delete and when set up a conditional that if the job is either complete or delete we use either the completeToDo or removeToDo functions respectively.

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // add item to LocalStorage(this code must be added where the list array is updated)

  localStorage.setItem("TODO", JSON.stringify(LIST));
});


