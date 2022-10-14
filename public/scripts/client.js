$(document).ready(function () {
  const $tweets = $(".tweets-container");

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let $tweet = $(`<article>
            <header>
              <div class="user">
                <image src=${tweet.user.avatars} alt="avatar" height="40">
                <div>${tweet.user.name}</div>
              </div>
              <div class="handle">${tweet.user.handle}</div>
            </header>
            <p>${escape(tweet.content.text)}</p>
            <footer>
              <div>${timeago.format(tweet["created_at"])}</div>
              <div class="icon">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    $tweets.empty();
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweets.prepend($tweet);
    });
  };

  const loadtweets = function () {
    $.get("/tweets/")
      .then((tweets) => renderTweets(tweets))
      .catch((error) => {
        console.log("error", error);
      });
  };

  loadtweets();

  const $form = $("form");
  $form.submit(function (event) {
    event.preventDefault();

    const $counter = $(this).find(".counter");
    const $count = $counter.val();
    const $error = $(this).find("#error");
    const $errorMessage = $("#errorMessage");
    if ($count === "140") {
      $errorMessage.val("");
      $errorMessage.text("Error: Please type something.");
      $error.slideDown("slow");
    } else if ($count < 0) {
      $errorMessage.val("");
      $errorMessage.text("Error: Exceed word limits!");
      $error.slideDown("slow");
    } else {
      $error.css("display", "none");
      const $data = $form.serialize();
      $.post("/tweets/", $data)
        .then(() => {
          //remove text from text area and reload page
          $("#tweet-text").val("");
          $counter.text(140);
          loadtweets();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  });

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
