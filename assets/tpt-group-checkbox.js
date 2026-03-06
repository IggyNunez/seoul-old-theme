if (!customElements.get('tpt-checkbox-options')) {
	customElements.define(
		'tpt-checkbox-options',
		class TptCheckboxOptions extends HTMLElement {
			constructor() {
				super();

				const allCheckbox = this.querySelectorAll('[tpt-group-checkbox] [type="checkbox"]');

				this.getCheckboxValue();

				allCheckbox.forEach((checkbox) => {
					checkbox.addEventListener('change', this.getCheckboxValue.bind(this));
				});
			}

			getCheckboxValue() {
				const mainCheckbox = this.querySelector('[main-checkbox]');
				var groupValue = '';

				const inputChecked = this.querySelectorAll('[tpt-group-checkbox] [type="checkbox"]:checked');

				inputChecked.forEach((input) => {
					let value = input.value;

					if (groupValue) {
						groupValue = groupValue + ', ' + value;
					} else {
						groupValue = value;
					}
				});

				if (groupValue) {
					mainCheckbox.checked = true;
				} else {
					mainCheckbox.checked = false;
				}

				mainCheckbox.setAttribute('value', groupValue);
			}
		}
	);
}
