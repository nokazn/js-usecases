import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListView } from './view/TodoListView.js';
import { render } from './view/html-util.js';

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  handleAdd(title) {
    this.todoListModel.addTodo(
      new TodoItemModel({
        title,
        completed: false,
      }),
    );
  }

  handleUpdate({ id: number, completed: boolean }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
  }

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        },
      });
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todo アイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener('submit', (event) => {
      // submit イベントの本来の動作を止める
      event.preventDefault();
      this.handleAdd(inputElement.value);
      // 入力欄をから文字列にしてリセットする
      inputElement.value = '';
    });
  }
}
