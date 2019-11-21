
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');



/**** aqui esta lo necesario para frebase */
firebase.initializeApp({
  'messagingSenderId': '181953839266'
});

const messaging = firebase.messaging();


//Aqui termina lo de firebase angular messsaging *******************************************************


//Todos lo de srvice worker de workbox empeiza aqui
console.log('Hello from service-worker.js camuflajeado con angular firebse');




  
