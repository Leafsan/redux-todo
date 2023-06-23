import { createStore } from "redux";

const form = document.querySelector("form");
const ul = document.querySelector("ul");

const input = document.getElementById("toDo");

const Action = {
  ADD: "ADD_TODO",
  DELETE: "DELETE_TODO",
};
Object.freeze(Action);

const addToDo = (text) => {
  return {
    type: Action.ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: Action.DELETE,
    id,
  };
};

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case Action.ADD:
      return [...state, { text: action.text, id: Date.now() }];
    case Action.DELETE:
      return state.filter((toDos) => toDos.id !== action.id);
    default:
      return;
  }
};

const store = createStore(reducer);

const paintToDos = () => {
  ul.innerHTML = "";
  const toDos = store.getState();
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
