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
      v-bind:for="`todo${id}`"
    >
      <component v-bind:is="completed ? 'del' : 'span'">
        {{ title }}
      </component>
    </label>
    <button
      v-bind:aria-label="`remove todo: ${title}`"
      v-on:click="removeTodo"
    >
      X
    </button>
  </div>
</template>

<script>
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
      const config = {
        completed: this.completed,
        id: this.id,
        title: this.title,
        userId: this.userId,
      };

      this.$emit('remove', config);
    },
    toggleTodo() {
      const config = {
        completed: !this.completed,
        id: this.id,
        title: this.title,
        userId: this.userId,
      };

      this.$emit('toggle', config);
    },
  },
};
</script>
