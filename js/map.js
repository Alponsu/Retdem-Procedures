// ========== Sample Location Data (5 samples) ==========
const locations = [
    {
        id: 1,
        name: 'Easy Med Pharmacy And General Merchandise',
        location: 'San Rafael, Bulacan',
        lat: 15.002401969587348,
        lng: 120.93170537256697,
        // activity: 'Site Assessment',
        description: 'Located in San Rafael, Bulacan, this establishment serves as both a pharmacy and a general retailer, making it a practical resource for nursing students in the area. It is a convenient source for basic medical materials such as gauze, bandages, surgical tapes, and antiseptic solutions needed for wound care or sterile technique demonstrations. Beyond strictly medical items, the general merchandise aspect of the shop may provide other miscellaneous items sometimes required for community health bags or bedside care setups.',
        // visits: 3,
        // beneficiaries: 0
    },
    {
        id: 2,
        name: 'Greenwell Pharmacy and Medical Supplies',
        location: 'Diliman I Road, San Rafael, Bulacan',
        lat: 15.024399851311257,
        lng: 120.95043935384234,
        // activity: 'Design Review',
        description: 'The Greenwell Pharmacy and Medical Supplies, is located on Diliman I Road in San Rafael, Bulacan. This is an excellent resource specifically because it focuses on both pharmaceutical and medical equipment. You can likely find fundamental nursing tools such as stethoscopes, sphygmomanometers (blood pressure cuffs), and digital thermometers. It typically stocks specialized items like sterile gloves, surgical scissors, forceps, and various dressings that are essential for demonstrating wound dressing or suture care. The shop is a reliable source for high-quality disinfectants, alcohol, and PPE that meet the standards required for clinical grading.',
        // visits: 2,
        // beneficiaries: 0
    },
    {
        id: 3,
        name: 'MTMC Medical Supplies',
        location: 'Baliwag, Bulacan',
        lat: 14.969969826880824,
        lng: 120.8961664654779,
        // activity: 'Construction Demo',
        description: 'Located along Benigno S. Aquino Avenue in Baliwag, Bulacan. This local pharmacy and Medical Supplies store is a practical stop for students needing medical supplies in a central, accessible location in the areas of Baliwag and San Rafael. You can find essential "dry" supplies like sterile gauze, adhesive bandages, and medical tape, which are frequently required for wound care and dressing change demonstrations.',
        // visits: 4,
        // beneficiaries: 0
    }
];

function escapeHtml(text) {
    const span = document.createElement('span');
    span.textContent = String(text);
    return span.innerHTML;
}

function createLocationItem(location) {
    const item = document.createElement('div');
    item.className = 'location-item';
    item.dataset.locationId = String(location.id);
    item.innerHTML = `
        <strong>${escapeHtml(location.name)}</strong>
        <small>${escapeHtml(location.location)} • ${escapeHtml(location.activity)}</small>
    `;
    return item;
}

function createLocationCard(location) {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.dataset.locationId = String(location.id);

    card.innerHTML = `
        <h3>${escapeHtml(location.name)}</h3>
        <p style="color: var(--text-secondary); line-height: 1.7;">${escapeHtml(location.description)}</p>
        <div class="location-meta">
            <span>${escapeHtml(location.location)}</span>
            <span>${escapeHtml(location.activity)}</span>
        </div>
    `;

    return card;
}

function renderLocations() {
    const locationsList = document.getElementById('locationsList');
    const locationsGrid = document.getElementById('locationsGrid');

    if (locationsList) {
        locationsList.innerHTML = '';
        locations.forEach(loc => {
            locationsList.appendChild(createLocationItem(loc));
        });
    }

    if (locationsGrid) {
        locationsGrid.innerHTML = '';
        locations.forEach(loc => {
            locationsGrid.appendChild(createLocationCard(loc));
        });
    }
}

function setActiveLocation(locationId) {
    document.querySelectorAll('.location-item').forEach(el => {
        el.classList.toggle('active', el.dataset.locationId === String(locationId));
    });
}

function updateMapInfo(location) {
    const info = document.getElementById('mapInfo');
    if (!info) return;

    info.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.95); padding: 16px; border-radius: 12px; box-shadow: 0 12px 24px rgba(0,0,0,0.12); border: 1px solid rgba(226, 232, 240, 0.9); max-width: 360px;">
            <div style="font-size: 1.75rem; margin-bottom: 8px;">📍</div>
            <h3 style="margin-bottom: 6px; color: var(--primary-blue);">${escapeHtml(location.name)}</h3>
            <p style="margin-bottom: 8px; color: var(--text-secondary);"><strong>Location:</strong> ${escapeHtml(location.location)}</p>
            <p style="margin-bottom: 8px; color: var(--text-secondary);"><strong>Activity:</strong> ${escapeHtml(location.activity)}</p>
            <p style="color: var(--text-secondary); line-height: 1.7;">${escapeHtml(location.description)}</p>
        </div>
    `;
}

function wireSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        const matches = (el) => {
            const text = (el.textContent || '').toLowerCase();
            return text.includes(searchTerm);
        };

        document.querySelectorAll('.location-item').forEach(item => {
            item.style.display = matches(item) ? 'block' : 'none';
        });

        document.querySelectorAll('.location-card').forEach(card => {
            card.style.display = matches(card) ? 'block' : 'none';
        });
    });
}

// ========== Initialize Map (Leaflet) ==========
let map;
const markersById = new Map();

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (typeof L === 'undefined') {
        mapElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #999;">Map library failed to load.</div>';
        return;
    }

    map = L.map(mapElement, { scrollWheelZoom: false });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const bounds = [];

    locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);
        marker.bindPopup(
            `<strong>${escapeHtml(loc.name)}</strong><br>${escapeHtml(loc.location)}<br><em>${escapeHtml(loc.activity)}</em>`
        );

        marker.on('click', () => {
            setActiveLocation(loc.id);
            updateMapInfo(loc);
        });

        markersById.set(String(loc.id), marker);
        bounds.push([loc.lat, loc.lng]);
    });

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [30, 30] });
    }
}

function selectLocationById(locationId, { openPopup = true } = {}) {
    const loc = locations.find(l => String(l.id) === String(locationId));
    if (!loc) return;

    setActiveLocation(loc.id);
    updateMapInfo(loc);

    const marker = markersById.get(String(loc.id));
    if (map && marker) {
        map.setView(marker.getLatLng(), Math.max(map.getZoom(), 13), { animate: true });
        if (openPopup) marker.openPopup();
    }
}

function wireClicks() {
    const locationsList = document.getElementById('locationsList');
    const locationsGrid = document.getElementById('locationsGrid');

    if (locationsList) {
        locationsList.addEventListener('click', (e) => {
            const item = e.target.closest('.location-item');
            if (!item) return;
            selectLocationById(item.dataset.locationId);
        });
    }

    if (locationsGrid) {
        locationsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.location-card');
            if (!card) return;
            selectLocationById(card.dataset.locationId);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    renderLocations();
    wireSearch();
    wireClicks();
    initMap();

    // Set a sensible initial selection.
    if (locations.length > 0) {
        selectLocationById(locations[0].id, { openPopup: false });
    }
});
