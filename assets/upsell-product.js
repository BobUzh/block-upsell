class UpsellProduct extends HTMLElement {
    cartIconBubble = 'cart-icon-bubble';
    cartDrawer = 'cart-drawer';

    constructor() {
        super()
    }

    connectedCallback() {
        this.variant = this.dataset.variant;
        this.btn = this.querySelector('button.usell-btn');
        this.btn.addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        this.btn.querySelector('.loader').classList.remove('hidden');
        const formData = {
            'sections': `${this.cartIconBubble},${this.cartDrawer}`,
            'items': [
                {
                'id': this.variant,
                'quantity': 1,
                "properties" : {
                    "product": "upsell"
                  }
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
            const cartDrawerSection = data.sections[this.cartDrawer];

            const newCartIcon = new DOMParser().parseFromString(cartIconSection, 'text/html')
                .querySelector('.shopify-section').innerHTML;
            document.querySelector(`#${this.cartIconBubble}`).innerHTML = newCartIcon;

            const newCartDrawer = new DOMParser().parseFromString(cartDrawerSection, 'text/html')
                .querySelector('cart-drawer').innerHTML;
            document.querySelector('cart-drawer').innerHTML = newCartDrawer;
            document.querySelector('cart-drawer').classList.remove('is-empty');
        })
        .catch((error) => {
        console.error('Error:', error);
        })
        .finally(() => this.btn.querySelector('.loader').classList.add('hidden'));
    }
}

if (!customElements.get('upsell-product')) {
    customElements.define('upsell-product', UpsellProduct)
}


