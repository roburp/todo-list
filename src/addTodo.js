//functionality when Add Todo button is pressed

export default function addTodo(todo) {
  const noteCardsContainer = document.querySelector(".note-cards-container");
  noteCardsContainer.appendChild(todo);
}

//fix todo variable
