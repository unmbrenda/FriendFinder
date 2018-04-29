let friends = [
  {
    name: "Mary",
    image: "https://vignette.wikia.nocookie.net/particracy/images/9/98/Ugly_woman.png/revision/latest?cb=20150628170355",
    answers: [3, 5, 1, 4, 2, 3, 4, 2, 1, 2]
  },
  {
    name: "John",
    image: "http://www.worldstopmost.com/wp-content/uploads/2016/04/Noah-Mills-Most-Handsome-Man-2016.jpg",
    answers: [3, 5, 1, 2, 2, 3, 4, 2, 5, 2]
  },
  {
    name: "Lisa",
    image: "https://i.imgflip.com/lc4fj.jpg",
    answers: [5, 5, 4, 5, 3, 3, 2, 4, 2, 5]
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
