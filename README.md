# unipal-app
Repository for Unipal(unipal.ndev.tech) prototype app

# Setting up the environment
 Install npm
    https://docs.npmjs.com/getting-started/installing-node
    
 Install cordova
   `npm install -g cordova`
 
 Install ionic
   `npm install -g ionic`

# Cloning
`git clone https://github.com/adolfo1994/unipal-app.git`

# Running on browser
 `cd unipal-app`

 `ionic serve`
 
 
# Running on device
 `ionic add platform <platform>` where platform can be one of ios, android
 
 You need to have android sdk to run on android and be on a MacOS computer for ios
 
 `ionic build <platform>` generates either the Xcode project for ios or the APK for android
 `ionic run <platform>` runs on a plugged in device
