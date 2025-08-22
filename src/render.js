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

    const menuGroup = document.createElement("div");
    menuGroup.classList.add("menu-group");

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "✏️";
    renameBtn.classList.add("rename-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    if (project.id === app.getActiveProjectId()) {
      li.classList.add("selected");
    }

    menuGroup.append(renameBtn, deleteBtn);
    li.append(name, menuGroup);

    projectList.append(li);
    setupProjectItemListeners(li, app);
  });

  const active = app.getActiveProject();
  if (active) {
    projectTitle.textContent = active.name;
  } else projectTitle.textContent = "Select a Project";
}

export function renderTodos(app) {
  todoList.innerHTML = "";
  const project = app.getActiveProject();
  const todos = app.getActiveTodos();
  const todoBtn = document.querySelector("#new-todo"); //Add Todo button

  if (!project) {
    projectTitle.textContent = "Select a Project";
    todoBtn.style.display = "none";
    return;
  }

  projectTitle.textContent = project.name;
  todoBtn.style.display = "inline-block";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.todoId = todo.id; //data-todo-id
    const todoTitle = document.createElement("p");
    const todoDescription = document.createElement("p");
    const todoDueDate = document.createElement("p");
    const todoPriority = document.createElement("p");
    const todoDeleteBtn = document.createElement("button");
    // const todoCompletedBtn = document.createElement("button");
    const todoCompletedBtn = document.createElement("input");

    todoTitle.classList.add("todo-title");
    todoDescription.classList.add("todo-description");
    todoDueDate.classList.add("todo-due-date");
    todoPriority.classList.add("todo-priority");
    todoDeleteBtn.classList.add("todo-delete");
    todoCompletedBtn.classList.add("todo-completed");

    todoTitle.textContent = todo.title;
    todoDescription.textContent = todo.description;

    const duePriority = document.createElement("div");
    duePriority.classList.add("due-priority");

    todoDueDate.textContent = "📅" + todo.dueDate.toLocaleDateString();
    todoDueDate.dataset.date = todo.dueDate.toISOString().split("T")[0]; // YYYY-MM-DD
    todoPriority.textContent = todo.priority;
    duePriority.append(todoDueDate, todoPriority);

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");
    todoDeleteBtn.textContent = "❌";
    todoCompletedBtn.type = "checkbox";
    todoCompletedBtn.checked = todo.completed;
    // todoCompletedBtn.textContent = todo.completed ? "Completed" : "Not Completed"; //✅
    actions.append(todoDeleteBtn, todoCompletedBtn);

    li.append(todoTitle, todoDescription, duePriority, actions);

    if (todo.completed) {
      li.classList.add("completed");
    }

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
