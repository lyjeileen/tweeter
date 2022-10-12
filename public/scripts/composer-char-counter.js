$(document).ready(function () {
  $("textarea").on("input", function (event) {
    let count = 140 - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    counter.text(count);
    if (count < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
