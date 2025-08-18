import App from "./app.js";
import { renderProjects, renderTodos } from "./render.js";
import { setupNewProjectListeners, setupNewTodoListeners, setupUpdateTodoItemListener } from "./event-listeners.js";
import { loadProjects } from "./storage.js";
import "./styles.css";

const app = new App();
app.projects = loadProjects();

// TEST
// app.addProject("Sample Project");
// app.setActiveProject(app.getProjects()[0].id);
// app.addTodo({
//   title: "Test Todo",
//   description: "Just testing",
//   dueDate: new Date().toISOString(),
//   priority: "medium",
// });
// END TEST

//load event listeners
document.addEventListener("DOMContentLoaded", () => {
  // initial render
  renderProjects(app);
  renderTodos(app);

  // set up event listeners
  setupNewProjectListeners(app);
  setupNewTodoListeners(app);
  setupUpdateTodoItemListener(app);
});
