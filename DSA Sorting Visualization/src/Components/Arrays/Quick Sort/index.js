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
    async function quickSort(arr, elements) {
        if (arr.length <= 1) {
            return arr;
        }
        var delay=1000;
        var order = 0;
        const pivot = arr[0];
        const left = [];
        const right = [];
        console.log(pivot);
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        await new Promise(resolve => setTimeout(resolve, delay*order));
        const sortedLeft = await quickSort(left, elements);
        for(var i=0;i<sortedLeft.length;i++,order++){
            await new Promise(resolve => setTimeout(resolve, delay*i));
            $(".chartItem:contains("+sortedLeft[i]+")").css({"order":order});
        }
        const sortedRight = await quickSort(right, elements);
        for(var i=0;i<sortedRight.length;i++,order++){
            await new Promise(resolve => setTimeout(resolve, delay*i));
            $(".chartItem:contains("+sortedRight[i]+")").css({"order":order});
        }
        const sortedArray = [...sortedLeft, pivot, ...sortedRight];
        // Update the order of associated DOM elements
        for (let i = 0; i < sortedArray.length; i++) {
            const height = sortedArray[i];
            elements.filter(`:contains(${height})`).css("order", i);
        }
    
        return sortedArray;
    }
    

    function sortH1Elements() {
        const h1Elements = $(".chartNumber");
        const h1Array = $.makeArray(h1Elements);
        const chartItems = $(".chartItem");
    
        console.log(h1Array);
        const sortedH1Array = quickSort(h1Array.map(element => parseInt($(element).text())), chartItems);
    }
    
    $("#sort").on("click",sortH1Elements);

});
