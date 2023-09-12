# Getting Started with Create React App

This project was created with LiveShare Canvas, Brainstrom Sticker and InkingManager to implement an online collaborative brainstorming Teams App.

## Environment Setup

First, run ‘npx tinylicious@latest 7070 on terminal to start LiveShare Canvas, and then open another terminal and run 'npm start'. If you have never used tinylicious before, it will ask ‘OK to proceed? (y)’, you should type ‘y’ and hit the enter button. 


### Localhost Connection
Now, test the app locally in browser. Open http://localhost:3000 to view it in the browser, the application might have some errors as it’s implemented in Teams with different settings. As long as localhost:3000 is connected, we can proceed to next step.

### Ngrok

1. Download ngrok through this \href{https://ngrok.com/download}{link}, then unzip ngrok from the terminal. 
2. After this, add token on the terminal by typing ‘ngrok config add-authtoken <token>’, please remember to replace the <token> with your unique ngrok token. 
3. Lastly, start a tunnel by typing ngrok http 3000 on terminal. 
4. If your local host port is 3000, 3000 should be replaced by the port number if your port is not 3000.
5. Copy the Forwarding link for later use.


### Deploy to Teams

1. In the code, there’s a file called manifest.json that configures all the publication information including App Azure ID, application information, and developer information. 
2. Click the json file and replace your ‘configurationUrl’ with the link you copied from ngrok, and add ‘?inTeams=true’ at the end of the link to enable it in Teams app. 
3. Login on Teams using the credentials, schedule a meeting for testing. 
4. Next, in the ‘Manage Apps’ pane, tap on ‘Upload a custom app’, choose ‘Upload an app to your organisation’s app catalogue’ and upload the modified the zip file. 
5. After uploading the app, add this app to the meeting you set up earlier. 
6. Now join the meeting and find search ‘Design Thinking’ on Apps tab. 
7. You should see a pop up, click ‘Go Home Page’ and save, now you’re all set!

