import { renderProjects, renderTodos } from "./render";
import { openUpdateTodoDialog } from "./dialog.js";

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
  const cancelBtn = document.querySelector("#todo-cancel-btn");
  const submitBtn = document.querySelector("#todo-add-btn");

  newTodoBtn.addEventListener("click", () => {
    dialog.showModal();
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

  submitBtn.addEventListener("click", (e) => {
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
  const toggleCompleteCheckbox = li.querySelector(".todo-completed");

  todoItem.addEventListener("click", (e) => {
    if (e.target.closest(".todo-actions")) return;

    const todo = app.getTodoById(todoId);
    const dialog = document.querySelector("#todo-update-dialog");
    const form = document.querySelector("#todo-update-form");
    const updateBtn = document.querySelector("#todo-update-btn");
    const cancelBtn = document.querySelector("#todo-update-cancel-btn");

    // open and populate the dialog
    openUpdateTodoDialog(todo);

    const onUpdate = (e) => {
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

      app.updateTodo(todoId, {
        title: title.value,
        description: description.value,
        dueDate: dueDateValue,
        priority: priority.value,
      });

      renderTodos(app);
      form.reset();
      dialog.close();

      // remove listener so it doesn't accumulate on multiple opens
      updateBtn.removeEventListener("click", onUpdate);
    };
    // attaches onUpdate to the update button when todo item is pressed and dialog opens
    updateBtn.addEventListener("click", onUpdate);

    cancelBtn.addEventListener("click", () => {
      form.reset();
      dialog.close();
      updateBtn.removeEventListener("click", onUpdate);
    });

    dialog.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          form.reset();
          dialog.close();
          updateBtn.removeEventListener("click", onUpdate);
        }
      },
      { once: true }
    );
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
