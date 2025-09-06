(function() {
  // Configuration - use Page username or numeric Page ID (recommended)
  const recipient = 'AmazonSellersNetwork'; // page username or numeric id
  const mMeUrl = `https://m.me/${recipient}`;                // universal web/app link
  const messengerWeb = `https://www.messenger.com/t/${recipient}`; // messenger.com fallback
  const messengerApp = `fb-messenger://user-thread/${recipient}`;  // deep link for Messenger app

  function openUrl(url, target = '_self') {
    try {
      if (target === '_blank') window.open(url, '_blank', 'noopener');
      else window.location.href = url;
    } catch (e) {
      window.location.href = url;
    }
  }

  // Try to open the Messenger app on mobile, then fall back to m.me or messenger.com
  function redirectToMessenger() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Try app deep link first, then fallback to m.me
      const start = Date.now();
      // On many mobile browsers, setting href to the app scheme will either open app or fail silently.
      openUrl(messengerApp);
      // After short delay, if still on the page, open m.me (this will open web or prompt app install)
      setTimeout(() => {
        // If user agent didn't leave the page (time elapsed small), go to m.me
        if (Date.now() - start < 1500) {
          openUrl(mMeUrl, '_self');
        }
      }, 1000);
    } else {
      // Desktop: open m.me in a new tab (if logged-in, opens chat)
      openUrl(mMeUrl, '_blank');
    }
  }

  // Attach to a specific trigger button or link (id="open-messenger")
  document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('open-messenger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        redirectToMessenger();
      });
    }
  });
})();