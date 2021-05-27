import { TodoItemModel } from '../model/TodoItemModel.js';
import { element } from './html-util.js';
import { TodoItemView } from './TodoItemView.js';

export class TodoListView {
  /**
   *
   * @param {TodoItemModel[]} todoItems - TodoItemModel の配列
   * @param {{function(id: string, completed: boolean)}} onUpdateTodo
   * @param {{function(id: string)}} onDeleteTodo
   * @returns {Element}
   */
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul />`;
    todoItems.forEach((todoItem) => {
      const todoItemView = new TodoItemView();
      const todoItemElement = todoItemView.createElement(todoItem, {
        onDeleteTodo,
        onUpdateTodo,
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
