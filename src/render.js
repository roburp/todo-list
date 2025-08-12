import { setupProjectItemListeners, setupTodoItemListeners } from "./event-listeners.js";

const projectList = document.querySelector("#project-list");
const todoList = document.querySelector("#todo-list");
const projectTitle = document.querySelector("#project-title");

export function renderProjects(app) {
  projectList.innerHTML = "";
  app.getProjects().forEach((project) => {
    const li = document.createElement("li");
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

    if (project.id === app.getActiveProjectId()) {
      li.classList.add("selected");
    }

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
    li.dataset.todoId = todo.id; //data-todo-id
    const todoTitle = document.createElement("p");
    const todoDescription = document.createElement("p");
    const todoDueDate = document.createElement("p");
    const todoPriority = document.createElement("p");
    const todoUpdateBtn = document.createElement("button");
    const todoDeleteBtn = document.createElement("button");
    const todoCompletedBtn = document.createElement("button");

    todoTitle.classList.add("todo-title");
    todoDescription.classList.add("todo-description");
    todoDueDate.classList.add("todo-due-date");
    todoPriority.classList.add("todo-priority");
    todoUpdateBtn.classList.add("todo-update");
    todoDeleteBtn.classList.add("todo-delete");
    todoCompletedBtn.classList.add("todo-completed");

    todoTitle.textContent = todo.title;
    todoDescription.textContent = todo.description;

    todoDueDate.textContent = todo.dueDate.toLocaleDateString();
    todoDueDate.dataset.date = todo.dueDate.toISOString().split("T")[0]; // YYYY-MM-DD

    todoPriority.textContent = todo.priority;
    todoUpdateBtn.textContent = "✏️";
    todoDeleteBtn.textContent = "❌";
    todoCompletedBtn.textContent = todo.completed ? "Completed" : "Not Completed"; //✅

    li.append(todoTitle, todoDescription, todoDueDate, todoPriority, todoUpdateBtn, todoDeleteBtn, todoCompletedBtn);

    todoList.appendChild(li);
    setupTodoItemListeners(li, app);

    // this.id = Date.now().toString();
    //check this.title = title;
    // this.description = description;
    // this.priority = priority; //low, medium, high
    // this.createdAt = new Date();
    // this.dueDate = new Date(dueDate);
    // this.completed = completed;
  });
}
