import Todo from "./todo.js";
import Project from "./project.js";

export default class todoApp {
  constructor() {
    this.projects = [];
    this.activeProjectId = null;
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
  }

  updateProject(projectId, { name } = {}) {
    const project = this.getProject(projectId);
    if (project) {
      if (name !== undefined) project.name = name;
      return true;
    } else return false;
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }

  setActiveProject(projectId) {
    this.activeProjectId = projectId;
  }

  getActiveProjectId() {
    return this.activeProjectId;
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

  addTodo({ title, description, dueDate, priority, completed = false } = {}) {
    const project = this.getActiveProject();
    if (!project) return false;

    const todo = new Todo(title, description, dueDate, priority, completed);
    project.addTodo(todo);
    return todo;
  }

  updateTodo(todoId, updates) {
    const todo = this.getActiveProject().getTodo(todoId);
    if (todo) {
      todo.update(updates);
      return true;
    } else return false;
  }

  toggleCompleteTodo(todoId) {
    const project = this.getActiveProject();
    if (!project) return false;

    const todo = project.getTodo(todoId);
    if (todo) {
      todo.toggleComplete();
      return true;
    } else return false;
  }

  deleteTodo(todoId) {
    const project = this.getActiveProject();
    if (!project) return false;

    return project.deleteTodo(todoId);
  }

  getActiveTodos() {
    const project = this.getActiveProject();
    if (!project) return false;

    return project ? project.todos : [];
  }
}
