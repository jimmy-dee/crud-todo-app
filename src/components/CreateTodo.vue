<template>
  <fieldset class="todo-create">
    <input
      class="todo-create__input"
      placeholder="Create a new todo"
      type="text"
    />
    <button
      aria-label="Create a new todo"
      class="todo-create__button"
      v-on:click="createTodo"
    >
      +
    </button>
  </fieldset>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateTodo',
  props: {
    msg: String,
  },
  methods: {
    createTodo(newTodo) {
      axios.post(this.baseApiUrl, { ...newTodo, userId: this.userId })
        .then(() => {
          // this is what i would do if the api was returning real data
          // this.todos = this.fetchTodos();

          // mock created
          this.todos.push({ ...newTodo, userId: this.userId });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
