import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import './todo-item';

export class ListItems extends LitElement {
	constructor() {
		super();
		this.todoList = [];
	}

	static get properties() {
		return {
			todoList: { type: Array }
		};
	}

	printTodoItems() {
		return this.todoList.map((todo) => {
			return html`<todo-item .item="${todo}"></todo-item>`;
		});
	}

	render() {
		return html`
			<ul>
				${this.printTodoItems()}
			</ul>
		`;
	}
}

customElements.define('list-items', ListItems);
