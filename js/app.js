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

    // Initialize UI state
    updateTabStyles();
    updateCategoryBadge();
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
}
