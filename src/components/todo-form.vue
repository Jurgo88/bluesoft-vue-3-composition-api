<template>
    <div class="todo-form">
        <input
            placeholder="Enter new task"
            v-model="task"
            @keyup="handleKeyUp"
        />
        <button type="button" @click="handleAddTodo">Add task</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';

// Access the Pinia store
const todoStore = useTodoStore();

// Reactive variable for task input
const task = ref("");

// Handle adding a new todo
const handleAddTodo = () => {
    if (task.value) {
        const newTodo = {
            id: todoStore.todos.length > 0 ? todoStore.todos[todoStore.todos.length - 1].id + 1 : 0,
            title: task.value,
            completed: false
        };
        // Add the new todo to the store
        console.log(newTodo);
        todoStore.addTodoToStore(newTodo);
        task.value = "";  // Reset the task input
    }
};

// Handle "Enter" key press to add todo
const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
        handleAddTodo();
    }
};
</script>

<style scoped>
.todo-form {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.todo-form input {
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid rgba(1, 1, 1, 0.3);
    margin-right: 5px;
    width: 250px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
}

.todo-form button {
    cursor: pointer;
    background: #1e90ff;
    text-transform: uppercase;
    color: #ffffff;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    width: 110px;
}

.todo-form button:hover {
    background: #1474d2;
}
</style>
