// Listen for messages from our React App
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "START_ZEN_MODE") {
    const sitesToBlock = request.blocklist;
    console.log("Zen Mode Started. Blocking:", sitesToBlock);
    
    // Create rules for the declarativeNetRequest API
    const rules = sitesToBlock.map((domain, index) => {
      return {
        id: index + 1, // Rule IDs must be integers starting from 1
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: `||${domain}`, // Perfect ad-blocker style
          resourceTypes: ["main_frame"]
        }
      };
    });

    // Clear old rules and add new ones
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({length: 50}, (_, i) => i + 1), // clear IDs 1 to 50
      addRules: rules
    });
    
    sendResponse({ status: "Blocking Active" });
  } 
  
  else if (request.action === "STOP_ZEN_MODE") {
    console.log("Zen Mode Stopped. Removing blocks.");
    
    // Remove all blocking rules
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({length: 50}, (_, i) => i + 1)
    });
    
    sendResponse({ status: "Blocking Removed" });
  }

  return true;
});