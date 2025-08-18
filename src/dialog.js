import { formatDateForInput } from "./dateUtils.js";
// dialog helper function/s

let currentTodoId = null;

export function openUpdateTodoDialog(todo) {
  currentTodoId = todo.id;
  const dialog = document.querySelector("#todo-update-dialog");
  const form = document.querySelector("#todo-update-form");
  const { title, description, dueDate, priority } = form.elements;
  currentTodoId = todo.id;

  title.value = todo.title;
  description.value = todo.description || "";
  dueDate.value = formatDateForInput(todo.dueDate) || "";
  priority.value = todo.priority || "";

  dialog.showModal();
}
