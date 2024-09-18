/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/

// Insert any custom theme js here...

document.addEventListener('DOMContentLoaded', function() {
  var soldOutBadge = document.getElementById('sold-out-badge');

  function updateSoldOutBadge(variant) {
    if (variant && !variant.available) {
      soldOutBadge.style.display = 'inline-block';
    } else {
      soldOutBadge.style.display = 'none';
    }
  }

  var initialVariant = window.product.variants.find(v => v.id === window.selectedVariantId);
  updateSoldOutBadge(initialVariant);

  document.querySelector('form select[name="id"]').addEventListener('change', function(event) {
    var selectedVariantId = parseInt(event.target.value);
    var selectedVariant = window.product.variants.find(variant => variant.id === selectedVariantId);
    updateSoldOutBadge(selectedVariant);
  });
});
