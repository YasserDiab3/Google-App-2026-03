/**
 * Backward-compatibility shim for legacy references to contractors.clean.js
 * This file ensures older cached HTML/routes that still request contractors.clean.js
 * continue to work by dynamically loading the canonical contractors.js module.
 */
(function () {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // If canonical module is already available, do nothing.
    if (window.Contractors && typeof window.Contractors.load === 'function') return;

    // Prevent duplicate injection.
    var existingScript = document.querySelector('script[src*="js/modules/modules/contractors.js"]');
    if (existingScript) return;

    var script = document.createElement('script');
    script.src = 'js/modules/modules/contractors.js';
    script.defer = true;
    script.async = false;
    document.head.appendChild(script);
})();
