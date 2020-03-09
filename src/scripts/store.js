import Vue from 'vue';

export const store = Vue.observable({
  hasError: false,
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
  deleteTodo(deletedTodo) {
    store.todos = store.todos.filter((todo) => todo.id !== deletedTodo.id);
  },
  todoBump() {
    store.todoId += 1;
  },
  setHasError(bool) {
    store.hasError = bool;
  },
  setIsLoading(bool) {
    store.isLoading = bool;
  },
  setTodos(todos) {
    store.todos = todos;
  },
  updateTodo(updatedTodo) {
    const todoToBeUpdated = store.todos.find((todo) => todo.id === updatedTodo.id);

    if (todoToBeUpdated) {
      todoToBeUpdated.completed = updatedTodo.completed;
    }
  },
};
