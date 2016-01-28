// ( function( document, window ) {
//   debugger;
//
//   console.log( 'fdafsafd' );
//
//   document.addEventListener( 'DOMContentLoaded', function() {
//     document.body.addEventListener( 'click', function( event ) {
//       if ( event.target.tagName === 'A' ) {
//         var hostName = window.location.hostname;
//
//         if ( /.*?.\.*?\..*?/.test( hostName ) ) {
//           hostName = hostName.split( '.' );
//
//           hostName.shift();
//
//           hostName = hostName.join( '.' );
//         }
//
//         var regex = new RegExp( hostName );
//
//         if ( ! regex.test( event.target.href ) ) {
//           console.log( 'preventing' );
//           event.preventDefault();
//
//           window.open( event.target.href );
//         }
//       }
//     } );
//   } );
// } )( document, window );



"use strict"

const ipcRenderer = require('electron').ipcRenderer

;(function() {
  let timeout = null
  let loadInterval = setInterval(function() {
    if (document.body) {
      clearInterval(loadInterval)
      document.body.addEventListener('click', function(evt) {
        clearTimeout(timeout)
        timeout = setTimeout(function() {
          ipcRenderer.sendToHost({
            type : 'page-click',
            throttled : true
          })
        }, 1000)
      })
    }
  }, 1000)
} )()
