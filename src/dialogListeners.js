export function setupProjectDialogListeners() {
  const newProjBtn = document.querySelector("#new-project");
  const dialog = document.querySelector("#project-dialog");
  const form = document.querySelector("#project-form");
  const cancel = document.querySelector("#cancel-btn");
  const submit = document.querySelector("#add-btn");

  newProjBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  cancel.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const projectNameField = document.querySelector("#project-name");
    const projectNameInput = document.querySelector("#project-name").value.trim();

    if (!projectNameInput) {
      alert("Please enter a project name.");
      projectNameField.focus();
      projectNameField.select();
      return;
    }

    form.reset();
    dialog.close();
  });
}

export function setupTodoDialogListeners() {
  const addTodoBtn = document.querySelector("#add-todo");
  addTodoBtn.addEventListener("click", () => {
    const dialog = document.querySelector("#todo-dialog");
    dialog.showModal();
  });
}
