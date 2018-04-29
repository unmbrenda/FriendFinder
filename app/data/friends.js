let friends = [
  {
    name: "Kermit",
    image: "https://s3.amazonaws.com/southfloridareporter/wp-content/uploads/2017/07/12001843/kermit-1651325_1920.jpg",
    answers: [3, 5, 1, 2, 2]
  },
  {
    name: "Gonzo",
    image: "http://v1talworldcreative.com/wp-content/uploads/2015/10/Gonzo-Alt.jpg",
    answers: [5, 5, 4, 5, 3]
  }
]

let findFriend = function (newFriend) {
  const nfAnswers = newFriend.answers;
  let results = [];

  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    const delta = friend.answers
      .map((answer, index) => {
        return Math.abs(answer - nfAnswers[index]);
      })
      .reduce((prior, current) => {
        return prior + current;
      });

    results.push({index: i, delta});
  }

  let match = results.reduce( (prior, current) => {
    if(prior.index < 0) { return current};
    if( prior.delta < current.delta){
      return prior;
    }
    return current;
  }, {index: -1, delta: -1})

  return friends[match.index];

}

module.exports = {
  friends,
  findFriend
}
