function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:unload', (event) => {
  document.querySelectorAll(`[data-section="${event.detail.sectionId}"]`).forEach((element) => {
    element.remove();
    document.body.classList.remove('overflow-hidden');
  });
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());

















document.addEventListener("DOMContentLoaded", function () {
  // Function to render the whistle icon and best-seller tag on new content
  function renderWhistleIconAndBestSellerTag() {
    console.log("Rendering whistle icons and best-seller tags...");
    
    const productItems = document.querySelectorAll('.product-card');
    console.log(`Found ${productItems.length} product(s) to update.`);
    
    productItems.forEach(product => {
      // Check if the whistle icon is already added
      if (!product.querySelector('.whistle-icon')) {
        const whistleIcon = document.createElement('span');
        whistleIcon.classList.add('whistle-icon');
        whistleIcon.innerHTML = '<img src="https://cdn.shopify.com/s/files/1/0589/8413/6833/files/SVG.png?v=1751539290" alt="Whistle Icon" />';
        product.appendChild(whistleIcon);
        console.log("Whistle icon added.");
      } else {
        console.log("Whistle icon already present.");
      }

      // Check if the best-seller tag is already added
      if (product.classList.contains('best-seller') && !product.querySelector('.best-seller-tag')) {
        const bestSellerTag = document.createElement('span');
        bestSellerTag.classList.add('best-seller-tag');
        bestSellerTag.textContent = 'Best Seller';
        product.appendChild(bestSellerTag);
        console.log("Best-seller tag added.");
      } else if (product.classList.contains('best-seller')) {
        console.log("Best-seller tag already present.");
      }
    });
  }

  // Function to observe changes in the tab content and apply changes when new content is loaded
  function observeTabChanges() {
    const tabContentContainer = document.querySelector('.tpt-tab-containers');

    if (tabContentContainer) {
      console.log("Observing tab changes...");
      const observer = new MutationObserver(function () {
        console.log("Tab content changed, re-running function...");
        renderWhistleIconAndBestSellerTag(); // Re-run the function when content changes
      });

      // Observe child list changes in the tab content
      observer.observe(tabContentContainer, {
        childList: true,
        subtree: true // Watch all descendant nodes as well
      });
    } else {
      console.log("Tab content container not found.");
    }
  }

  // Initialize the MutationObserver
  observeTabChanges();

  // Initial call to ensure icons and tags are rendered on page load
  console.log("Initial rendering of icons and tags...");
  renderWhistleIconAndBestSellerTag();
});



