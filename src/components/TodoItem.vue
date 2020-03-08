<template>
  <div class="u-flex u-flex--center">
    <input
      type="checkbox"
      v-bind:aria-checked="completed"
      v-bind:id="'todo' + id"
      v-bind:value="id"
      v-model="completed"
      v-on:change="toggleTodo(todo)"
    />
    <label
      class="u-flex-grow-1 u-spacing-mh-small"
      v-bind:for="'todo' + id"
    >
      <component
        class=""
        v-bind:is="completed ? 'del' : 'span'"
      >
        {{ title }}
      </component>
    </label>
    <button
      v-bind:aria-label="'remove todo:' + title"
      v-on:click="removeTodo()"
    >
      X
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoItem',
  props: {
    completed: {
      required: true,
      type: Boolean,
    },
    id: {
      required: true,
      type: Number,
    },
    title: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: Number,
    },
  },
  methods: {
    removeTodo() {
      axios.delete(`${this.baseApiUrl}/${this.props.id}`, { ...this.props })
        .then(() => {
          // this is what i would do if the api was returning real data
          // this.todos = this.fetchTodos();

          // mock deletion
          // this.todos = this.todos.filter((todo) => todo.id !== removedTodo.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleTodo() {
      axios.put(`${this.baseApiUrl}/${this.props.id}`, { ...this.props })
        .then(() => {
          // this.todos = this.fetchTodos();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
