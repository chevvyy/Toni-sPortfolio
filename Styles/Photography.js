// Renders the Photography page from PHOTO_CATEGORIES (see photos-data.js):
// category "bubble" filters plus a two-column image grid that swaps its
// contents based on the active bubble instead of showing every category at
// once in static sections.
(function () {
    const CATEGORY_ORDER = ['All', 'Portraits', 'Landscapes', 'Close Ups', 'Sports'];

    const filterBar = document.getElementById('photoFilters');
    const grid = document.getElementById('photoGrid');

    if (!filterBar || !grid) return;

    let activeCategory = 'All';

    function renderFilters() {
        filterBar.innerHTML = '';
        CATEGORY_ORDER.forEach(function (category) {
            const bubble = document.createElement('button');
            bubble.type = 'button';
            bubble.className = 'bubble' + (category === activeCategory ? ' active' : '');
            bubble.textContent = category;
            bubble.addEventListener('click', function () {
                activeCategory = category;
                const hash = category === 'All' ? '' : PHOTO_CATEGORIES[category].hash;
                history.replaceState(null, '', hash ? '#' + hash : location.pathname + location.search);
                renderFilters();
                renderGrid();
            });
            filterBar.appendChild(bubble);
        });
    }

    function currentPhotos() {
        if (activeCategory === 'All') {
            return CATEGORY_ORDER.filter(function (category) { return category !== 'All'; })
                .reduce(function (all, category) {
                    return all.concat(PHOTO_CATEGORIES[category].images.map(function (src) {
                        return { src: src, label: category };
                    }));
                }, []);
        }
        return PHOTO_CATEGORIES[activeCategory].images.map(function (src) {
            return { src: src, label: activeCategory };
        });
    }

    function renderGrid() {
        grid.innerHTML = '';
        const photos = currentPhotos();

        const col1 = document.createElement('div');
        col1.className = 'picgrid2';
        const col2 = document.createElement('div');
        col2.className = 'picgrid2';

        photos.forEach(function (photo, index) {
            const cell = document.createElement('div');
            cell.className = 'picgrid3';
            cell.innerHTML = '<p>' + photo.label + '</p><img src="' + photo.src + '" alt="' + photo.label + '">';
            (index % 2 === 0 ? col1 : col2).appendChild(cell);
        });

        grid.appendChild(col1);
        grid.appendChild(col2);
    }

    function handleHash() {
        const hash = location.hash.replace('#', '');
        const match = Object.keys(PHOTO_CATEGORIES).filter(function (category) {
            return PHOTO_CATEGORIES[category].hash === hash;
        })[0];
        activeCategory = match || 'All';
        renderFilters();
        renderGrid();
    }

    window.addEventListener('hashchange', handleHash);

    handleHash();
})();
