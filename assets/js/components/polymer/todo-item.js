import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export class TodoItem extends LitElement {
	constructor() {
		super();
		this.item = {};
	}

	static get properties() {
		return {
			item: { type: Object }
		};
	}

	onDeleteTodoItem(id) {
		const onDeleteTodoItem = new CustomEvent('on-delete-todo-item', {
			detail: { id: id },
			bubbles: true,
			composed: true
		});
		console.debug('todo item trigger on-delete-todo-item event');
		console.debug(onDeleteTodoItem);
		this.dispatchEvent(onDeleteTodoItem);
	}

	onChangeTodoItem(id) {
		const onChangedTodoItem = new CustomEvent('on-change-todo-item', {
			detail: { id: id },
			bubbles: true,
			composed: true
		});
		console.debug('todo item trigger on-change-todo-item event');
		console.debug(onChangedTodoItem);
		this.dispatchEvent(onChangedTodoItem);
		this.requestUpdate();
	}

	render() {
		return html`
			<style>
				.list-item {
					cursor: pointer;
					display: flex;
					align-items: center;
					background: #fff;
					border-radius: 4px;
					margin-bottom: 0.5rem;
					line-height: 1.5;
					transition: all 200ms linear;
					position: relative;
					overflow: hidden;
				}
				input[type='checkbox'] {
					margin-left: 1rem;
				}
				input[type='checkbox']:checked + .item {
					text-decoration: line-through;
					color: #aaa;
				}
				.list-item .item {
					margin-right: auto;
					padding: 0.625rem 1rem;
				}
				.list-item .delete {
					padding: 0.625rem 1rem;
					border-radius: 0 0.5rem 0.5rem 0;
					color: rgba(0, 0, 0, 0.25);
					transition: 100ms all linear;
					border: none;
					background: transparent;
					cursor: pointer;
					-webkit-appearance: button;
					margin-left: auto;
					opacity: 0;
					pointer-events: none;
				}
				.list-item:hover .delete {
					opacity: 1;
					pointer-events: auto;
				}
				.list-item .delete:hover {
					color: red;
				}
				.list-item .delete:focus {
					outline: none;
				}
				@media (max-width: 576px) and (orientation: portrait) {
					.list-item .delete {
						opacity: 1;
						pointer-events: auto;
					}
				}
				@media (max-width: 992px) and (orientation: landscape) {
					.list-item .delete {
						opacity: 1;
						pointer-events: auto;
					}
				}
			</style>
			<div class="list-item">
				<input
					type="checkbox"
					.checked="${this.item.done}"
					@click="${this.onChangeTodoItem.bind(this, this.item.id)}"
				/>
				<div class="item">
					${this.item.value}
				</div>
				<button
					class="delete"
					@click="${this.onDeleteTodoItem.bind(this, this.item.id)}"
				>
					<strong>X</strong>
				</button>
			</div>
		`;
	}
}

customElements.define('todo-item', TodoItem);
