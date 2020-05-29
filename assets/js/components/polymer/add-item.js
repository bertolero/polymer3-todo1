import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export class AddItem extends LitElement {
	constructor() {
		super();
		this.todoItem = '';
	}

	handleOnKeyUp(event) {
		if (event.keyCode === 13) {
			this.handleOnclickButton(event);
		} else {
			this.todoItem = event.target.value;
		}
	}

	handleOnclickButton(event) {
		if (this.todoItem.length > 0) {
			let storedTodoList = JSON.parse(localStorage.getItem('todo-list'));
			storedTodoList = storedTodoList === null ? [] : storedTodoList;
			console.debug(storedTodoList);

			const todoList = [
				{
					id: new Date().valueOf(),
					value: this.todoItem,
					done: false
				}
			];
			storedTodoList.push(todoList);
			localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
			const todoInput = this.shadowRoot.querySelectorAll('input');
			todoInput[0].value = '';
			this.todoItem = '';
		}
	}

	static get properties() {
		return {
			todoList: { type: Array },
			todoItem: { type: String }
		};
	}

	render() {
		return html`
			<div>
				<input
					type="text"
					value="${this.todoItem}"
					@keyup="${this.handleOnKeyUp}"
				/>
				<button @click="${this.handleOnclickButton}">Add Item</button>
			</div>
		`;
	}
}

customElements.define('add-item', AddItem);
