// Renders the Portfolio page from PROJECTS (see projects-data.js):
// - category "bubble" filters
// - the project tile grid, filtered by the active category
// - a single in-page project detail view that loads whichever project was
//   selected, instead of navigating to a separate HTML page per project
(function () {
    const CATEGORY_ORDER = ['All', 'Branding Design', 'Typography', 'Infographics', 'Advertising', 'Package Design'];

    const filterBar = document.getElementById('portfolioFilters');
    const grid = document.getElementById('portfolioGrid');
    const detail = document.getElementById('projectDetail');

    if (!filterBar || !grid || !detail) return;

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
                renderFilters();
                renderGrid();
            });
            filterBar.appendChild(bubble);
        });
    }

    function renderGrid() {
        grid.innerHTML = '';
        const projects = PROJECTS.filter(function (project) {
            return activeCategory === 'All' || project.categories.indexOf(activeCategory) !== -1;
        });

        projects.forEach(function (project, index) {
            const side = index % 2 === 0 ? 'pgl' : 'pgr';

            const tile = document.createElement('div');
            tile.className = side;

            const link = document.createElement('a');
            link.href = '#' + project.id;
            link.style.zIndex = '10';
            link.addEventListener('click', function (event) {
                event.preventDefault();
                openProject(project.id);
            });

            const img = document.createElement('img');
            img.src = project.thumbnail;
            img.alt = project.title;
            link.appendChild(img);

            const text = document.createElement('div');
            text.className = side + '2';
            text.innerHTML =
                '<h2>' + project.title + '</h2>' +
                '<h3>' + project.categories.join('/') + '</h3>' +
                '<p>' + project.tools + '</p>' +
                '<p>' + project.year + '</p>';

            tile.appendChild(link);
            tile.appendChild(text);
            grid.appendChild(tile);
        });

        if (projects.length === 0) {
            grid.innerHTML = '<p style="text-align:center;width:100%;">No projects in this category yet.</p>';
        }
    }

    function renderDetail(project) {
        const disclaimer = project.disclaimer
            ? '<p class="detailDisclaimer">*' + project.disclaimer + '*</p>'
            : '';
        const paragraphs = project.description.map(function (paragraph) {
            return '<p>' + paragraph + '</p>';
        }).join('');
        const gallery = project.images.map(function (src) {
            return '<img src="' + src + '" alt="' + project.title + '">';
        }).join('');

        detail.innerHTML =
            '<button type="button" class="detailClose">&times; Close</button>' +
            '<img class="detailHero" src="' + project.thumbnail + '" alt="' + project.title + '">' +
            '<h2>' + project.title + '</h2>' +
            '<p class="detailCategory">' + project.categories.join(' / ') + '</p>' +
            disclaimer +
            paragraphs +
            '<div class="detailGallery">' + gallery + '</div>';

        detail.querySelector('.detailClose').addEventListener('click', closeProject);
    }

    function openProject(id) {
        const project = PROJECTS.filter(function (p) { return p.id === id; })[0];
        if (!project) return;

        renderDetail(project);
        detail.classList.add('open');
        document.body.classList.add('detail-open');
        history.replaceState(null, '', '#' + id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeProject() {
        detail.classList.remove('open');
        document.body.classList.remove('detail-open');
        detail.innerHTML = '';
        history.replaceState(null, '', location.pathname + location.search);
    }

    function handleHash() {
        const id = location.hash.replace('#', '');
        if (id && PROJECTS.some(function (p) { return p.id === id; })) {
            openProject(id);
        } else {
            closeProject();
        }
    }

    window.addEventListener('hashchange', handleHash);

    renderFilters();
    renderGrid();
    handleHash();
})();
