{
  $(() => {
    $("textarea").on("input", onInput);
  });

  const onInput = function (event) {
    let count = 140 - $(this).val().length;
    const $counter = $(this).closest("form").find(".counter");
    $counter.text(count);
    if (count < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }
  };
}
