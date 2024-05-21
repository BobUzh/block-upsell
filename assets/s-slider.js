class SSlider extends HTMLElement {
    constructor() {
        super();
        this.config = JSON.parse(this.querySelector('.config').textContent);
    }

    connectedCallback() {
        this.slider = new Swiper(this, this.config);
    }
}

if (!customElements.get('s-slider')) {
    customElements.define('s-slider', SSlider)
  }
  