'use strict';

let fs  = require( 'fs' );
let app = require( 'electron' ).remote.app;

const FILE_NAME = 'view.json';
let dataPath    = app.getPath( 'userData' ) + '/' + FILE_NAME;

function get() {
  try {
    var views = fs.readFileSync( dataPath, 'utf8' );

    return JSON.parse( views );
  } catch( e ) {
    return [];
  }
}

function set( views ) {
  try {
    fs.writeFileSync( dataPath, JSON.stringify( views ), 'utf8' );

    return true
  } catch( e ) {
    return false;
  }
}

module.exports =  {
  getViews : get,
  setViews : set
};
