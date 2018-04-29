const express = require('express');
const router = express.Router();
var validUrl = require('valid-url');

var friendsControl = require('../data/friends');
var friends = friendsControl.friends;
var findFriend = friendsControl.findFriend;

router.get('/friends', (req, res) => {
  res.json(friends);
});

router.post('/friends', (req, res) => {
  try {

    let incomming = JSON.parse(req.body.survey);

    let newFriend = {
      name: incomming.name,
      image: incomming.image,
      answers: incomming.answers
    }

    if(!validUrl.isUri(newFriend.image)){
      newFriend.image = "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png";
    }
    // console.log(incomming.answers);

    let existingFriend = friends.find( friend => {
      return friend.name === newFriend.name;
    })

    if(existingFriend){
      return res.status(500).send({error: "Friend already exists"});
    }

    let suggestedFriend = findFriend(newFriend);
    friends.push(newFriend);
    res.json(suggestedFriend);

  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({error: "Sorry that didn't work"});
  }
});

module.exports = router;