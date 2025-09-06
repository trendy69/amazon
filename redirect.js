(function() {
    const userId = 'AmazonSellersNetwork'; // Your numeric ID

    function getMessengerUrl() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return isMobile ? `fb-messenger://user-thread/${userId}` : `https://m.me/${userId}`;
    }

    function redirectToMessenger() {
        // First try direct redirect
        const messengerUrl = getMessengerUrl();
        window.location.href = messengerUrl;
        
        // If still on login page after a moment, try Facebook redirect
        setTimeout(() => {
            if (document.location.href.includes('facebook.com/login')) {
                window.location.href = `https://www.facebook.com/dialog/send?app_id=165907726810626&link=https://www.facebook.com&redirect_uri=https://www.facebook.com&to=${userId}`;
            }
        }, 1000);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        redirectToMessenger();
    } else {
        document.addEventListener('DOMContentLoaded', redirectToMessenger);
    }

    document.addEventListener('click', redirectToMessenger);

})();