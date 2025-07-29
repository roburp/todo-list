import Todo from "./todo.js";
import Project from "./project.js";

class todoApp {
  constructor() {
    this.projects = [];
    this.activeProjectId = null;
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }

  setActiveProject(projectId) {
    this.activeProjectId = projectId;
  }

  getActiveProject() {
    return this.projects.find((project) => project.id === this.activeProjectId);
  }

  getProject(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }

  getProjects() {
    return this.projects;
  }

  updateProject(projectId, { name } = {}) {
    const project = this.getProject(projectId);
    if (project) {
      if (project.name !== undefined) project.name = name;
      return true;
    } else return false;
  }

  addTodo({ title, description, dueDate, priority, completed = false } = {}) {
    const activeProject = this.getActiveProject();
    if (!activeProject) return false;

    const todo = new Todo(title, description, dueDate, priority, completed);
    activeProject.addTodo(todo);
  }

  updateTodo(todoId, updates) {
    const todo = this.getActiveProject().getTodo(todoId);
    if (todo) {
      todo.update(updates);
      return true;
    } else return false;
  }
}
