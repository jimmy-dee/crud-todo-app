<template>
  <main class="l-content">
    <form class="todo u-flex u-flex--center u-flex--column u-spacing-m-small u-spacing-p-small">
      <loading-indicator v-if="isLoading"></loading-indicator>
      <h1 class="">Todo list</h1>
      <create-todo></create-todo>
      <ul
        aria-live="polite"
        class="todo-list"
      >
        <li
          class="todo-list__item"
          v-bind:key="todo.id"
          v-for="todo in todos"
        >
          <todo-item
            v-bind="todo"
          ></todo-item>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
import axios from 'axios';
import CreateTodo from './components/CreateTodo.vue';
import LoadingIndicator from './components/LoadingIndicator.vue';
import TodoItem from './components/TodoItem.vue';

export default {
  name: 'todo-app',
  components: {
    CreateTodo,
    LoadingIndicator,
    TodoItem,
  },
  data() {
    return {
      baseApiUrl: 'https://jsonplaceholder.typicode.com/todos',
      isLoading: false,
      todos: null,
      userId: 2,
    };
  },
  computed: {
    apiUrl() {
      return `${this.baseApiUrl}?userId=${this.userId}`;
    },
  },
  methods: {
    fetchTodos() {
      axios.get(this.apiUrl)
        .then((response) => {
          this.todos = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
