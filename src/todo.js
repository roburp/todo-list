import { format, isToday, isTomorrow, isThisWeek, isPast } from "date-fns";

export default class Todo {
  constructor(title, description, dueDate, priority, projectId, completed = false) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.priority = priority; //low, medium, high
    this.createdAt = new Date();
    this.dueDate = new Date(dueDate);
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  getDueDate() {
    if (isToday(this.dueDate)) return "Today";
    if (isTomorrow(this.dueDate)) return "Tomorrow";
    if (isPast(this.dueDate)) return "Overdue";
    if (isThisWeek(this.dueDate)) return format(this.dueDate, "cccc");
    return format(this.dueDate, "MM/dd/yyyy");
  }

  update({ title, description, priority, dueDate, completed } = {}) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (priority !== undefined) this.priority = priority;
    if (dueDate !== undefined) this.dueDate = new Date(dueDate);
    if (completed !== undefined) this.completed = completed;
    return this;
  }
}
