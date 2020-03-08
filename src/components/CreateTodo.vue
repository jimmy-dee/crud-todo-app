<template>
  <section class="u-flex">
    <input
      class="todo-create__input"
      placeholder="Create a new todo"
      type="text"
      v-on:keyup="updateTodoTitle"
      v-on:keyup.enter="createTodo"
    />
    <button
      aria-label="Create a new todo"
      class="todo-create__button"
      v-on:click="createTodo"
      v-on:keyup.enter="createTodo"
    >
      +
    </button>
  </section>
</template>

<script>
import axios from 'axios';
import { mutations, store } from '@/scripts/store';

export default {
  name: 'CreateTodo',
  props: {
    baseApiUrl: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      todoTitle: '',
    };
  },
  methods: {
    createTodo() {
      const config = {
        completed: false,
        id: store.todoId,
        title: this.title,
        userId: store.userId,
      };

      axios.post(this.baseApiUrl, config)
        .then(() => {
          // mock created
          mutations.createTodo(config);
          this.todoTitle = '';
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTodoTitle(event) {
      this.todoTitle = event.target.value;
    },
  },
};
</script>
