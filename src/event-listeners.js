import { renderProjects, renderTodos } from "./render";
import { openUpdateTodoDialog, currentTodoId } from "./dialog.js";

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
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const { title, description, dueDate, priority } = form.elements;
    const dueDateValue = new Date(dueDate.value);

    if (dueDateValue < new Date()) {
      alert("Please enter a future due date.");
      dueDate.focus();
      dueDate.select();
      return;
    }

    app.addTodo({
      title: title.value.trim(),
      description: description.value.trim(),
      dueDate: new Date(dueDate.value),
      priority: priority.value,
      completed: false,
    });

    // const titleField = document.querySelector("#todo-title");
    // //const descriptionField = document.querySelector("#todo-description");
    // const dueDateField = document.querySelector("#todo-due-date");
    // //const priorityField = document.querySelector("#todo-priority");

    // const title = document.querySelector("#todo-title").value.trim();
    // const description = document.querySelector("#todo-description").value.trim();
    // const dueDate = new Date(document.querySelector("#todo-due-date").value);
    // const priority = document.querySelector("#todo-priority").value;

    // if (dueDate < new Date()) {
    //   alert("Please enter a future due date.");
    //   dueDateField.focus();
    //   dueDateField.select();
    //   return;
    // }

    // app.addTodo({ title, description, dueDate, priority, completed: false });
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

    dialog.dataset.projectId = projectId;
    projectName.value = project.name;
  });

  renameSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.querySelector("#project-update-name").value;
    const projectId = dialog.dataset.projectId;

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
      renderTodos(app);
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

  const todoItem = li;
  const deleteTodoBtn = li.querySelector(".todo-delete");
  const form = document.querySelector("#todo-update-form");
  const dialog = document.querySelector("#todo-update-dialog");
  // const updateTodoBtn = document.querySelector("#todo-update-btn");
  const cancelBtn = document.querySelector("#todo-update-cancel-btn");
  const toggleCompleteCheckbox = li.querySelector(".todo-completed");

  todoItem.addEventListener("click", (e) => {
    if (e.target.closest(".todo-actions")) return;

    const todo = app.getTodoById(todoId);
    openUpdateTodoDialog(todo); //from dialog.js
    // update todo button in separate setup function
  });

  cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      form.reset();
      dialog.close();
    }
  });

  deleteTodoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Delete this todo?")) {
      app.deleteTodo(todoId);
      renderTodos(app);
    }
  });

  toggleCompleteCheckbox.addEventListener("change", (e) => {
    e.stopPropagation();
    app.toggleCompleteTodo(todoId);
    renderTodos(app);
  });
}

export function setupUpdateTodoItemListener(app) {
  const updateTodoBtn = document.querySelector("#todo-update-btn");
  const form = document.querySelector("#todo-update-form");
  const dialog = document.querySelector("#todo-update-dialog");

  updateTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const { title, description, dueDate, priority } = form.elements;
    const dueDateValue = new Date(dueDate.value);

    if (dueDateValue < new Date()) {
      alert("Please enter a future due date.");
      dueDate.focus();
      dueDate.select();
      return;
    }

    // currentTodoId from dialog.js
    app.updateTodo(currentTodoId, {
      title: title.value,
      description: description.value,
      dueDate: new Date(dueDate.value),
      priority: priority.value,
    });

    renderTodos(app);
    form.reset();
    dialog.close();
  });
}
