/*============================================================================
  Shopify Theme Editor functions
==============================================================================*/
window.addEventListener("DOMContentLoaded", function() {
  if (Shopify.designMode) {
    $(document)
      .on("shopify:section:load", function(event) {
        var section = $(event.target);
        var type = section
          .attr("class")
          .replace("shopify-section", "")
          .trim();

        var id = event.originalEvent.detail.sectionId;
        var sectionId = ".section--" + id;

        var productCardNodeList = event.target.querySelectorAll(".product-card");

        theme.homeSectionMargin();
        if ($("body").data("anim-load")) {
          sr.reveal(sectionId + " .section__title", { distance: "5px" });
          sr.reveal(sectionId + " .section__title-desc", {
            distance: 0,
            delay: 300
          });
          sr.reveal(sectionId + " .section__link", { distance: 0 });
        }

        switch (type) {
          case "js-section__featured-collection":

            theme.homeFeaturedCollection();
            theme.masonryLayout();
            // theme.runAjaxCart();
            // theme.productCollSwatch();
            // theme.quickShopModal();

            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            //review stars
            if (window.SPR) {
              window.SPR.initDomEls();
              window.SPR.loadBadges();
            }

            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .product-card-top", {
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__home-events":
            var thisEvents = $(".js-events-" + id);
            var thisSectionId = thisEvents.data("section-id");
            var thisApiKey = thisEvents.data("api-key");
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-event__item", {
                interval: theme.intervalValue
              });
            }
            //check if onboarding content exists
            if ($(section).find(".js-events-onboarding").length) {
              $(".js-layout-slider-" + id).each(function() {
                theme.layoutSliderInit(this);
              });
            } else {
              theme.eventFeed(
                thisApiKey,
                "#eventTemplate" + thisSectionId,
                "#eventContainer" + thisSectionId,
                thisSectionId
              );
            }
            break;

          case "js-section__home-slider":
            //reset each youtube video object (weird YT re-init bug)
            section.find(".js-home-carousel-video-data").each(function() {
              var playerId = $(this).attr("data-player-id");
              window[playerId] = "undefined";
            });
            section.find(".js-home-carousel").each(function() {
              theme.homeMainCarouselInit(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-carousel", { distance: 0 });
            }
            break;

          case "js-section__home-testimonials":
            section.find(".js-home-testimonials-carousel").each(function() {
              theme.testimonialsCarouselInit(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-testimonials", { distance: 0 });
            }
            break;

          case "js-section__home-image-grid":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-image-grid__item", {
              interval: theme.intervalValue
              });
            }
            break;

          case "js-section__home-logo-list":
            section.find(".js-home-logo-list-carousel").each(function() {
              theme.logoCarouselInit(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-logo-list__items", { distance: 0 });
            }
            break;

          case "js-section__home-video":
            section.find('.js-home-video-stage').each(function() {
              theme.homeVideoGalleryInit(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-video__stage, .home-video__items", {
                distance: 0
              });
            }
            break;

          case "js-section__home-blog":
            theme.masonryLayout();
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .blog", {
                delay: 500,
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__home-intro":
            theme.magnificVideo();
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-intro", { distance: 0 });
              sr.reveal(
                sectionId +
                  " .home-intro__media," +
                  sectionId +
                  " .home-intro__text," +
                  sectionId +
                  " .home-intro__video," +
                  sectionId +
                  " .home-intro__link-wrap"
              );
            }
            break;

          case "js-section__image-with-text":
            theme.magnificVideo();
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .image-with-text__box");
              sr.reveal(sectionId + " .image-with-text__media", { distance: 0 });
            }
            break;

          case "js-section__home-custom":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-custom__item", {
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__rich-text":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-rich-text__content", { distance: 0 });
            }
            break;

          case "js-section__home-map":
            section.find(('.js-map')).each(function() {
              theme.homeMapsInitiate(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-map__items");
            }
            break;

          case "js-section__home-delivery":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-delivery", { distance: 0 });
              sr.reveal(sectionId + " .home-delivery__content", {
                distance: theme.intervalStyle
              });
            }
            break;

          case "js-section__multi-column-images":
            if ($("body").data("anim-load")) {
              theme.sectionMultiColumn();
              sr.reveal(sectionId + " .multi-column__item", {
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__multi-column-icons":
            if ($("body").data("anim-load")) {
              theme.sectionMultiColumn();
              sr.reveal(sectionId + " .multi-column__item", {
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__home-collection-list":
            $(".js-layout-slider-" + id).each(function() {
              theme.layoutSliderInit(this);
            });
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .collection-list__item", {
                interval: theme.intervalValue
              });
            }
            break;

          // Strange bug with google pay not being
          // initialised when the Buy Now button is on
          // FINDINGS: Google Maps interfere with google
          // pay in editor for some reason, so loading
          // google maps via intersection observer helps
          case "js-section__home-product":
            // theme.runAjaxCart();
            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            //review stars
            if (window.SPR) {
              window.SPR.initDomEls();
              window.SPR.loadBadges();
            }

            // slider loading
            const $slider = $(section).find(".js-product-slider");
            $slider.not(".slick-initialized").each(function() {
                theme.thumbsCarouselInit(this);
            });


            // close popup when settings are modified
            var popUpOpen = document.getElementsByClassName('mfp-ready');
            if (popUpOpen.length > 0) {
                $.magnificPopup.close();
            };

            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .product-featured__details", { distance: 0 });
              sr.reveal(sectionId + " .media-gallery__slider", { distance: 0 });
              sr.reveal(sectionId + " .media-gallery__nav", { distance: 0 });
            }
            break;

          case "js-section__product-single":
            // theme.runAjaxCart();
            theme.productMediaInit();

            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            //reviews app
            if (window.SPR) {
              window.SPR.initDomEls();
              window.SPR.loadProducts();
              window.SPR.loadBadges();
            }

            //slider images smooth loading
            $(section).find(".js-product-slider").imagesLoaded(function() {
              theme.thumbsCarousel();
            });

            // close popup when settings are modified
            var popUpOpen = document.getElementsByClassName('mfp-ready');
            if (popUpOpen.length > 0) {
                $.magnificPopup.close();
            };

            if ($("body").data("anim-load")) {
              sr.reveal(".media-gallery__slider, .media-gallery__nav", { distance: 0 });
              sr.reveal(".product-single__title", { distance: "5px" });
              sr.reveal(
                ".product-single__vendor, .breadcrumb, .product-single__content, .product-single--minimal .product-single__content-text",
                { distance: 0, delay: 50}
              );

              //reset scrollreveal geometry
              //short wait for content to fully load
              window.setTimeout(function() {
                window.sr.delegate();
              }, 300);
            }

            const complementary_products = document.getElementById('complementary-products');
            if (complementary_products) {
              if (document.cookie.split('; ').find((row) => row === 'creative__complementary-products-absent=true')) {
                window.theme.complementary_products_fetch_delay = '1000';
              }
              document.cookie = "creative__complementary-products-absent=false; SameSite=None; Secure";
            } else {
              document.cookie = "creative__complementary-products-absent=true; SameSite=None; Secure";
            }
            break;

          case "js-section__product-recommendations":
            theme.productRecommendations();
            break;

          case "js-section__blog":
            theme.masonryLayout();
            theme.layoutSlider(".js-layout-slider-" + id);
            // theme.productCollSwatch();

            if ($("body").data("anim-load")) {
              sr.reveal(".blog", { delay: 0, interval: theme.intervalValue });
              sr.reveal(".blog-page__tags, .blog-pagination", {
                distance: 0,
                delay: 100
              });
              sr.reveal(".blog-page .section__title", { distance: "5px" });
            }
            break;

          case "js-section__article":
            theme.masonryLayout();
            theme.layoutSlider(".js-layout-slider-" + id);
            // theme.productCollSwatch();

            if ($("body").data("anim-load")) {
              sr.reveal(".article .section__title", { distance: "5px" });
              sr.reveal(
                ".article__date, .article__tags, .article__featured-media, .article__content, .article__meta",
                { distance: 0, delay: 100 }
              );
              sr.reveal(".article-paginate", { distance: 0, delay: 0 });
            }
            break;

          case "js-section__announcement":

            theme.setHeaderHeightVars();

            break;

          case "shopify-section-header js-section__header":
            theme.triggerActive();
            theme.localizeToggle();

            $(body).removeClass('header-down').removeClass('header-up');
            document.documentElement.style.setProperty('--header-height', document.getElementsByClassName('js-header')[0].offsetHeight + 'px');
            theme.headerScrollUp();

            setTimeout(function() {
              theme.headerNav();
            }, 10);

            //transparent header logic
            theme.headerStickyClass();
            setTimeout(function() {
              theme.headerStickyClass();
              $(body).removeClass('header-stuck');
            }, 10);

            //check if collection page
            if ($('.js-collection-banner').length) {
              //check if colelction has image and transparent header is enabled
              //set transparent header data attribute accordingly
              if ($('.js-collection-banner').data('collection-has-image') && $('.js-header').hasClass('header--transparent')) {
                document.querySelector('.js-header').setAttribute('data-transparent-header', true)
              } else {
                document.querySelector('.js-header').setAttribute('data-transparent-header', false)
              }
            }

            theme.setHeaderHeightVars();
            theme.setHeaderLogoVars();

            theme.setHeaderStyle();
            new ResizeObserver(theme.setHeaderStyle).observe(
                document.querySelector('.js-header')
            );

            break;

          case "js-section__newsletter":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .newsletter", { distance: 0 });
            }
            break;

          case "js-section__footer-newsletter":
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .newsletter", { distance: 0 });
            }
            break;

          case "js-section__footer":
            theme.footerTweet();
            theme.localizeToggle();
            break;

          case "js-section__collection-banner":
            //transparent header logic
            if ($('.js-collection-banner').data('collection-has-image') && $('.js-header').hasClass('header--transparent')) {
              document.querySelector('.js-header').setAttribute('data-transparent-header', true)
            } else {
              document.querySelector('.js-header').setAttribute('data-transparent-header', false)
            }

            if ($("body").data("anim-load")) {
              sr.reveal(".collection__header-info__title", { distance: "5px" });
              sr.reveal(
                ".collection__header-media, .collection__header-info__text",
                { distance: 0, delay: 500 }
              );
            }

          break;

          case "js-section__collection":
            theme.masonryLayout();
            // theme.runAjaxCart();

            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            //review stars
            if (window.SPR) {
              window.SPR.initDomEls();
              window.SPR.loadBadges();
            }

            if ($("body").data("anim-load")) {
              sr.reveal(".collection .product-card-top", {
                interval: theme.intervalValue,
                delay: 0
              });
              sr.reveal(
                ".collection-empty, .collection-pagination, .collection__filters-active",
                { distance: 0, delay: 20 }
              );
            }

            break;

          case "js-section__search":
            theme.masonryLayout();
            // theme.runAjaxCart();

            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            //review stars
            if (window.SPR) {
              window.SPR.initDomEls();
              window.SPR.loadBadges();
            }

            if ($("body").data("anim-load")) {
              sr.reveal(".search-page .section__title", { distance: "5px" });
              sr.reveal(".search-page__form, .search-page__info, .search-page-pagination, .collection__filters-active", {
                distance: 0,
                delay: 100
              });
              sr.reveal(".search-page .product-card-top, .search-grid-item", {
                interval: theme.intervalValue,
                delay: 0
              });
            }
            break;

          case "js-section__list-collections":
            if ($("body").data("anim-load")) {
              sr.reveal(".list-collections .section__title", { distance: "5px" });
              sr.reveal(".list-collections .collection-list__item", {
                interval: theme.intervalValue,
                delay: 500
              });
            }
            break;

          case "js-section__mobile-draw":
            theme.triggerActive();
            theme.localizeToggle();
            break;

          case "js-section__promo-pop":
            if ($("body").data("anim-load")) {
              sr.reveal(".promo-pop .section__title", { distance: 0 });
            }
            break;

          case "js-section__cart-page":
            if ($("body").data("anim-load")) {
              sr.reveal(".cart .section__title", { distance: "5px" });
              sr.reveal(".cart__announcement", { distance: 0 });
              sr.reveal(".cart__content", { distance: 0, delay: 100 });
            }
            theme.cartCheckbox();
            // theme.runAjaxCart();

            if (window.ajaxCart) {
              const forms = document.querySelectorAll(`${sectionId} form[action^="/cart/add"]`);

              Array.from(forms).forEach((form) => window.ajaxCart.initForm(form));
            }

            break;

          case "js-section__faq-page":
            theme.scrollToDiv();
            if ($("body").data("anim-load")) {
              sr.reveal(".faq__cta", { distance: 0, delay: 100 });
              sr.reveal(".faq__accordion", { distance: 0, delay: 200 });
              sr.reveal(".page__contact-form", { distance: 0, delay: 100 });
              sr.reveal(".faq__category__title", { distance: 0 });
            }
            break;

          case "js-section__page-custom":
            if ($("body").data("anim-load")) {
              sr.reveal(".home-custom__item", { interval: theme.intervalValue });
              sr.reveal(".home-image-grid__item", {
                interval: theme.intervalValue
              });
            }
            break;

          case "js-section__page-contact":
            $(".js-map-replace").appendAround();
            theme.homeMaps();
            if ($("body").data("anim-load")) {
              sr.reveal(sectionId + " .home-map__items");
              sr.reveal(".page__contact-form", { distance: 0, delay: 200 });
            }
            break;
        }
      })
      .on("shopify:section:reorder", function(event) {
        theme.homeSectionMargin();
      })
      .on("shopify:section:select", function(event) {
        var section = $(event.target);
        var type = section
          .attr("class")
          .replace("shopify-section", "")
          .trim();
        var id = event.originalEvent.detail.sectionId;

        switch (type) {
          case "js-section__mobile-draw":
            //record current top offset
            theme.currentOffset = $(document).scrollTop();
            theme.mfpOpen("menu-draw");
            break;

          case "js-section__age-checker":
            var ageEnabled = $(section)
              .find(".js-age-draw")
              .data("age-check-enabled");
            if (ageEnabled) {
              theme.mfpOpen("age");
            } else {
              $.magnificPopup.close();
            }
            //record current top offset
            theme.currentOffset = $(document).scrollTop();
            break;

          case "js-section__promo-pop":
            var promoEnabled = $(section)
              .find(".js-promo-pop")
              .data("promo-enabled");
            if (promoEnabled) {
              theme.promoPop("open");
            } else {
              theme.promoPop("close");
            }
            //record current top offset
            theme.currentOffset = $(document).scrollTop();
            break;

          case "js-section__home-slider":
            var currSlideshowSection = $('[data-section-id="' + id + '"]').find(
              ".js-home-carousel"
            );

            //pause carousel autoplay
            currSlideshowSection.slick("slickPause");
            break;

          case "js-section__home-testimonials":
            var currTestimonialsSection = $('[data-section-id="' + id + '"]').find(
              ".js-home-testimonials-carousel"
            );

            //pause carousel autoplay
            currTestimonialsSection.slick("slickPause");
            break;
        }
      })
      .on("shopify:section:deselect", function(event) {
        var section = $(event.target);
        var type = section
          .attr("class")
          .replace("shopify-section", "")
          .trim();
        var id = event.originalEvent.detail.sectionId;

        switch (type) {
          case "js-section__mobile-draw":
            //jump back to to previous offset
            $(document).scrollTop(theme.currentOffset);
            $.magnificPopup.close();
            break;

          case "js-section__age-checker":
            //jump back to to previous offset
            $(document).scrollTop(theme.currentOffset);
            $.magnificPopup.close();
            break;

          case "js-section__promo-pop":
            theme.promoPop("close");
            //jump back to to previous offset
            $(document).scrollTop(theme.currentOffset);
            break;

          case "js-section__home-slider":
            var currSlideshowSection = $('[data-section-id="' + id + '"]').find(
              ".js-home-carousel"
            );
            //play carousel autoplay
            if (currSlideshowSection.data("autoplay")) {
              currSlideshowSection.slick("slickPlay");
            }
            break;

          case "js-section__home-testimonials":
            var currTestimonialsSection = $('[data-section-id="' + id + '"]').find(
              ".js-home-testimonials-carousel"
            );
            //play carousel autoplay
            if (currTestimonialsSection.data("autoplay")) {
              currTestimonialsSection.slick("slickPlay");
            }
            break;
        }
      })
      .on("shopify:section:unload", function(event) {
        //reset scrollreveal geometry
        //short wait for content to fully load
        window.setTimeout(function() {
          window.sr.delegate();
        }, 300);
      })
      .on("shopify:block:select", function(event) {
        var id = event.originalEvent.detail.sectionId;
        var slide = $(event.target);
        var type = slide
          .parents(".shopify-section")
          .attr("class")
          .replace("shopify-section", "")
          .trim();

        switch (type) {
          case "js-section__home-slider":
            var currSlideshowSlide = $(slide)
              .find(".home-carousel__item")
              .attr("data-slide-id");
            var currSlideshowSlider = $('[data-section-id="' + id + '"]').find(
              ".js-home-carousel"
            );
            //go to slide
            currSlideshowSlider.slick("slickGoTo", currSlideshowSlide);
            break;

          case "js-section__home-testimonials":
            var currTestimonialsSlide = $(slide)
              .find(".home-testimonials__item")
              .attr("data-slide-id");
            var currTestimonialsSlider = $('[data-section-id="' + id + '"]').find(
              ".js-home-testimonials-carousel"
            );
            //go to slide
            currTestimonialsSlider.slick("slickGoTo", currTestimonialsSlide);
            break;
        }
      });
  }
});
