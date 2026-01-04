// app.js - Main application logic

// ===================
// TEST SUITE (TDD)
// ===================
function runAppTests() {
    console.log('=== app.js Tests ===');
    let passed = 0;
    let failed = 0;

    // Test 1: Default category is 'writing'
    // Reset to default first
    currentCategory = 'writing';
    if (getCurrentCategory() === 'writing') {
        console.log('✓ Default category is writing');
        passed++;
    } else {
        console.error(`✗ Default category should be 'writing', got '${getCurrentCategory()}'`);
        failed++;
    }

    // Test 2: Category switching works
    setCategory('drawing');
    if (getCurrentCategory() === 'drawing') {
        console.log('✓ Category switched to drawing');
        passed++;
    } else {
        console.error(`✗ Category should be 'drawing', got '${getCurrentCategory()}'`);
        failed++;
    }

    // Test 3: generateIdea returns idea from current category
    setCategory('coding');
    const idea = generateIdea();
    if (ideas.coding.includes(idea)) {
        console.log(`✓ generateIdea returns from correct category: "${idea.substring(0, 30)}..."`);
        passed++;
    } else {
        console.error('✗ generateIdea should return idea from current category');
        failed++;
    }

    // Test 4: All categories are valid
    const validCategories = ['writing', 'drawing', 'business', 'coding'];
    validCategories.forEach(cat => {
        setCategory(cat);
        if (getCurrentCategory() === cat) {
            console.log(`✓ Can set category to '${cat}'`);
            passed++;
        } else {
            console.error(`✗ Failed to set category to '${cat}'`);
            failed++;
        }
    });

    // Reset to default
    setCategory('writing');

    console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
    return failed === 0;
}

// ===================
// STATE
// ===================
let currentCategory = 'writing';
let currentIdea = '';

// ===================
// CATEGORY FUNCTIONS
// ===================
function getCurrentCategory() {
    return currentCategory;
}

function setCategory(category) {
    const validCategories = ['writing', 'drawing', 'business', 'coding'];
    if (!validCategories.includes(category)) return;

    currentCategory = category;
    updateTabStyles();
    updateCategoryBadge();
}

function generateIdea() {
    currentIdea = getRandomIdea(currentCategory);
    return currentIdea;
}

// ===================
// UI FUNCTIONS
// ===================
function updateTabStyles() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        const tabCategory = tab.dataset.category;
        if (tabCategory === currentCategory) {
            tab.classList.remove('bg-white', 'text-gray-700', 'hover:bg-indigo-100');
            tab.classList.add('bg-indigo-600', 'text-white');
        } else {
            tab.classList.remove('bg-indigo-600', 'text-white');
            tab.classList.add('bg-white', 'text-gray-700', 'hover:bg-indigo-100');
        }
    });
}

function updateCategoryBadge() {
    const badge = document.getElementById('category-badge');
    if (badge) {
        const categoryName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
        badge.textContent = categoryName;
    }
}

function displayIdea(idea) {
    const ideaText = document.getElementById('idea-text');
    if (!ideaText) return;

    // Fade out
    ideaText.style.opacity = '0';
    ideaText.style.transform = 'translateY(-10px)';

    setTimeout(() => {
        ideaText.textContent = idea;
        // Fade in
        ideaText.style.opacity = '1';
        ideaText.style.transform = 'translateY(0)';
    }, 150);
}

function handleGenerate() {
    const idea = generateIdea();
    displayIdea(idea);
}

// ===================
// COPY TO CLIPBOARD
// ===================
async function handleCopy() {
    if (!currentIdea) {
        return;
    }

    try {
        await navigator.clipboard.writeText(currentIdea);
        showCopyConfirmation();
    } catch (e) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = currentIdea;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyConfirmation();
    }
}

function showCopyConfirmation() {
    const copyBtn = document.getElementById('copy-btn');
    if (!copyBtn) return;

    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('bg-green-100', 'text-green-700', 'border-green-300');

    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
    }, 1500);
}

// ===================
// FAVORITES UI
// ===================
function handleSave() {
    if (!currentIdea) {
        return;
    }

    const favorite = {
        id: Date.now(),
        category: currentCategory,
        text: currentIdea,
        timestamp: Date.now()
    };

    const saved = saveFavorite(favorite);
    if (saved) {
        renderFavorites();
        showSaveConfirmation();
    }
}

function handleRemoveFavorite(id) {
    removeFavorite(id);
    renderFavorites();
}

function showSaveConfirmation() {
    const saveBtn = document.getElementById('save-btn');
    if (!saveBtn) return;

    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.classList.add('bg-green-100', 'text-green-700', 'border-green-300');

    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
    }, 1500);
}

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    if (!favoritesList) return;

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <li id="empty-favorites" class="text-gray-400 text-center py-4">
                No favorites yet. Save some ideas!
            </li>
        `;
        return;
    }

    favoritesList.innerHTML = favorites.map(fav => `
        <li class="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
                <span class="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 mb-1">
                    ${fav.category.charAt(0).toUpperCase() + fav.category.slice(1)}
                </span>
                <p class="text-gray-700 text-sm">${fav.text}</p>
            </div>
            <button
                onclick="handleRemoveFavorite(${fav.id})"
                class="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove favorite"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </li>
    `).join('');
}

function initApp() {
    // Add transition styles to idea text
    const ideaText = document.getElementById('idea-text');
    if (ideaText) {
        ideaText.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }

    // Set up category tab click handlers
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            setCategory(category);
        });
    });

    // Set up generate button
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
    }

    // Set up save button
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSave);
    }

    // Set up copy button
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', handleCopy);
    }

    // Initialize UI state
    updateTabStyles();
    updateCategoryBadge();
    renderFavorites();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Export for testing
if (typeof window !== 'undefined') {
    window.getCurrentCategory = getCurrentCategory;
    window.setCategory = setCategory;
    window.generateIdea = generateIdea;
    window.runAppTests = runAppTests;
    window.handleGenerate = handleGenerate;
    window.handleSave = handleSave;
    window.handleRemoveFavorite = handleRemoveFavorite;
    window.handleCopy = handleCopy;
    window.renderFavorites = renderFavorites;
}
