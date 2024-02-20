$(document).ready(function () {
    var randomColors = [
        "18C79F",
        "C7C718",
        "854354",
        "85437D",
        "436985",
        "854343"
    ];

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

    var numberOfChart = $(".chartItem").length + 1;

    function addItem() {
        var newItem = $("#floatingInputGroup1").val().trim();
        if (newItem !== "") {
            var c = numberOfChart.toString();
            var color = Math.floor(Math.random() * 6) + 1;
            var newDiv = $("<div>").addClass("chartItem " + "c" + c).css({
                "height": 2 * newItem,
                "margin-left": "20px",
                "background-color": "#" + randomColors[color - 1],
                "order": c - 1
            });
            $(".chart-container").append(newDiv);

            var hText = $("<h1>").addClass("chartNumber").text(newItem);
            $(".c" + c).append(hText);

            numberOfChart++;
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

    async function selectionSort() {
        var arr = $(".chartItem").toArray();
        var n = arr.length;
        var delay = 1000;

        for (var i = 0; i < n - 1; i++) {
            var minIndex = i;

            for (var j = i + 1; j < n; j++) {
                if (parseInt($(arr[j]).text()) < parseInt($(arr[minIndex]).text())) {
                    minIndex = j;
                }
            }

            // Wrap the swap function call within await to create a controlled delay
            if (minIndex !== i) {
                await new Promise(resolve => setTimeout(resolve, delay*i));
                swap(arr, minIndex, i);
            }
        }
    }

    function swap(arr, index1, index2) {
        var temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;

        // Update the order after the swap
        var o1 = $(arr[index1]).css("order");
        var o2 = $(arr[index2]).css("order");
        $(arr[index1]).css({ "order": o2 });
        $(arr[index2]).css({ "order": o1 });
    }

    $("#sort").on("click", selectionSort);
});
