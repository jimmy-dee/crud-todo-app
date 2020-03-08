<template>
  <main class="l-content">
    <form class="todo u-flex u-flex--center u-flex--column u-spacing-m-small u-spacing-p-small">
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
          <input
            type="checkbox"
            v-bind:aria-checked="todo.completed"
            v-bind:id="'todo' + todo.id"
            v-bind:value="todo.id"
            v-model="todo.completed"
            v-on:change="toggleTodo(todo)"
          />
          <label v-bind:for="'todo' + todo.id">
            <component
              class=""
              v-bind:is="todo.completed ? 'del' : 'span'"
            >
              {{ todo.title }}
            </component>
          </label>
          <button
            v-bind:aria-label="'remove todo:' + todo.title"
            v-on:click="removeTodo(todo)"
          >
            X
          </button>
        </li>
      </ul>
    </form>
  </main>
</template>

<script>
import axios from 'axios';
import CreateTodo from './components/CreateTodo.vue';

export default {
  name: 'todo-app',
  components: {
    CreateTodo,
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
    removeTodo(removedTodo) {
      axios.delete(`${this.baseApiUrl}/${removedTodo.id}`, removedTodo)
        .then(() => {
          // this is what i would do if the api was returning real data
          // this.todos = this.fetchTodos();

          // mock deletion
          this.todos = this.todos.filter((todo) => todo.id !== removedTodo.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleTodo(modifiedTodo) {
      axios.put(`${this.baseApiUrl}/${modifiedTodo.id}`, modifiedTodo)
        .then(() => {
          this.todos = this.fetchTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>
