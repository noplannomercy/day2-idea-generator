// storage.js - LocalStorage operations

// ===================
// TEST SUITE (TDD)
// ===================
function runStorageTests() {
    console.log('=== storage.js Tests ===');
    let passed = 0;
    let failed = 0;

    // Test 1: clearFavorites works
    clearFavorites();
    if (getFavorites().length === 0) {
        console.log('✓ clearFavorites empties the list');
        passed++;
    } else {
        console.error('✗ clearFavorites should empty the list');
        failed++;
    }

    // Test 2: saveFavorite adds item
    clearFavorites();
    saveFavorite({ id: 1, category: 'writing', text: 'Test idea 1' });
    if (getFavorites().length === 1) {
        console.log('✓ saveFavorite adds one item');
        passed++;
    } else {
        console.error('✗ saveFavorite should add one item');
        failed++;
    }

    // Test 3: getFavorites returns correct data
    const favorites = getFavorites();
    if (favorites[0].text === 'Test idea 1' && favorites[0].category === 'writing') {
        console.log('✓ getFavorites returns correct data');
        passed++;
    } else {
        console.error('✗ getFavorites should return correct data');
        failed++;
    }

    // Test 4: removeFavorite removes item
    clearFavorites();
    saveFavorite({ id: 1, category: 'writing', text: 'Test idea 1' });
    saveFavorite({ id: 2, category: 'drawing', text: 'Test idea 2' });
    removeFavorite(1);
    const afterRemove = getFavorites();
    if (afterRemove.length === 1 && afterRemove[0].id === 2) {
        console.log('✓ removeFavorite removes correct item');
        passed++;
    } else {
        console.error('✗ removeFavorite should remove correct item');
        failed++;
    }

    // Test 5: Max 20 limit enforced
    clearFavorites();
    for (let i = 0; i < 25; i++) {
        saveFavorite({ id: i, category: 'test', text: 'Idea ' + i });
    }
    if (getFavorites().length <= 20) {
        console.log(`✓ Max 20 limit enforced (has ${getFavorites().length})`);
        passed++;
    } else {
        console.error(`✗ Should have max 20, has ${getFavorites().length}`);
        failed++;
    }

    // Test 6: No duplicate IDs
    clearFavorites();
    saveFavorite({ id: 1, category: 'writing', text: 'Test idea 1' });
    saveFavorite({ id: 1, category: 'writing', text: 'Test idea 1' }); // Same ID
    if (getFavorites().length === 1) {
        console.log('✓ No duplicate IDs allowed');
        passed++;
    } else {
        console.error('✗ Should prevent duplicate IDs');
        failed++;
    }

    // Clean up
    clearFavorites();

    console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
    return failed === 0;
}

// ===================
// CONSTANTS
// ===================
const STORAGE_KEY = 'ideaGenerator_favorites';
const MAX_FAVORITES = 20;

// ===================
// STORAGE FUNCTIONS
// ===================
function getFavorites() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error reading favorites:', e);
        return [];
    }
}

function saveFavorite(favorite) {
    try {
        const favorites = getFavorites();

        // Check for duplicate ID
        if (favorites.some(f => f.id === favorite.id)) {
            return false;
        }

        // Add timestamp if not present
        if (!favorite.timestamp) {
            favorite.timestamp = Date.now();
        }

        // Add to beginning of list
        favorites.unshift(favorite);

        // Enforce max limit (remove oldest)
        while (favorites.length > MAX_FAVORITES) {
            favorites.pop();
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        return true;
    } catch (e) {
        console.error('Error saving favorite:', e);
        return false;
    }
}

function removeFavorite(id) {
    try {
        const favorites = getFavorites();
        const filtered = favorites.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (e) {
        console.error('Error removing favorite:', e);
        return false;
    }
}

function clearFavorites() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (e) {
        console.error('Error clearing favorites:', e);
        return false;
    }
}

// Export for testing
if (typeof window !== 'undefined') {
    window.getFavorites = getFavorites;
    window.saveFavorite = saveFavorite;
    window.removeFavorite = removeFavorite;
    window.clearFavorites = clearFavorites;
    window.runStorageTests = runStorageTests;
}
