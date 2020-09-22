/**
 * Open the given URL
 * @param  {String}   type Type of navigation
 * @param  {String}   page The URL to navigate to
 * @param  {Function} done Function to execute when finished
 */

// const router = (pageType) => {
//     switch (pageType) {
//     default:
//       return '/index.html';
//     }
//   };
  
  module.exports = (pageName) => {
    /**
   * The URL to navigate to
   * @type {String}
   */
  console.log('>>>>>>>>>>>', pageName)
    const url = `http://google.com`
  
    browser.url(url);
  } 