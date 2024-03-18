/**
 * Check if the URL is a YouTube link.
 *
 * @param {string} url - The URL to be checked.
 * @return {boolean} Returns true if the URL is a YouTube link, false otherwise.
 */
const isYoutube = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/;
  if (!regex.test(url)) {
    return false;
  }
  return true;
};

/**
 * Check if the URL is a YouTube shorts link.
 *
 * @param {string} url - The URL to be checked.
 * @return {boolean} Returns true if the URL is a YouTube shorts link, false otherwise.
 */
const isShorts = (url) => {
  const regex = /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/.*$/;
  if (!regex.test(url)) {
    return false;
  }
  return true;
};

// Start function when clicked on the extension icon
chrome.action.onClicked.addListener((tab) => {
  // Get the current tab URL
  let currentTabUrl = tab.url;

  if (!isYoutube(currentTabUrl)) {
    console.warn("not youtube URL");
    return;
  }
  if (!isShorts(currentTabUrl)) {
    console.warn("not youtube shorts URL");
    return;
  }

  const regex = /\/shorts\/([^\/]+)/;
  // Get the shorts id from the URL
  let shortsId = currentTabUrl.match(regex)[1];
  
  // Create a new tab with the YouTube video URL
  chrome.tabs.create({ url: `https://www.youtube.com/watch?v=${shortsId}` });
});
