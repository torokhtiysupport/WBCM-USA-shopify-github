class PredictiveSearch extends HTMLElement {
  constructor() {
    super();

    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('#predictive-search');
    this.predictiveSearchLoader = this.parentElement.querySelector('.search-draw__loader');
    this.searchDrawContent = this.parentElement.querySelector('.search__content');

        this.input.addEventListener('input', () => {
            this.predictiveSearchResults.style.display = 'none';
            this.searchDrawContent.style.display = 'none';
            this.predictiveSearchLoader.style.display = 'block';
        });

    this.input.addEventListener('input', this.debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
  }

  onChange() {
    const searchTerm = this.input.value.trim();

    if (!searchTerm.length) {
      this.close();
      return;
    }

    this.getSearchResults(searchTerm);
  }

  getSearchResults(searchTerm) {
    fetch(`/search/suggest?q=${searchTerm}&resources[type]=product&resources[limit]=8&section_id=predictive-search`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
        const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
        this.predictiveSearchResults.innerHTML = resultsMarkup;
        this.open();
      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  open() {
    this.predictiveSearchLoader.style.display = 'none';
    this.predictiveSearchResults.style.display = 'block';
  }

  close() {
    this.predictiveSearchLoader.style.display = 'none';
    this.predictiveSearchResults.style.display = 'none';
    this.searchDrawContent.style.display = 'block';
  }

  debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }
}
customElements.define('predictive-search', PredictiveSearch);