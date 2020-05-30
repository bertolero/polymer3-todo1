import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import './add-item';
import './list-items';

export class AppPolymer extends LitElement {
	constructor() {
		super();
		let storedTodoList = JSON.parse(localStorage.getItem('todo-list'));
		this.todoList = storedTodoList === null ? [] : storedTodoList;
		this.addEventListener('on-add-todo-item', this.onAddTodoItem);
		this.addEventListener('on-delete-todo-item', this.onDeleteTodoItem);
	}

	static get properties() {
		return {
			todoList: { type: Array }
		};
	}

	onAddTodoItem(event) {
		this.todoList = event.detail.todoList;
	}

	onDeleteTodoItem(event) {
		const todoItemIndex = this.todoList
			.map((item) => item.id)
			.indexOf(event.detail.id);

		function immutableDelete(arr, index) {
			return arr.slice(0, index).concat(arr.slice(index + 1));
		}

		this.todoList = immutableDelete(this.todoList, todoItemIndex);
		localStorage.setItem('todo-list', JSON.stringify(this.todoList));
	}

	render() {
		return html`
			<style>
				@import '/css/global.css';
				.main-page {
					display: grid;
					grid-template-columns: 250px 1fr;
				}
			</style>
			<div class="main-page">Hello Todo App</div>
			<add-item></add-item>
			<list-items .todoList="${this.todoList}"></list-items>
		`;
	}
}

customElements.define('app-polymer', AppPolymer);
