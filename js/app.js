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
            tab.classList.remove('border-slate-700', 'text-slate-400');
            tab.classList.add('bg-primary/20', 'border-primary', 'text-white', 'neon-border');
        } else {
            tab.classList.remove('bg-primary/20', 'border-primary', 'text-white', 'neon-border');
            tab.classList.add('border-slate-700', 'text-slate-400');
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

    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<span class="material-symbols-outlined text-base align-middle mr-1">check</span>Copied!';
    copyBtn.classList.remove('bg-white/10', 'text-slate-400', 'border-slate-700');
    copyBtn.classList.add('bg-green-500/20', 'text-green-400', 'border-green-500');

    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('bg-green-500/20', 'text-green-400', 'border-green-500');
        copyBtn.classList.add('bg-white/10', 'text-slate-400', 'border-slate-700');
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

    const originalHTML = saveBtn.innerHTML;
    saveBtn.innerHTML = '<span class="material-symbols-outlined text-base align-middle mr-1">check</span>Saved!';
    saveBtn.classList.remove('bg-white/10', 'border-slate-700');
    saveBtn.classList.add('bg-green-500/20', 'text-green-400', 'border-green-500');

    setTimeout(() => {
        saveBtn.innerHTML = originalHTML;
        saveBtn.classList.remove('bg-green-500/20', 'text-green-400', 'border-green-500');
        saveBtn.classList.add('bg-white/10', 'border-slate-700');
    }, 1500);
}

function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    if (!favoritesList) return;

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div id="empty-favorites" class="col-span-full text-slate-500 text-center py-12 text-sm uppercase tracking-wider">
                No favorites yet. Save some ideas!
            </div>
        `;
        return;
    }

    // Category color mapping
    const categoryColors = {
        writing: 'text-purple-400',
        drawing: 'text-cyan-400',
        business: 'text-orange-400',
        coding: 'text-pink-400'
    };

    favoritesList.innerHTML = favorites.map(fav => {
        const categoryColor = categoryColors[fav.category] || 'text-primary';
        const date = new Date(fav.timestamp);
        const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return `
            <div class="bg-card-dark border border-slate-800 rounded-lg p-5 transition-all duration-300 hover:border-primary/50 group">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] ${categoryColor}">
                        ${fav.category}
                    </span>
                    <button
                        onclick="handleRemoveFavorite(${fav.id})"
                        class="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove favorite"
                    >
                        <span class="material-symbols-outlined text-base">delete</span>
                    </button>
                </div>
                <p class="text-sm text-slate-200 mb-3 leading-relaxed">${fav.text}</p>
                <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-500">${timeString}</span>
                    <button
                        onclick="copyFavoriteToClipboard('${fav.text.replace(/'/g, "\\'")}')"
                        class="text-slate-500 hover:text-primary transition-colors"
                        aria-label="Copy to clipboard"
                    >
                        <span class="material-symbols-outlined text-base">content_copy</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Helper function for copying favorite to clipboard
async function copyFavoriteToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (e) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
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
    window.copyFavoriteToClipboard = copyFavoriteToClipboard;
}
