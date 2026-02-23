const RSS_PROXY = "https://api.rss2json.com/v1/api.json?rss_url=";

const FEEDS = [
  {
    url: "https://mattstoller.substack.com/feed",
    listId: "newsletter-list",
    count: 3
  },
  {
    url: "https://feeds.buzzsprout.com/2412334.rss",
    listId: "podcast-list",
    count: 3
  }
];

async function loadFeed({ url, listId, count }) {
  const list = document.getElementById(listId);
  if (!list) return;

  try {
    const res = await fetch(RSS_PROXY + encodeURIComponent(url));
    const data = await res.json();

    if (data.status !== "ok" || !data.items?.length) return;

    const items = data.items.slice(0, count);
    list.innerHTML = items.map(item =>
      `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`
    ).join("");
  } catch (err) {
    console.warn(`Failed to load feed for #${listId}:`, err);
    // Silently fall back to hardcoded links already in the HTML
  }
}

document.addEventListener("DOMContentLoaded", () => {
  FEEDS.forEach(loadFeed);
});
