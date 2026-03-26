(function () {
    async function injectInclude(el) {
        const url = el.getAttribute('data-include');
        if (!url) return;

        try {
            const res = await fetch(url, { cache: 'no-cache' });
            if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
            el.innerHTML = await res.text();
            el.removeAttribute('data-include');
        } catch (err) {
            console.error(err);
        }
    }

    async function loadIncludes() {
        const includeEls = Array.from(document.querySelectorAll('[data-include]'));
        if (includeEls.length === 0) {
            document.dispatchEvent(new CustomEvent('includes:loaded'));
            return;
        }

        await Promise.all(includeEls.map(injectInclude));
        document.dispatchEvent(new CustomEvent('includes:loaded'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadIncludes);
    } else {
        loadIncludes();
    }
})();
