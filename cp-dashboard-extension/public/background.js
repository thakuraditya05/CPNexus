// ── SINGLE UNIFIED BACKGROUND SCRIPT ──

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("🔥 BACKGROUND SCRIPT AWAKE! Action Received:", request.action);

  // 1️⃣ ── START ZEN MODE (BLOCK SITES) ──
  if (request.action === "START_ZEN_MODE") {
    const sitesToBlock = request.blocklist;
    console.log("Zen Mode Started. Blocking:", sitesToBlock);
    
    if (!sitesToBlock || sitesToBlock.length === 0) {
      console.warn("⚠️ WARNING: Blocklist empty. No sites to block.");
      sendResponse({ status: "No sites to block" });
      return true;
    }

    const rules = sitesToBlock.map((domain, index) => {
      return {
        id: index + 1, 
        priority: 1, 
        action: { type: "block" },
        condition: { urlFilter: `||${domain}`, resourceTypes: ["main_frame"] }
      };
    });

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({length: 50}, (_, i) => i + 1),
      addRules: rules
    }, () => {
      if (chrome.runtime.lastError) console.error("❌ Block Error:", chrome.runtime.lastError);
      else console.log("✅ Blocking Rules Applied!");
    });
    
    sendResponse({ status: "Blocking Active" });
  } 
  
  // 2️⃣ ── STOP ZEN MODE (UNBLOCK SITES) ──
  else if (request.action === "STOP_ZEN_MODE") {
    console.log("🛑 Zen Mode Stopped. Removing all blocks.");
    
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: Array.from({length: 50}, (_, i) => i + 1)
    }, () => {
      if (chrome.runtime.lastError) console.error("❌ Unblock Error:", chrome.runtime.lastError);
      else console.log("✅ All Blocks Removed!");
    });
    
    sendResponse({ status: "Blocking Removed" });
  }

  // 3️⃣ ── SHOW NOTIFICATION ──
  else if (request.action === "TIMER_FINISHED") {
    console.log("🔔 Timer finished! Triggering Chrome Notification...");
    
    chrome.notifications.create(
      {
        type: "basic",
        iconUrl: "icons/icon128.png", // Ensure this path is 100% correct in your public folder!
        title: "Zen Mode Completed! 🎯",
        message: "Bhai, focus session khatam! Ab thoda break le lo.",
        priority: 2,
        requireInteraction: true 
      }, 
      (notificationId) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Notification Error:", chrome.runtime.lastError.message);
        } else {
          console.log("✅ Notification successfully shown! ID:", notificationId);
        }
      }
    );
    sendResponse({ status: "Notification Triggered" });
  }

  return true; // Required for async sendResponse
});