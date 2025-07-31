import { setupProjectItemListeners } from "./event-listeners.js";

const projectList = document.querySelector("#project-list");
const todoList = document.querySelector("#todo-list");
const projectTitle = document.querySelector("#project-title");

export function renderProjects(app) {
  projectList.innerHTML = "";
  app.getProjects().forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.dataset.projectId = project.id; //data-project-id

    const name = document.createElement("span");
    name.textContent = project.name;
    name.classList.add("project-name");

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "✏️";
    renameBtn.classList.add("rename-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    li.append(name, renameBtn, deleteBtn);

    projectList.appendChild(li);
    setupProjectItemListeners(li, app);
  });

  const active = app.getActiveProject();
  if (active) {
    projectTitle.textContent = active.name;
  }
}

export function renderTodos(app) {
  todoList.innerHTML = "";
  const project = app.getActiveProject();
  const todos = app.getActiveTodos();

  if (!project) {
    projectTitle.textContent = "Select a Project";
    return;
  }

  projectTitle.textContent = project.name;

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title + (todo.completed ? " ✅" : "");
    todoList.appendChild(li);
  });
}
