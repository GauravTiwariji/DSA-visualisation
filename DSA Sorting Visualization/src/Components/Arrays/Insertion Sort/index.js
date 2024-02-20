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
    $("#addItemBtn").on("click", addItem);
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

    async function insertionSort() {
        var arr = $(".chartItem").toArray();
        var num = arr.length;
        var delay=1000;
        for(var i=0;i<num;i++){
            let intial = $(arr[i]);
            let j=i-1;
            var order=0;
            while(j>=0 && parseInt($(arr[j]).text())>parseInt(intial.text())){
                await new Promise(resolve => setTimeout(resolve, delay*i));
                $(arr[j+1]).css({"order":parseInt($(arr[j+1]).text())+num});
                order++;
                arr[j+1] = arr[j];
                j=j-1;
            }
            $(arr[j+1]).css(({"order":parseInt($(arr[j+1]).text())+num}));
            arr[j+1] = intial;
        }
    }

    $("#sort").on("click", insertionSort);
});