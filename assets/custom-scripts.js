document.addEventListener("DOMContentLoaded", function() {
    // Re-render the whistle icon and best-seller tag after tab content is loaded
    const tabs = document.querySelectorAll('.tpt-tabs-component .tabs-default .tpt-tab-item');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Wait for content to be loaded in the tab
            setTimeout(() => {
                // Re-apply the icon and best-seller tag
                renderWhistleIconAndBestSellerTag();
            }, 500); // Adjust timeout if necessary
        });
    });

    // Function to render the whistle icon and best-seller tag on new content
    function renderWhistleIconAndBestSellerTag() {
        const productItems = document.querySelectorAll('.product-card');
        
        productItems.forEach(product => {
            // Add the whistle icon to all products
            if (!product.querySelector('.whistle-icon')) {
                const whistleIcon = document.createElement('span');
                whistleIcon.classList.add('whistle-icon');
                whistleIcon.innerHTML = '<img src="https://cdn.shopify.com/s/files/1/0589/8413/6833/files/SVG.png?v=1751539290" alt="Whistle Icon" />';
                product.appendChild(whistleIcon);
            }

            // Check if the product has a best-seller tag and add it
            if (product.classList.contains('best-seller') && !product.querySelector('.best-seller-tag')) {
                const bestSellerTag = document.createElement('span');
                bestSellerTag.classList.add('best-seller-tag');
                bestSellerTag.textContent = 'Best Seller';
                product.appendChild(bestSellerTag);
            }
        });
    }

    // Initial call to ensure it runs on page load as well
    renderWhistleIconAndBestSellerTag();
});
