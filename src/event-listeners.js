import { renderProjects, renderTodos } from "./render";

export function setupProjectDialogListeners(app) {
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
    if (!form.checkValidity()) return;
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

export function setupTodoDialogListeners(app) {
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
    if (!form.checkValidity()) return;
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

  const renameBtn = li.querySelector(".rename-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  renameBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent other click handlers from running
    const newName = prompt("Enter new project name:");
    if (newName) {
      app.updateProject(projectId, { name: newName });
      renderProjects(app); // re-render after rename
    }
  });

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent other click handlers from running
    if (confirm("Delete this project?")) {
      app.deleteProject(projectId);
      renderProjects(app); // re-render after deletion
    }
  });
}

export function setupTodoItemListeners(li, app) {
  const todoId = li.dataset.todoId;

  const toggleCompleteBtn = li.querySelector(".todo-completed");
  toggleCompleteBtn.addEventListener("click", () => {
    app.toggleCompleteTodo(todoId);
    renderTodos(app);
  });
}
