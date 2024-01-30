class TabbedContent extends HTMLElement {
  constructor() {
    super();

    this.tabs = this.querySelectorAll('tab-triggers button');
    this.tabPanels = this.querySelectorAll('tab-panel');
    this.tabList = this.querySelector('tab-triggers');
    this.currentTab = Array.from(this.tabs).findIndex((el) => el.getAttribute('aria-selected') === 'true');

    this.#init();
  }

  #init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => this.openTab(e.target.id));
    });

    this.tabList.addEventListener('keydown', (e) => {
      // Move right
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        this.tabs[this.currentTab].setAttribute('tabindex', -1);
        if (e.key === 'ArrowRight') {
          this.currentTab++;

          if (this.currentTab >= this.tabs.length) {
            this.currentTab = 0;
          }
        } else if (e.key === 'ArrowLeft') {
          this.currentTab--;

          if (this.currentTab < 0) {
            this.currentTab = this.tabs.length - 1;
          }
        }

        this.tabs[this.currentTab].setAttribute('tabindex', 0);
        this.tabs[this.currentTab].focus();
      }
    });
  }

  openTab(id) {
    const tab = Array.from(this.tabs).find((tab) => tab.id === id);

    this.tabList
      .querySelectorAll('[aria-selected="true"]')
      .forEach((t) => {
        t.setAttribute('aria-selected', false);
        t.setAttribute('tabindex', '-1');
      });

    tab.setAttribute('aria-selected', true);
    tab.setAttribute('tabindex', '0');

    Array.from(this.tabPanels).forEach((p) => p.setAttribute('hidden', true));

    const newSelectedPanel = this.querySelector(`#${tab.getAttribute('aria-controls')}`);

    newSelectedPanel.removeAttribute('hidden');

    if (document.body.dataset.animLoad === 'true' && window.sr) {
      // const cardsToAnimate = newSelectedPanel.querySelectorAll('.product-card-top');

      // cardsToAnimate.forEach((el) => {
      //   const container = el.closest('[data-items]');

      //   window.sr.reveal(el, {
      //     container,
      //     interval: 50
      //   });
      // });
      // window.sr.sync();
    }
  }
}
customElements.define('tabbed-content', TabbedContent);
