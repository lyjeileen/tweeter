/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const $tweets = $(".tweets-container");

  const createTweetElement = function (tweet) {
    let $tweet = $(`<article>
            <header>
              <div class="user">
                <image src=${tweet.user.avatars} alt="avatar" height="40">
                <div>${tweet.user.name}</div>
              </div>
              <div class="handle">${tweet.user.handle}</div>
            </header>
            <p>${tweet.content.text}</p>
            <footer>
              <div>${tweet.create_at}</div>
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
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweets.append($tweet);
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
    const $data = $form.serialize();
    $.post("/tweets/", $data)
      .then((tweet) => {
        console.log($data);
        // $tweets.prepend(createTweetElement(tweet));
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
});
