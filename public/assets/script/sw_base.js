import { Workbox } from 'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
    console.log('sw and cookie found');
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            if (confirm(`New content is available!. Click OK to refresh`)) {
                window.location.reload();
            }
        }
    });


    var deferredPrompt;

    window.addEventListener('beforeinstallprompt', function (e) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        showAddToHomeScreen();

    });

    function showAddToHomeScreen() {

        var a2hsBtn = document.querySelector("#install");

        a2hsBtn.style.display = "block";

        a2hsBtn.addEventListener("click", addToHomeScreen);

    }

    function addToHomeScreen() {
        var a2hsBtn = document.querySelector("#install");  // hide our user interface that shows our A2HS button
        a2hsBtn.style.display = 'none';  // Show the prompt
        deferredPrompt.prompt();  // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then(function (choiceResult) {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }

                deferredPrompt = null;

            });
    }


    wb.register();

    $('#install').on('click', function () {
        console.log(deferredPrompt, "something")
        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then(function (choiceResult) {
                if (choiceResult.outcome === 'dismissed') {
                    console.log('error')
                } else {
                    console.log('user added to home')
                }
                deferredPrompt = null;
            })
        }
    })

} else {
    console.log('no SW working!')
}