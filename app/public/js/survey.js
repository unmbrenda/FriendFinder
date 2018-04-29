$("#submit-questions").on("click", (event) => {
  event.preventDefault();
  const surveyForm = document.getElementById("survey");

  if (!surveyForm.checkValidity()) {
    return surveyForm.reportValidity();
  }

  let name = $(".question-box>input[name=name]")[0].value;
  let image = $(".question-box>input[name=name]")[0].value;

  const sliders = $(".slider-box>input[type=range]");
  let sliderArr = [];
  for (let i = 0; i < sliders.length; i++) {
    const slider = sliders[i];
    sliderArr.push(slider);
  }

  const ordered = sliderArr
    .sort((prior, next) => {
      const pi = parseInt(prior.getAttribute("data-index"));
      const ni = parseInt(next.getAttribute("data-index"));
      return (pi - ni);
    });

  const answers = ordered.map( slider => {
    return slider.value;
  });

  let survey = {
    name,
    image,
    answers
  };

  $.ajax({
    url: "/api/friends",
    type: "post",
    data: { survey: JSON.stringify(survey) },
    dataType: "json",
    success: function (data, status, header) {
      showFriend(data);
      surveyForm.reset();
    }
  })
  .fail( err => {
    alert(err.responseJSON.error);
  });

});

function showFriend(friend) {
  $("#friend-pic").attr("src", friend.image);
  $(".modal-friend-name").text(friend.name);
  modal.style.display = "block";
}