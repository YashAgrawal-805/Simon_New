var level_number = 1;

function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function problem_generator(level_number) {
    var input = [];
    var items = document.querySelectorAll(".item"); // Cache the items
    for (var i = 0; i < level_number; i++) {
        var button_number = Math.floor(4 * Math.random());
        (function (button_number) { // Use a closure to capture the correct button_number
            setTimeout(function () {
                items[button_number].classList.add("button-new");
                var audio = new Audio("button-" + button_number + ".mp3");
                audio.play();
                setTimeout(function () {
                    items[button_number].classList.remove("button-new");
                }, 100);
                input.push(button_number);
            }, i * 1000); // Use a delay that increases with each iteration
        })(button_number);
    }
    return input;
}

if (document.querySelector("h1").textContent === "Press START to play game") {
    document.querySelector(".Start").addEventListener("click", function (event) {
        level_number = 1;
        var audio = new Audio("button-1.mp3");
        audio.play();
        document.querySelector("h1").innerHTML = "LEVEL - " + level_number+"<br>WAIT TILL PATTERN IS GENERATING";
        var input = problem_generator(level_number);
        var output = [];
        var items = document.querySelectorAll(".item"); // Cache the items
        for (let i = 0; i < 4; i++) {
            (function (index) { // Use a closure to capture the correct index
                items[index].addEventListener("click", function () {
                    items[index].classList.add("button-new");
                    var audio = new Audio("button-" + index + ".mp3");
                    audio.play();
                    setTimeout(function () {
                        items[index].classList.remove("button-new");
                    }, 100);
                    output.push(index);
                    if (arraysMatch(input, output)) {
                        level_number = level_number + 1;
                        document.querySelector("h1").innerHTML = "LEVEL - " + level_number+"<br>WAIT TILL PATTERN IS GENERATING";
                        console.log(input + "/" + output);
                    }
                    if (input.length === output.length) {
                        if (!arraysMatch(input, output)) {
                            level_number = 0;
                            document.querySelector("h1").innerHTML = "YOU LOST!!<br>PRESS A KEY";
                        }
                        setTimeout(function () {
                            input = problem_generator(level_number);
                        }, 1000);
                        output = [];
                    }
                });
            })(i);
        }
    });
}
