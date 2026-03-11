const CLIST_API_KEY = 'YOUR_CLIST_API_KEY'; // clist.by se generate karo
const CLIST_USERNAME = 'YOUR_USERNAME';

const USE_DUMMY = true; // Isko false kar dena real data ke liye
const dummyContests = [
  { event: "LeetCode Weekly Contest 400", start: new Date().toISOString(), href: "https://leetcode.com" },
  { event: "Codeforces Round 950 (Div. 2)", start: new Date(Date.now() + 86400000).toISOString(), href: "https://codeforces.com" },
  { event: "CodeChef Starters 140", start: new Date(Date.now() + 172800000).toISOString(), href: "https://codechef.com" }
];
const dummyStats = {
  lc: { totalSolved: 450, contestCount: 12, streak: 5, lastSubmit: "2026-03-07" },
  cf: { rating: 1450, rank: "Specialist", contestCount: 25, streak: 3 },
  cc: { rating: 1720, stars: "3★", contestCount: 8, streak: 2 }
};
// Dummy data update
const platformStats = {
  leetcode: { streak: 12, contests: 15, logo: "https://leetcode.com/favicon.ico" },
  codeforces: { streak: 5, contests: 32, logo: "https://codeforces.com/favicon.ico" },
  codechef: { streak: 2, contests: 8, logo: "https://www.codechef.com/favicon.ico" }
};

export const fetchUpcomingContests = async () => {
  if (USE_DUMMY) return dummyContests;
  try {
    const response = await fetch(
      `https://clist.by/api/v4/contest/?upcoming=true&order_by=start&limit=5&username=${CLIST_USERNAME}&api_key=${CLIST_API_KEY}`
    );
    const data = await response.json();
    return data.objects;
  } catch (error) {
    console.error("Contest fetch error:", error);
    return [];
  }
};
export const fetchPlatformData = async () => {
  // Real logic me yahan teeno platforms ki alag-alag calls hongi
  return platformStats; 
};
export const fetchGroupedContests = async () => {
  const allContests = [
    { event: "Weekly Contest 400", platform: "LeetCode", start: "2026-03-08T08:00:00Z" },
    { event: "Round 950 (Div. 2)", platform: "Codeforces", start: "2026-03-10T14:35:00Z" },
    { event: "Starters 140", platform: "CodeChef", start: "2026-03-12T14:30:00Z" },
    { event: "Biweekly Contest 130", platform: "LeetCode", start: "2026-03-15T15:00:00Z" }
  ];

  // Grouping by platform
  return allContests.reduce((acc, contest) => {
    (acc[contest.platform] = acc[contest.platform] || []).push(contest);
    return acc;
  }, {});
};
export const fetchUserContestStats = async (lcUser, cfUser, ccUser) => {
  if (USE_DUMMY) return {
    lcCount: dummyStats.lc.contestCount,
    cfCount: dummyStats.cf.contestCount,
    ccCount: dummyStats.cc.contestCount,
    total: dummyStats.lc.contestCount + dummyStats.cf.contestCount + dummyStats.cc.contestCount
  };

  try {
    // Codeforces contest count nikalna sabse easy hai
    const cfRes = await fetch(`https://codeforces.com/api/user.rating?handle=${cfUser}`);
    const cfData = await cfRes.json();
    const cfCount = cfData.status === "OK" ? cfData.result.length : 0;

    // LeetCode aur CodeChef ke liye hum unke respective API wrappers se count nikalenge
    // Filhal dummy logic:
    return { lcCount: 10, cfCount, ccCount: 5, total: 15 + cfCount };
  } catch (error) {
    console.error("Contest Stats Error:", error);
    return { total: 0 };
  }
};

export const fetchLCStats = async (username) => {
  if (USE_DUMMY) return dummyStats.lc;
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    return await response.json();
  } catch (error) { 
    console.error("LC Stats error:", error);    
    return null; 

}
};


export const fetchCFStats = async (handle) => {
  if (USE_DUMMY) return dummyStats.cf;
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const data = await response.json();
    return data.status === "OK" ? data.result[0] : null;
  } catch (error) {
    console.error("CF Stats error:", error);
    return null;
  }
};

// 1) CodeChef Details Fetch
export const fetchCCStats = async (username) => {
  if (USE_DUMMY) return dummyStats.cc;
  try {
    // Community API for CodeChef
    const response = await fetch(`https://codechef-api.vercel.app/${username}`);
    const data = await response.json();
    return {
      rating: data.currentRating,
      stars: data.stars
    };
  } catch (error) { 
    console.error("CC Stats error:", error);    
    return null; 
  }
};