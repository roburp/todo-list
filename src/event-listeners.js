export function setupProjectDialogListeners() {
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

    //add project!!

    form.reset();
    dialog.close();
  });
}

export function setupTodoDialogListeners() {
  const newTodoBtn = document.querySelector("#new-todo");
  const dialog = document.querySelector("#todo-dialog");
  const form = document.querySelector("#todo-form");
  const cancel = document.querySelector("#todo-cancel-btn");
  const submit = document.querySelector("#todo-add-btn");

  newTodoBtn.addEventListener("click", () => {
    const dialog = document.querySelector("#todo-dialog");
    dialog.showModal();
  });

  cancel.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  submit.addEventListener("click", (e) => {
    if (!form.checkValidity()) return;
    e.preventDefault();

    const titleField = document.querySelector("#todo-title");
    //const descriptionField = document.querySelector("#todo-description");
    const dueDateField = document.querySelector("#todo-due-date");
    //const priorityField = document.querySelector("#todo-priority");

    const title = document.querySelector("#todo-title").value.trim();
    //const description = document.querySelector("#todo-description").value.trim();
    const dueDate = new Date(document.querySelector("#todo-due-date").value);
    //const priority = document.querySelector("#todo-priority").value;

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

    //add todo!!

    form.reset();
    dialog.close();
  });
}
