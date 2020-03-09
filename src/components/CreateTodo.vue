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
      debugger;
      this.$emit('create', this.todoTitle);
    },
    updateTodoTitle(event) {
      this.todoTitle = event.target.value;
    },
  },
};
</script>
