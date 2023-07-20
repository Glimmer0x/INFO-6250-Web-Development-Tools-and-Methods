const currentClicks = {};

const lastClicks = {};

const rank = [];

const balance = {};

setInterval(() => {
  const newRank = [];
  let totalCPS = 0;
  for (const username in currentClicks) {
    const clicks = currentClicks[username] || 0;
    const lastClick = lastClicks[username] || 0;
    const clicksPerSecond = (clicks - lastClick) / 10;
    lastClicks[username] = clicks;
    if (clicksPerSecond > 0) {
      totalCPS += clicksPerSecond;
      newRank.push({ username, clicksPerSecond });
    }
  }
  if (newRank.length > 0) {
    for (const item of newRank) {
      balance[item.username] =
        (balance[item.username] || 0) + (item.clicksPerSecond / totalCPS) * 100;
    }

    newRank.sort((a, b) => b.clicksPerSecond - a.clicksPerSecond);
    rank.splice(0, rank.length, ...newRank);
  } else {
    rank.splice(0, rank.length);
  }
}, 10000);

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  isValidUsername,
  currentClicks,
  lastClicks,
  rank,
  balance,
};
