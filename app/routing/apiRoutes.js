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
      newFriend.image = "https://yt3.ggpht.com/a-/AJLlDp1zbK9dJ35g9R2Q-WwZmlbUFKqx3NHYCm4bwg=s900-mo-c-c0xffffffff-rj-k-no";
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
    res.send({error: "well, that didn't work"});
  }
});

module.exports = router;