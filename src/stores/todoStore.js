import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
        loading: false,
        error: null,
    }),

    actions: {
        // Fetch todos from the API
        async fetchTodos() {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                this.todos = response.data.slice(0, 10); // Limit to the first 10 todos
                console.log('Loaded todos:', this.todos);
            } catch (error) {
                console.error('Error loading todos:', error);
                this.error = 'Failed to load todos';
            }
        },

        // Add a new todo to the store (not to the API)
        addTodoToStore(todo) {
            console.log('Adding todo:', todo);
            this.todos.push(todo);
        },

        // Add a new todo to the API
        async addTodoToApi(task) {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
                    title: task,
                    completed: false,
                });
                this.todos.push(response.data);
            } catch (err) {
                console.error('Failed to add todo:', err);
            }
        },

        // Toggle the completion status of a todo
        async toggleTodo(id) {
            const todo = this.todos.find((todo) => todo.id === id);
            if (todo) {
                try {
                    todo.completed = !todo.completed;
                    await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                        completed: todo.completed,
                    });
                } catch (err) {
                    console.error('Failed to toggle todo:', err);
                }
            }
        },

        // Delete a todo from the store
        deleteTodoFromStore(id) {
            console.log('Deleting todo:', id);
            this.todos = this.todos.filter((todo) => todo.id !== id);
        },

        // Delete a todo from the API
        async deleteTodoFromApi(id) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
                this.todos = this.todos.filter((todo) => todo.id !== id);
            } catch (err) {
                console.error('Failed to delete todo:', err);
            }
        },
    },

    getters: {
        completedTodos: (state) => state.todos.filter((todo) => todo.completed),
        activeTodos: (state) => state.todos.filter((todo) => !todo.completed),
    },
});
