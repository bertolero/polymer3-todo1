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

			const todoList = {
				id: new Date().valueOf(),
				value: this.todoItem,
				done: false
			};
			storedTodoList.push(todoList);
			localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
			const todoInput = this.shadowRoot.querySelectorAll('input');
			todoInput[0].value = '';
			this.todoItem = '';
			this.triggerAddTodoItemEvent(storedTodoList);
		}
	}

	triggerAddTodoItemEvent(storedTodoList) {
		const addTodoItemEvent = new CustomEvent('on-add-todo-item', {
			detail: { todoList: storedTodoList },
			bubbles: true,
			composed: true
		});
		console.debug('add-todo-item trigger on-add-todo-item');
		console.debug(addTodoItemEvent);
		this.dispatchEvent(addTodoItemEvent);
	}

	static get properties() {
		return {
			todoList: { type: Array },
			todoItem: { type: String }
		};
	}

	render() {
		return html`
			<style>
				.add {
					position: fixed;
					left: 2rem;
					top: 2rem;
					bottom: 2rem;
					background: #0064ff;
					width: 350px;
					padding: 1.5rem;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					border-radius: 1rem;
				}
				.add input {
					border: none;
					border-radius: 4px;
					margin: 0;
					padding: 1rem 1rem 2rem 1rem;
					font-size: 1rem;
					width: 100%;
					display: block;
					background: #fff;
					resize: none;
					box-sizing: border-box;
					overflow-y: auto;
				}
				.add input:focus {
					outline: none;
					box-shadow: 0 0 0 3px #0064ff, 0 0 0 6px rgba(255, 255, 255, 0.5);
				}
				.add input:focus ~ .btn-enter {
					display: block;
				}
				.add .btn-enter {
					position: absolute;
					font-size: 0.75rem;
					text-transform: uppercase;
					background: #fff;
					padding: 0.375rem;
					line-height: 1;
					right: 0.25rem;
					bottom: 0.25rem;
					border: none;
					border-radius: 0.25rem;
					color: #0064ff;
					font-weight: 700;
					cursor: pointer;
					letter-spacing: 0.5px;
				}
				.add .btn-enter:hover {
					background: #0064ff;
					color: #fff;
				}
				add .btn-enter:focus,
				.add .btn-enter:active {
					display: block;
				}
				.input-container {
					position: relative;
					background: #c9ffc7;
					border-radius: 5rem;
					display: flex;
					align-items: center;
				}
				.input-container .right-icon {
					border-radius: 0.4rem;
					width: 100%;
					max-width: 2rem;
					height: 2rem;
					background: #fff;
					color: rgba(106, 101, 99, 0.75);
					line-height: 2;
					text-align: center;
					display: block;
					position: absolute;
					right: 0.25rem;
					cursor: pointer;
				}
				.input-container .right-icon:hover {
					color: rgba(106, 101, 99, 1);
					background: rgba(106, 101, 99, 0.1);
				}
				.header {
					text-align: center;
					color: #fff;
					padding: 2rem 0;
				}
				.header h1 {
					padding: 0;
					margin: 0;
					line-height: 1;
					letter-spacing: 3px;
					text-transform: uppercase;
				}
				@media (max-width: 576px) and (orientation: portrait) {
					.add {
						position: relative;
						width: auto;
						left: auto;
						right: auto;
						top: auto;
						bottom: auto;
						border-radius: 0;
					}
					.add .header {
						padding: 0 1rem 0.5rem 1rem;
					}
					.add .header h1 {
						font-size: 1.5rem;
					}
				}

				@media (max-width: 992px) and (orientation: landscape) {
					.add {
						border-radius: 0;
						left: 0;
						bottom: 0;
						top: 0;
					}
				}
			</style>
			<div class="container">
				<div class="add">
					<div class="header">
						<h1>Add new To Do</h1>
					</div>
					<div class="input-container">
						<input
							type="text"
							value="${this.todoItem}"
							@keyup="${this.handleOnKeyUp}"
						/>
						<button class="btn-enter" @click="${this.handleOnclickButton}">
							Add Item
						</button>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('add-item', AddItem);
