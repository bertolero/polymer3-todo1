import { LitElement } from 'lit-element';
import { html } from 'lit-html';
import './add-item';

export class AppPolymer extends LitElement {
	constructor() {
		super();
		this.todoList = [];
	}

	static get properties() {
		return {
			todoList: { type: Array }
		};
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
		`;
	}
}

customElements.define('app-polymer', AppPolymer);
