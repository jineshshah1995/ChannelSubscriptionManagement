const express = require('express')
const _ = require('lodash');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Express
const app = express();
const port = 4000;
app.use(bodyParser.json());
app.options('*', cors())
app.use(cors());

// Created Fake Database..
let userInfo = [
  {
      "username": "jinesh",
      "password": "user123"
  }, {
      "username": "Srv",
      "password": "Media"
  }
];

let subscriptionInfo = [
  {
      "username": "jinesh",
      "subscriptionInformation" : [
          {
            "ChannelID": 5,
            "ChannelName": "Star Sports",
            "ChannelType": "Sports",
            "ChannelPrice": 4,
            "ChannelOperation": "Extend",
            "ChannelSubFromDate": null,
            "ChannelSubToDate": null,
            "ChannelTotalCost": 72,
            "ChannelSubDays": 9                    
          }
      ]
  }
];


let channelsDetails =  [
  {
      "ChannelID": 1,
      "ChannelName": "Star Plus",
      "ChannelType": "Entertainment",
      "ChannelPrice": 8
  },
  {
      "ChannelID": 2,
      "ChannelName": "Star Gold",
      "ChannelType": "Entertainment",
      "ChannelPrice": 7
  },
  {
      "ChannelID": 3,
      "ChannelName": "Star Maja",
      "ChannelType": "News",
      "ChannelPrice": 3
  },
  {
      "ChannelID": 4,
      "ChannelName": "Aaj tak",
      "ChannelType": "News",
      "ChannelPrice": 12
  },
  {
      "ChannelID": 5,
      "ChannelName": "Star Sports",
      "ChannelType": "Sports",
      "ChannelPrice": 4
  },
  {
      "ChannelID": 6,
      "ChannelName": "Zoom",
      "ChannelType": "Music",
      "ChannelPrice": 1
  }
];





app.get('/getAllChannels', (req , res) => {
  res.status(200).send(channelsDetails);
});

app.post('/login', (req , res) => {
  if(!req.body.username || !req.body.password)
      return res.status(400).send('Missing Username or password')
  const { username, password } = req.body;
  const user = userInfo.find(u => { return u.username === username && u.password === password });

  if (user) {
      res.status(200).send(user);
  } else {
      res.status(200).send(null);
  }

});

app.post('/register', (req , res) => {
  if(!req.body.username || !req.body.password)
      return res.status(400).send('Missing Username or password')
  const { username, password } = req.body;

  const user = userInfo.find(u => { return u.username === username && u.password === password });

  if (user) {
      res.status(409).send('User Already Exists');
  } else {
      userInfo.push({ username , password})
      subscriptionInfo.push({ username :  username , subscriptionInformation : []})
      res.status(200).send({ flag : true});
  }
});

app.get('/getSubscriptionInfo', (req , res) => {
  if(!req.query.username)
      return res.status(400).send('Missing Username')
  const { username } = req.query;
  const userSubscription = subscriptionInfo.find(u => { return u.username === username });
  res.status(200).send(userSubscription);
  
});

app.post('/updateSubscriptionDetails',(req,res)=>{
  if(!req.body)
      return res.status(400).send('Missing subscription details')
  const { username, subscriptionInformation } = req.body;
  const userDetails = subscriptionInfo.find(u => { return u.username === username });
  if(!userDetails){
    subscriptionInfo.push({ username , subscriptionInformation})
  } else {
    userDetails.subscriptionInformation = subscriptionInformation;
    
  }
  res.status(200).send(userDetails);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

