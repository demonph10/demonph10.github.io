/**
 * Language Switch Functionality
 * Handles language switching between Chinese and English
 */

(function() {
  'use strict';

  // Language switch functionality
  function initLanguageSwitch() {
    // Get current language from page or default to Chinese
    const currentLang = document.documentElement.lang || 'zh';
    
    // Save language preference to localStorage
    function saveLanguagePreference(lang) {
      try {
        localStorage.setItem('preferred-language', lang);
      } catch (e) {
        // Handle cases where localStorage is not available
        console.warn('localStorage not available for language preference');
      }
    }

    // Get saved language preference
    function getSavedLanguagePreference() {
      try {
        return localStorage.getItem('preferred-language');
      } catch (e) {
        return null;
      }
    }

    // Update language switch links based on current page
    function updateLanguageSwitchLinks() {
      const langSwitchLinks = document.querySelectorAll('.lang-switch__link');
      const currentPath = window.location.pathname;
      
      langSwitchLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          // Ensure proper URL formation
          let targetUrl = href;
          if (targetUrl.startsWith('//')) {
            targetUrl = targetUrl.substring(1);
          }
          if (!targetUrl.startsWith('/')) {
            targetUrl = '/' + targetUrl;
          }
          link.setAttribute('href', targetUrl);
        }
        
        // Add click event to save preference
        link.addEventListener('click', function(e) {
          const targetLang = currentLang === 'zh' ? 'en' : 'zh';
          saveLanguagePreference(targetLang);
        });
      });
    }

    // Check if user should be redirected based on preference
    function checkLanguageRedirect() {
      const savedLang = getSavedLanguagePreference();
      const currentPath = window.location.pathname;
      const isEnglishPage = currentPath.startsWith('/en/');
      const isChinesePage = !isEnglishPage;

      // Only redirect if there's a saved preference different from current page
      if (savedLang && savedLang !== currentLang) {
        let targetUrl = '';
        
        if (savedLang === 'en' && isChinesePage) {
          // Redirect to English version
          if (currentPath === '/' || currentPath === '/index.html') {
            targetUrl = '/en/';
          } else {
            targetUrl = '/en' + currentPath;
          }
        } else if (savedLang === 'zh' && isEnglishPage) {
          // Redirect to Chinese version
          targetUrl = currentPath.replace('/en', '') || '/';
        }

        if (targetUrl && targetUrl !== currentPath) {
          window.location.href = targetUrl;
          return;
        }
      }
    }

    // Initialize language switch functionality
    updateLanguageSwitchLinks();
    
    // Note: Auto-redirect disabled to prevent infinite loops
    // Users can manually switch languages using the button
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitch);
  } else {
    initLanguageSwitch();
  }

})(); 