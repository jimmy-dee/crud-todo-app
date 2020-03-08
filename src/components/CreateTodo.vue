<template>
  <section class="u-flex u-flex--column u-spacing-mb-medium">
    <label
      class="u-spacing-mb-small"
      for="create-todo-input"
    >
      Please enter a new todo, press enter to submit
    </label>
    <input
      class="todo-create__input"
      id="create-todo-input"
      placeholder="Create a new todo"
      type="text"
      v-bind:value="todoTitle"
      v-on:keyup="updateTodoTitle"
      v-on:keyup.enter="createTodo"
    />
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
      mutations.setIsLoading(true);

      const config = {
        completed: false,
        id: store.todoId,
        title: this.todoTitle,
        userId: store.userId,
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
        })
        .then(() => {
          mutations.setIsLoading(false);
        });
    },
    updateTodoTitle(event) {
      this.todoTitle = event.target.value;
    },
  },
};
</script>
