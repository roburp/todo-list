import Todo from "./todo.js";
import Project from "./project.js";
import { setupProjectDialogListeners, setupTodoDialogListeners } from "./event-listeners.js";

document.addEventListener("DOMContentLoaded", () => {
  setupProjectDialogListeners();
  setupTodoDialogListeners();
});
