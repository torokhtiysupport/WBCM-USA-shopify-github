class ProductRecommendations extends HTMLElement {
  constructor() {
    super();

    this.fetch_delay = 0;
  }

  connectedCallback() {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(this);

          this.fetch_delay = Number(window.theme?.complementary_products_fetch_delay || '0');

          setTimeout(() => {
            fetch(this.dataset.url)
              .then(response => response.text())
              .then(text => {
                const html = document.createElement('div');
                html.innerHTML = text;
                const recommendations = html.querySelector('product-recommendations');

                if (recommendations && recommendations.innerHTML.trim().length) {
                  this.innerHTML = recommendations.innerHTML;

                  if (window.ajaxCart) {
                    const forms = this.querySelectorAll('form[action^="/cart/add"]');

                    Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
                  }

                  if (this.dataset.quickShopDynamicCheckout === 'true') window.Shopify.PaymentButton.init();

                  if (document.body.dataset.animLoad === 'true' && typeof window.sr !== 'undefined') {
                      const cardsToAnimate = this.querySelectorAll('.product-card-top');

                      cardsToAnimate.forEach((el) => {
                        const container = el.closest('.grid-layout');

                        window.sr.reveal(el, {
                          container,
                          interval: 50
                        });
                      });
                  }
                }
              })
              .catch(e => {
                console.error(e);
              });
          }, this.fetch_delay);
        }
      })
    }

    new IntersectionObserver(handleIntersection.bind(this), {rootMargin: '0px 0px 400px 0px'}).observe(this);
  }
}

customElements.define('product-recommendations', ProductRecommendations);
