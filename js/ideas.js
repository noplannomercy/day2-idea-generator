// ideas.js - Idea database and random selection

// ===================
// TEST SUITE (TDD)
// ===================
function runIdeasTests() {
    console.log('=== ideas.js Tests ===');
    let passed = 0;
    let failed = 0;

    // Test 1: All categories exist
    const categories = ['writing', 'drawing', 'business', 'coding'];
    categories.forEach(cat => {
        if (ideas[cat] && Array.isArray(ideas[cat])) {
            console.log(`✓ Category '${cat}' exists`);
            passed++;
        } else {
            console.error(`✗ Category '${cat}' missing`);
            failed++;
        }
    });

    // Test 2: Each category has 20+ ideas
    categories.forEach(cat => {
        if (ideas[cat] && ideas[cat].length >= 20) {
            console.log(`✓ '${cat}' has ${ideas[cat].length} ideas (>=20)`);
            passed++;
        } else {
            console.error(`✗ '${cat}' needs 20+ ideas, has ${ideas[cat]?.length || 0}`);
            failed++;
        }
    });

    // Test 3: getRandomIdea returns string
    const testIdea = getRandomIdea('writing');
    if (typeof testIdea === 'string' && testIdea.length > 0) {
        console.log(`✓ getRandomIdea returns string: "${testIdea.substring(0, 30)}..."`);
        passed++;
    } else {
        console.error(`✗ getRandomIdea should return non-empty string`);
        failed++;
    }

    // Test 4: No immediate repeats (test 10 times)
    let noRepeats = true;
    let prev = getRandomIdea('writing');
    for (let i = 0; i < 10; i++) {
        let curr = getRandomIdea('writing');
        if (curr === prev) {
            noRepeats = false;
            console.error(`✗ Immediate repeat detected: "${curr}"`);
            failed++;
            break;
        }
        prev = curr;
    }
    if (noRepeats) {
        console.log('✓ No immediate repeats in 10 generations');
        passed++;
    }

    // Test 5: All ideas are non-empty strings
    let allValid = true;
    categories.forEach(cat => {
        ideas[cat]?.forEach((idea, i) => {
            if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
                console.error(`✗ Invalid idea at ${cat}[${i}]`);
                allValid = false;
                failed++;
            }
        });
    });
    if (allValid) {
        console.log('✓ All ideas are valid non-empty strings');
        passed++;
    }

    console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`);
    return failed === 0;
}

// ===================
// IDEAS DATABASE
// ===================
const ideas = {
    writing: [
        "A character who can only tell the truth when singing",
        "Two enemies stuck in an elevator during a blackout",
        "A letter arrives 50 years late with a shocking secret",
        "The last person on Earth hears a knock at the door",
        "A child's imaginary friend turns out to be real",
        "A time traveler falls in love with someone from the past",
        "A detective solves crimes using dreams",
        "Strangers discover they share the same recurring nightmare",
        "A robot learns to feel emotions for the first time",
        "A writer's characters come to life and demand changes",
        "Two people meet at the same spot every year by coincidence",
        "A ghost tries to solve their own murder",
        "A world where everyone can read minds except one person",
        "A baker discovers their pastries grant wishes",
        "Siblings reunite after 20 years with different memories of their childhood",
        "A musician can hear colors and see sounds",
        "The moon disappears and only one person notices",
        "A librarian finds a book that writes itself",
        "A village where no one can lie after sunset",
        "Two strangers switch lives for a day and prefer the other's life"
    ],
    drawing: [
        "A cityscape made entirely of food",
        "Portrait using only geometric shapes",
        "An animal wearing human clothes at work",
        "A tree that grows different objects instead of fruit",
        "Underwater city with fish as residents",
        "A dragon having afternoon tea",
        "House on clouds with rainbow bridges",
        "Robot gardening in a mechanical garden",
        "Cat astronaut exploring a cheese moon",
        "A library where books fly like birds",
        "Steampunk animal with mechanical parts",
        "A sunset scene using only warm colors",
        "Forest spirits having a midnight feast",
        "A shoe that's also a tiny house",
        "Weather emotions - what does happiness rain look like?",
        "A monster that's afraid of children",
        "Music visualized as a landscape",
        "A kitchen where ingredients cook themselves",
        "Time shown as a physical object",
        "A door between two completely different worlds"
    ],
    business: [
        "Subscription service for busy parents needing quick meals",
        "Local marketplace connecting handmade artisans with buyers",
        "App that matches pet owners with trusted pet sitters",
        "Platform for seniors to teach skills to younger generations",
        "Service that converts old photos into digital art",
        "Eco-friendly packaging solution for small businesses",
        "Virtual event platform for niche hobby communities",
        "Personalized book recommendation service using AI",
        "Workspace sharing between night-shift and day-shift workers",
        "Sustainable fashion rental for special occasions",
        "Mental health app focused on workplace stress",
        "Grocery delivery service for specialty diet needs",
        "Tool that helps freelancers manage multiple clients",
        "Platform connecting local farmers with restaurants",
        "Service helping people downsize and declutter sustainably",
        "App for neighbors to share tools and equipment",
        "Personalized vitamin subscription based on health data",
        "Remote team building activity marketplace",
        "Service that plans surprise experiences for loved ones",
        "Platform for micro-volunteering opportunities"
    ],
    coding: [
        "Build a markdown editor with live preview",
        "Create a CLI tool for organizing files by type",
        "Pomodoro timer with statistics tracking",
        "Personal finance tracker with visual charts",
        "Weather app that suggests outfit recommendations",
        "Recipe finder based on available ingredients",
        "Habit tracker with streak visualization",
        "Bookmark manager with automatic categorization",
        "Simple drawing app with shape recognition",
        "Music playlist generator based on mood",
        "Note-taking app with tag-based organization",
        "Code snippet manager with syntax highlighting",
        "Personal dashboard aggregating daily info",
        "Browser extension that blocks distracting sites",
        "Password generator with strength indicator",
        "Simple kanban board for personal tasks",
        "Typing speed test with progress tracking",
        "Color palette generator from images",
        "URL shortener with click analytics",
        "Daily journal app with mood tracking"
    ]
};

// Track last idea per category to prevent repeats
const lastIdea = {};

// Get random idea from category (no immediate repeats)
function getRandomIdea(category) {
    const categoryIdeas = ideas[category];
    if (!categoryIdeas || categoryIdeas.length === 0) {
        return null;
    }

    // If only one idea, return it
    if (categoryIdeas.length === 1) {
        return categoryIdeas[0];
    }

    // Get random idea that's different from last one
    let randomIdea;
    do {
        const randomIndex = Math.floor(Math.random() * categoryIdeas.length);
        randomIdea = categoryIdeas[randomIndex];
    } while (randomIdea === lastIdea[category]);

    // Store as last idea for this category
    lastIdea[category] = randomIdea;
    return randomIdea;
}

// Export for testing
if (typeof window !== 'undefined') {
    window.ideas = ideas;
    window.getRandomIdea = getRandomIdea;
    window.runIdeasTests = runIdeasTests;
}
