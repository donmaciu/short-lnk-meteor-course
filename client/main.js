import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';

import {routes , onAuthChange} from './../imports/routes/routes';
import './../imports/startup/simple-schema-configuration';
import {Links} from './../imports/api/links';

import {Session} from 'meteor/session';

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
  
});



Meteor.startup(()=>{
  Session.set('showVisible' , true);
  ReactDOM.render(routes, document.getElementById('app'));
});