$(document).ready(function () {
  const $writeNew = $(".write-new");
  const $newTweet = $(".new-tweet");
  const $tweetText = $("#tweet-text");
  $writeNew.click(function () {
    if ($(".new-tweet:visible").length > 0) {
      $newTweet.hide();
    } else {
      $newTweet.slideDown("slow", function () {
        $tweetText.focus();
      });
    }
  });
});
