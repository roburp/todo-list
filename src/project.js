import Todo from "./todo.js";

export default class Project {
  constructor(name) {
    this.id = Date.now().toString();
    this.name = name;
    this.createdAt = new Date();
    this.todos = [];
  }

  updateProject(name) {
    this.name = name;
  }

  addTodo(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new Error("Invalid todo object");
    }
  }
  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id == todoId);
  }

  updateTodo(todoId, updates) {
    const todo = this.getTodo(todoId);
    if (todo) {
      todo.update(updates);
      return true;
    } else return false;
  }
}
