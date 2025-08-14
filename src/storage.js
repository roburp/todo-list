import Project from "./project.js";
import Todo from "./todo.js";

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const projectsData = JSON.parse(localStorage.getItem("projects")) || [];
  return projectsData.map((projObj) => {
    return Object.assign(new Project(projObj.name), {
      id: projObj.id,
      createdAt: new Date(projObj.createdAt),
      //returns todos since arrow functions with no {} use an implicit return
      todos: (projObj.todos || []).map((todoObj) =>
        Object.assign(
          new Todo(todoObj.title, todoObj.description, new Date(todoObj.dueDate), todoObj.priority, todoObj.completed),
          {
            id: todoObj.id,
            createdAt: new Date(todoObj.createdAt),
          }
        )
      ),
    });
  });
}
