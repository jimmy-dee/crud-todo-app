<template>
  <main class="l-content">
    <form
      class="todo u-flex u-flex--center u-flex--column u-spacing-m-small u-spacing-p-small"
      v-on:submit.prevent
    >
      <loading-indicator v-if="isLoading"></loading-indicator>
      <error-message v-if="hasError"></error-message>
      <h1>Todo list</h1>
      <create-todo
        v-bind:base-api-url="baseApiUrl"
        v-on:create="createTodo"
      ></create-todo>
      <ul
        aria-live="polite"
        class="todo-list"
      >
        <li
          class="todo-list__item u-spacing-p-small u-spacing-mb-small"
          v-bind:key="todo.id"
          v-for="todo in todos"
        >
          <todo-item
            v-bind="todo"
            v-on:remove="removeTodo"
            v-on:toggle="toggleTodo"
          ></todo-item>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
import axios from 'axios';
import { mutations, store } from './scripts/store';
import CreateTodo from './components/CreateTodo.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import LoadingIndicator from './components/LoadingIndicator.vue';
import TodoItem from './components/TodoItem.vue';

export default {
  name: 'todo-app',
  components: {
    CreateTodo,
    ErrorMessage,
    LoadingIndicator,
    TodoItem,
  },
  data() {
    return {
      baseApiUrl: 'https://jsonplaceholder.typicode.com/todos',
      userId: 2,
    };
  },
  computed: {
    apiUrl() {
      return `${this.baseApiUrl}?userId=${this.userId}`;
    },
    hasError() {
      return store.hasError;
    },
    isLoading() {
      return store.isLoading;
    },
    todos() {
      return store.todos;
    },
  },
  methods: {
    createTodo(title) {
      mutations.setHasError(false);
      mutations.setIsLoading(true);

      const config = {
        completed: false,
        id: store.todoId,
        title,
        userId: this.userId,
      };

      axios.post(this.baseApiUrl, config)
        .then(() => {
          // with a real api id use the below, but because of the mocked response i dont
          // mutations.createTodo(response.data);

          // mock created
          mutations.createTodo(config);
          this.todoTitle = '';
        })
        .catch((error) => {
          console.log(error);
          mutations.setHasError(true);
        })
        .then(() => {
          mutations.setIsLoading(false);
        });
    },
    fetchTodos() {
      mutations.setHasError(false);
      mutations.setIsLoading(true);

      axios.get(this.apiUrl)
        .then((response) => {
          mutations.setTodos(response.data);
        })
        .catch((error) => {
          // handle error
          console.log(error);
          mutations.setHasError(true);
        })
        .then(() => {
          mutations.setIsLoading(false);
        });
    },
    removeTodo(todo) {
      mutations.setHasError(false);
      mutations.setIsLoading(true);

      axios.delete(`${this.baseApiUrl}/${this.id}`, todo)
        .then(() => {
          // with a real api id use the below, but because of the mocked response i dont
          // mutations.deleteTodo(response.data);

          // mock deletion
          debugger;
          mutations.deleteTodo(todo);
        })
        .catch((error) => {
          console.log(error);
          mutations.setHasError(true);
        })
        .then(() => {
          mutations.setIsLoading(false);
        });
    },
    toggleTodo() {
      mutations.setHasError(false);
      mutations.setIsLoading(true);

      const config = {
        completed: !this.completed,
        id: this.id,
        title: this.title,
        userId: this.userId,
      };

      axios.put(`${this.baseApiUrl}/${this.id}`, config)
        .then(() => {
          // with a real api id use the below, but because of the mocked response i dont
          // mutations.updateTodo(response.data);

          // mock created
          mutations.updateTodo(config);
        })
        .catch((error) => {
          console.log(error);
          mutations.setHasError(true);
        })
        .then(() => {
          mutations.setIsLoading(false);
        });
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>
