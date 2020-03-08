import Vue from 'vue';

export const store = Vue.observable({
  isLoading: false,
  todoId: 20000,
  todos: [],
  userId: 2,
});

export const mutations = {
  createTodo(newTodo) {
    store.todos.push(newTodo);
    this.todoBump();
  },
  todoBump() {
    store.todoId += 1;
  },
  setIsLoading(bool) {
    store.isLoading = bool;
  },
  setTodos(todos) {
    store.todos = todos;
  },
};
