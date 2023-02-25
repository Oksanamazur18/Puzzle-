let image = $(".img");
window.onload = function () {
  image.sort();
  random();
};

function random() {
  let arr = [];
  let n;
  let nArr = [];
  let i = 0;
  while (nArr.length < 16) {
    i++;
    n = Math.round(Math.random() * 16);

    if (n != 0) {
      arr.push(n);
    }
    nArr = [...new Set(arr)];
  }
  for (let i = 0; i < 16; i++) {
    image.eq(i).removeClass();
    image.eq(i).addClass(`img`);
    image.eq(i).addClass(`img${nArr[i]}`);
    image.eq(i).html(`<h1>${nArr[i]}</h1>`);
  }
}

// draggable-droppable
$(document).ready(function () {
  let a;
  $(".img").draggable({
    containment: ".game",
    start: function (event, ui) {
      a = $(this);
      a.css("z-index", "10");
      if (!$(".start-btn").attr("disabled")) {
        timerStart();
      }
    },
    stop: function (event, ui) {
      a.css("z-index", "2");
    },
  });

  $(".img-r").droppable({
    accept: ".img",
    activeClass: "active",
    hoverClass: "hover",
    tolerate: "fit",
    drop: function () {
      $(this).text($(a).text());
      $(this).css("color", "lightgrey");
      $(".new-btn").on("click", function () {
        location.reload();
      });
    },
  });
});

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let check = true;

// debugger

$(".check-btn").on("click", function () {
  $(".modal").show();
  $("body").css("background-color", "lightgray");
});

$(".check").on("click", function () {
  for (let i = 0; i < $(".img-r").length; i++) {
    if ($(".img-r").eq(i).html() != numbers[i]) {
      check = false;
      break;
    }
  }
  if (check) {
    $(".check").hide();
    $(".close").hide();
    $(".closeFinal").show();
    $("#still").text(`Woohoo, well done, you did it!`);
    $(".check-btn").attr("disabled", true);
    $(".check-btn").addClass("disabled");
  } else {
    $(".check").hide();
    $(".close").hide();
    $(".closeFinal").show();
    $("#still").text(`It's a pity, but you lost`);
    $(".check-btn").attr("disabled", true);
    $(".check-btn").addClass("disabled");
    $(".close").addClass("closeFinal");
  }
  check = true;
});

// timer
let count = 1;
let intervalID;
let countSS = 60;
function timerStart() {
  intervalID = setInterval(function () {
    countSS -= 1;
    if (countSS == 59) {
      count -= 1;
      $(".mm2").html(`0${count}`);
    }

    if (countSS < 10) {
      $(".ss2").html(`0${countSS}`);
      $("#time").html(`0${countSS}`);
    } else {
      $(".ss2").html(`${countSS}`);
      $("#time").html(`${countSS}`);
    }
    if (countSS == 0) {
      $(".modal").show();
      $(".check").hide();
      $("#still").text(`It's a pity, but you lost`);
      $(".check-btn").attr("disabled", true);
      $(".check-btn").addClass("disabled");
      clearInterval(intervalID);
    }
  }, 1000);

  $(".start-btn").attr("disabled", true);
  $(".start-btn").addClass("disabled");
}

function stop() {
  clearInterval(intervalID);
}

// close btn
$(".close").on("click", function () {
  $(".modal").hide();
  timerStart();
  $("body").css("background-color", "white");
});

$(".closeFinal").on("click", function () {
  $(".modal").hide();
  clearInterval(intervalID);
  $("body").css("background-color", "white");
});
