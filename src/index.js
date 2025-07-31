import App from "./app.js";
import Todo from "./todo.js";
import Project from "./project.js";
import { renderProjects, renderTodos } from "./render.js";
import { setupProjectDialogListeners, setupTodoDialogListeners } from "./event-listeners.js";

const app = new App();

// TEST
app.addProject("Sample Project");
app.setActiveProject(app.getProjects()[0].id);
app.addTodo({
  title: "Test Todo",
  description: "Just testing",
  dueDate: new Date().toISOString(),
  priority: "medium",
});
// END TEST

// Render initially
renderProjects(app);
renderTodos(app);

//load event listeners
document.addEventListener("DOMContentLoaded", () => {
  setupProjectDialogListeners(app);
  setupTodoDialogListeners(app);
});
