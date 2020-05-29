import { LitElement } from 'lit-element';
import { html } from 'lit-html';

export class MyElement extends LitElement {
	constructor() {
		super();
		this.popupOpen = false;
		this.allContacts = [];
	}

	static get properties() {
		return {
			popupOpen: { type: Boolean },
			allContacts: { type: Array }
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
			<div class="main-page"></div>
		`;
	}
}

customElements.define('my-element', MyElement);
