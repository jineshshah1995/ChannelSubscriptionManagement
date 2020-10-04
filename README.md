# ChannelSubscriptionManagement

# Steps to run Backend express.js (Node js)

To start the express server

1. Goto Backend_NJ folder and `run npm install`
2. Open cmd and run `node Express.js`
3. This will start your express server on port `4000`.

# Steps to run Frontend Angular

To start the angular Channel subscription management

1. Goto Frontend_AJ folder and `run npm install`
2. Open cmd and run `ng serve`
3. run npm start this will start web server on port `4200`.

# Various Operations supported in UI.

1. Application supports sign up and sign in functionality.
2. Once user registers, He/She is redirected to login page.
3. If user is authenticated then user is shown list of channels application supports as well as his/her already subscribed channel list
4. If user want to 'Extend / Resume / Pause' the already subscribed channel then he/she needs to click on edit and perform the relevant actions.
5. Various actions can be 
    a. Selecting no of days to resume and extend the subscription. 
    b. Pause the subscription by selecting the 'Pause' option from the dropdown.
6. On Save button click, The subscription information is saved in billing details(Incase of Extend and Resume only). 
7. Once the billing information is saved user need to confirm by click on save all changes button.
8. Similar set of operation can be perform by user to add new channel subscription.
9. User can filter channel list by clicking on different category button.