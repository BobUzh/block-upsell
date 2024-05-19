class UpsellProduct extends HTMLElement {
    cartIconBubble = 'cart-icon-bubble';

    constructor() {
        super()
    }

    connectedCallback() {
        this.variant = this.dataset.variant;
        this.btn = this.querySelector('button.usell-btn');
        this.btn.addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        this.btn.classList.add('spinner');
        const formData = {
            'sections': this.cartIconBubble,
            'items': [
                {
                'id': this.variant,
                'quantity': 1
                }
            ]
        };

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const cartIconSection = data.sections[this.cartIconBubble];
            const newCartIcon = new DOMParser().parseFromString(cartIconSection, 'text/html')
                .querySelector('.shopify-section').innerHTML;
            document.querySelector(`#${this.cartIconBubble}`).innerHTML = newCartIcon;
        })
        .catch((error) => {
        console.error('Error:', error);
        })
        .finally(() => this.btn.classList.remove('spinner'));
    }
}

if (!customElements.get('upsell-product')) {
    customElements.define('upsell-product', UpsellProduct)
}


