import { renderProjects, renderTodos } from "./render";
import { formatDateForInput, parseDateFromInput, formatDateForDisplay, isOverdue } from "./dateUtils.js";

export function setupNewProjectListeners(app) {
  const newProjBtn = document.querySelector("#new-project");
  const dialog = document.querySelector("#project-dialog");
  const form = document.querySelector("#project-form");
  const cancel = document.querySelector("#project-cancel-btn");
  const submit = document.querySelector("#project-add-btn");

  newProjBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  cancel.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      form.reset();
      dialog.close();
    }
  });

  submit.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    e.preventDefault();

    const projectNameField = document.querySelector("#project-name");
    const projectName = document.querySelector("#project-name").value.trim();

    if (!projectName) {
      alert("Please enter a project name.");
      projectNameField.focus();
      projectNameField.select();
      return;
    }

    app.addProject(projectName);
    renderProjects(app);

    form.reset();
    dialog.close();
  });
}

export function setupNewTodoListeners(app) {
  const newTodoBtn = document.querySelector("#new-todo");
  const dialog = document.querySelector("#todo-dialog");
  const form = document.querySelector("#todo-form");
  const cancel = document.querySelector("#todo-cancel-btn");
  const submit = document.querySelector("#todo-add-btn");

  newTodoBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  cancel.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      form.reset();
      dialog.close();
    }
  });

  submit.addEventListener("click", (e) => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    e.preventDefault();

    const titleField = document.querySelector("#todo-title");
    //const descriptionField = document.querySelector("#todo-description");
    const dueDateField = document.querySelector("#todo-due-date");
    //const priorityField = document.querySelector("#todo-priority");

    const title = document.querySelector("#todo-title").value.trim();
    const description = document.querySelector("#todo-description").value.trim();
    const dueDate = new Date(document.querySelector("#todo-due-date").value);
    const priority = document.querySelector("#todo-priority").value;

    if (!title) {
      alert("Please enter a todo title.");
      titleField.focus();
      titleField.select();
      return;
    }

    if (!dueDate) {
      alert("Please enter a due date.");
      dueDateField.focus();
      dueDateField.select();
      return;
    }

    if (dueDate < new Date()) {
      alert("Please enter a future due date.");
      dueDateField.focus();
      dueDateField.select();
      return;
    }

    app.addTodo({ title, description, dueDate, priority, completed: false });
    renderTodos(app);

    form.reset();
    dialog.close();
  });
}

export function setupProjectItemListeners(li, app) {
  const projectId = li.dataset.projectId;
  const dialog = document.querySelector("#project-update-dialog");
  const renameBtn = li.querySelector(".rename-btn");
  const renameSubmitBtn = document.querySelector("#project-update-btn");
  const renameCancelBtn = document.querySelector("#project-update-cancel-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const form = document.querySelector("#project-update-form");

  // sets active project
  li.addEventListener("click", (e) => {
    // prevent triggering if clicked on rename or delete buttons
    if (e.target.closest(".rename-btn") || e.target.closest(".delete-btn")) return;
    ////
    document.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
    void li.offsetHeight;
    li.classList.add("selected");

    app.setActiveProject(projectId);
    renderTodos(app);
  });

  renameBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent other click handlers from running

    const project = app.getProject(projectId);
    const projectName = document.querySelector("#project-update-name");
    dialog.showModal();

    projectName.value = project.name;
  });

  renameSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = document.querySelector("#project-update-name").value;
    app.updateProject(projectId, { name });
    renderProjects(app);
    dialog.close();
  });

  renameCancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent other click handlers from running
    if (confirm("Delete this project?")) {
      app.deleteProject(projectId);
      renderProjects(app); // re-render after deletion
    }
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      form.reset();
      dialog.close();
    }
  });
}

export function setupTodoItemListeners(li, app) {
  const todoId = li.dataset.todoId;
  const toggleCompleteBtn = li.querySelector(".todo-completed");
  const updateTodoModal = li.querySelector(".todo-update");
  const deleteTodoBtn = li.querySelector(".todo-delete");
  const form = document.querySelector("#todo-update-form");
  const dialog = document.querySelector("#todo-update-dialog");
  const updateTodo = document.querySelector("#todo-update-btn");
  const cancel = document.querySelector("#todo-update-cancel-btn");

  toggleCompleteBtn.addEventListener("click", () => {
    app.toggleCompleteTodo(todoId);
    renderTodos(app);
  });

  updateTodoModal.addEventListener("click", () => {
    const todo = app.getTodoById(todoId);
    const title = document.querySelector("#todo-update-title");
    const description = document.querySelector("#todo-update-description");
    const dueDate = document.querySelector("#todo-update-due-date");
    const priority = document.querySelector("#todo-update-priority");

    dialog.showModal();

    title.value = todo.title;
    description.value = todo.description;
    dueDate.value = formatDateForInput(todo.dueDate);
    priority.value = todo.priority;
    renderTodos(app);
  });

  updateTodo.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const title = document.querySelector("#todo-update-title").value;
    const description = document.querySelector("#todo-update-description").value;
    const dueDate = new Date(document.querySelector("#todo-update-due-date").value);
    const priority = document.querySelector("#todo-update-priority").value;
    app.updateTodo(todoId, { title, description, dueDate, priority });
    renderTodos(app);
    form.reset();
    dialog.close();
  });

  cancel.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      form.reset();
      dialog.close();
    }
  });

  deleteTodoBtn.addEventListener("click", () => {
    if (confirm("Delete this todo?")) {
      app.deleteTodo(todoId);
      renderTodos(app);
    }
  });
}
