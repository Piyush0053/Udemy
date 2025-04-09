chrome.runtime.onInstalled.addListener(() => {
    const blockedSites = [
        "*://*.pornhub.com/*",
        "*://*.xvideos.com/*",
        "*://*.redtube.com/*",
        "*://*.xhamster.com/*",
        "*://*.xnxx.com/*",
        "*://*.onlyfans.com/*",
        "*://*.chaturbate.com/*",
        "*://*.bongacams.com/*"
    ];

    let rules = blockedSites.map((url, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "redirect", redirect: { url: chrome.runtime.getURL("blocked.html") } },
        condition: { urlFilter: url, resourceTypes: ["main_frame"] }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: rules
    });
});
