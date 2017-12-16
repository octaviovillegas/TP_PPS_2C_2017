importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyDEC6ua3OMQeI_5AIHh22Axd4e_YRkhQNg",
  authDomain: "ppsfsz-18b16.firebaseapp.com",
  databaseURL: "https://ppsfsz-18b16.firebaseio.com",
  projectId: "ppsfsz-18b16",
  storageBucket: "ppsfsz-18b16.appspot.com",
  messagingSenderId: "379598590595"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});


