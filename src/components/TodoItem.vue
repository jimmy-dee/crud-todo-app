<template>
  <div class="u-flex u-flex--center">
    <input
      type="checkbox"
      v-bind:aria-checked="completed"
      v-bind:checked="completed"
      v-bind:value="id"
      v-on:change="toggleTodo"
    />
    <label
      class="u-flex-grow-1 u-spacing-mh-small"
      v-bind:for="'todo' + id"
    >
      <component v-bind:is="completed ? 'del' : 'span'">
        {{ title }}
      </component>
    </label>
    <button
      v-bind:aria-label="'remove todo:' + title"
      v-on:click="removeTodo"
    >
      X
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { mutations } from '@/scripts/store';

export default {
  name: 'TodoItem',
  props: {
    baseApiUrl: {
      required: true,
      type: String,
    },
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
      mutations.setHasError(false);
      mutations.setIsLoading(true);

      const config = {
        completed: this.completed,
        id: this.id,
        title: this.title,
        userId: this.userId,
      };

      axios.delete(`${this.baseApiUrl}/${this.id}`, config)
        .then(() => {
          // with a real api id use the below, but because of the mocked response i dont
          // mutations.deleteTodo(response.data);

          // mock deletion
          mutations.deleteTodo(config);
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
};
</script>
