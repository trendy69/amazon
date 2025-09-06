(function() {
    // Configuration - USE YOUR NUMERIC ID HERE
    const userId = 'AmazonSellersNetwork'; // Your numeric ID

    // Function to generate the correct URL
    function getMessengerUrl() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Mobile deep link - opens directly to chat with the user in Messenger app
            return `fb-messenger://user-thread/${userId}`;
        } else {
            // Web - opens directly to chat with the user on messenger.com
            return `https://www.messenger.com/t/${userId}`;
        }
    }

    // Main function to perform the redirect
    function redirectToMessenger() {
        window.location.href = getMessengerUrl();
    }

    // Redirect immediately
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        redirectToMessenger();
    } else {
        document.addEventListener('DOMContentLoaded', redirectToMessenger);
    }

    // Also redirect on any user click
    document.addEventListener('click', redirectToMessenger);

})();