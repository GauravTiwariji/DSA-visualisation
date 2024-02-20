$(document).ready(function () {
    var randomColors = [
        "18C79F",
        "C7C718",
        "854354",
        "85437D",
        "436985",
        "854343"
    ];
    var numberOfChart = $(".chartItem").length + 1;

    var selectedIntegers = $(".chartNumber");
    var selectedParams = $(".chartItem");

    selectedParams.each(function (index) {
        var heightValue = parseInt($(selectedIntegers[index]).text());
        $(this).css({
            "height": 2 * heightValue + "px",
            "margin-left": "20px",
            "background-color": "#" + randomColors[index],
            "order": index
        });
    });

    function addItem() {
        var newItem = $("#floatingInputGroup1").val().trim();
        if (newItem !== "") {
            // Increment numberOfChart after using it
            var c = numberOfChart.toString();
            var color = Math.floor(Math.random() * 6) + 1;
            var newDiv = $("<div>").addClass("chartItem " + "c" + c).css({
                "height": 2 * newItem,
                "margin-left": "20px",
                "background-color": "#" + randomColors[color - 1],
                "order":c-1
            });
            $(".chart-container").append(newDiv);

            // Create a new h1 element with class and text content
            var hText = $("<h1>").addClass("chartNumber").text(newItem);

            // Append the h1 element to the new div
            $(".c" + c).append(hText);

            // Increment numberOfChart for the next iteration
            numberOfChart++;

            // Clear the input field
            $("#floatingInputGroup1").val("");
        }
    }

    var btnHover = $(".notActive");
    var activated = $(".active");
    btnHover.hover(
        function(){
            $(this).addClass("active");
            $(this).attr('aria-current', 'page');
            activated.removeClass("active");
        },
        function(){
            $(this).removeClass("active");
            $(this).removeAttr('aria-current');
            activated.addClass("active");
        }
    )

    $("#addItemBtn").on("click", addItem);

    function bubbleSort() {
        var arr = $(".chartItem").toArray();
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                // Compare adjacent elements and swap if they are in the wrong order
                (function (i, j) {
                    
                    setTimeout(function () {
                        if (parseInt($(arr[j]).text()) > parseInt($(arr[j + 1]).text())) {
                            // Swap
                            const temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
/*
                            $(".chartItem:contains(" + $(arr[j]).text() + ")").addClass("dOrder");
                            $(".chartItem:contains(" + $(arr[j + 1]).text() + ")").addClass("iOrder");
                            setTimeout(function () {
                                $(".chartItem:contains(" + $(arr[j]).text() + ")").removeClass("dOrder");
                                $(".chartItem:contains(" + $(arr[j + 1]).text() + ")").removeClass("iOrder");
                            }, 1000);
*/
                            var o1 = $(arr[j]).css("order");
                            var o2 = $(arr[j + 1]).css("order");
                            $(arr[j]).css({ "order": o2 });
                            $(arr[j + 1]).css({ "order": o1 });
                        }
                    }, 2000 * (i * (n - 1) + j));
                })(i, j);
            }
        }

        // Change the order after sorting with a delay
        setTimeout(function () {
            var order = 0;
            for (var index = 0; index < arr.length; index++) {
                var value = $(arr[index]).text();
                $(".chartItem:contains(" + value + ")").css({ "order": order });
                order++;
            }
        }, 2000 );

        return arr;
    }

    $("#sort").on("click", bubbleSort);
});
