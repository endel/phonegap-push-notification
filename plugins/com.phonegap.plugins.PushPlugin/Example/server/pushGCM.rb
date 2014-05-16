require 'rubygems'
require 'pushmeup'

GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyCyKqmUVbA_KijoQlE_1V6yQN-DPwqmEDg"
destination = ["APA91bF3bxkVuheGlEMotXc-YHc-xGEVbguhvFgWQeRf3zZRxHv5H06H_AtpNYVVr_kvPiXJnIFm7pJiyyCJ2FFwcqlZyJaDJ8gBk8OzXhe9BffnDUo0clH3Zm1xp31kgH-7OYsdBtR1jQTYKcLkUAXDKmxTQbkdTg"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification(destination, data)
