import Todo from "./todo.js";
import Project from "./project.js";
import { setupProjectDialogListeners, setupTodoDialogListeners } from "./dialogListeners.js";

document.addEventListener("DOMContentLoaded", () => {
  setupProjectDialogListeners();
  setupTodoDialogListeners();
});
