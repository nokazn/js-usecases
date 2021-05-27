import { EventEmitter } from '../EventEmitter.js';

export class TodoListModel extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  /**
   * TodoItem の合計個数を返す
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * 表示できる TodoItem の配列を返す
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * TodoList の状態が更新されたときに呼び出されるリスナー関数
   * @param {*} listener listener
   */
  onChange(listener) {
    this.addEventListener('change', listener);
  }

  /**
   * 状態が変更されたときに呼び、登録済みのリスナー関数を呼び出す
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * TodoItem を追加する
   * @param {TodoItemModel} todoIte
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}
