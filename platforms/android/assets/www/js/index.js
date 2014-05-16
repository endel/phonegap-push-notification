/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
console.log("Hello!!!!!");
var pushNotification;

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');

    console.log("Device ready!");
    pushNotification = window.plugins.pushNotification;

    console.log("push notification instance: ");
    console.log(pushNotification);

    var errorHandler = function(data) {
      console.log("push notification: error handler");
      console.log(JSON.stringify(data));
    }

    var successHandler = function(data) {
      console.log("push notification: success handler");
      console.log(JSON.stringify(data));
    }

    var tokenHandler = function(data) {
      console.log("push notification: token handler ");
      console.log(JSON.stringify(data));
    }

    // iOS
    function onNotificationAPN (event) {
      if ( event.alert ) {
        navigator.notification.alert(event.alert);
      }

      if ( event.sound ) {
        var snd = new Media(event.sound);
        snd.play();
      }

      if ( event.badge ) {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
      }
    }

    // Android and Amazon Fire OS
    function onNotification(e) {
      console.log("onNotification triggered!");
      console.log("event: " + e.event);
      // $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

      switch( e.event ) {
        case 'registered':
          if ( e.regid.length > 0 ) {
          // $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
          // Your GCM push server needs to know the regID before it can push to this device
          // here is where you might want to send it the regID for later use.
          console.log("regID = " + e.regid);
        }
        break;

        case 'message':
          // if this flag is set, this notification happened while we were in the foreground.
          // you might want to play a sound to get the user's attention, throw up a dialog, etc.
          if ( e.foreground ) {
          // $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

          // on Android soundname is outside the payload.
          // On Amazon FireOS all custom attributes are contained within payload
          var soundfile = e.soundname || e.payload.sound;
          // if the notification contains a soundname, play it.
          var my_media = new Media("/android_asset/www/"+ soundfile);
          my_media.play();
        } else {  // otherwise we were launched because the user touched a notification in the notification tray.
          if ( e.coldstart ) {
            // $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
          } else {
            // $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
          }
        }

        // $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
        //Only works for GCM
        // $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
        //Only works on Amazon Fire OS
        $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
        break;

        case 'error':
          // $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        break;

        default:
          // $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        break;
      }
    }

    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
      pushNotification.register(
        successHandler,
        errorHandler,
        {
          "senderID":"1013943151641",
          "ecb":"onNotification"
        });
    } else {
      pushNotification.register(
        tokenHandler,
        errorHandler,
        {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"onNotificationAPN"
        });
    }
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }

};
