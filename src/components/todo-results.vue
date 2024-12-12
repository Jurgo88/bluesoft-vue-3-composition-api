<template>
    <div class="todo-results">
      <p style="color: green;" v-if="completedTodos.length > 0">Completed tasks: {{ completedTodos.length }}</p>
      <p style="color: red" v-else>No completed tasks</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTodoStore } from '@/stores/todoStore';
  
  // Access the store using Pinia
  const todoStore = useTodoStore();
  
  // Computed property to filter completed todos
  const completedTodos = computed(() => {
    return todoStore.todos.filter(todo => todo.completed);
  });
  </script>
  
  <style scoped>
  .todo-results {
    font-size: 16px;
    padding: 10px;
    text-align: center;
    font-weight: bold;
    border: 1px solid rgba(1, 1, 1, 0.1);
  }
  </style>
  