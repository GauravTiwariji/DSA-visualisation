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

    $("#addItemBtn").on("click", addItem);

    function mergeSort() {
        var array = $(".chartItem").toArray();
        array = mergeSortRecursive(array);
        
        // Change the order after sorting with a delay
        var delay = 1000; // You can adjust the delay as needed
        var order = 0;
    
        function updateOrderWithDelay(index) {
            setTimeout(function () {
              //  console.log($(array[index]).text());
                $(array[index]).css({ "order": order});
                order++;
                
                // If it's the last element, trigger the final update
                if (index === array.length - 1) {
                    setTimeout(function () {
                        finalizeOrder();
                    }, delay);
                }
            }, delay * index);
        }
    
        for (var index = 0; index < array.length; index++) {
            updateOrderWithDelay(index);
        }
    }
    
    function finalizeOrder() {
        // Perform any final actions after the sorting is complete
        console.log("Sorting complete!");
    }
    

    function mergeSortRecursive(array) {
        // Base case: If the array has 1 or 0 elements, it is already sorted
        if (array.length <= 1) {
            return array;
        }
        var order = 0;
        // Split the array into two halves
        const middle = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, middle);
        const rightHalf = array.slice(middle);
        var delay = 1000;
        // Recursively sort each half
        const sortedLeft = mergeSortRecursive(leftHalf);
        const sortedRight = mergeSortRecursive(rightHalf);
        function orderDelay() {

            setTimeout(function () {
                $(".result-container").empty();

                // Append clones of elements in leftHalf
                for (var i = 0; i < leftHalf.length; i++) {
                    console.log("Left " +$(leftHalf[i]).text());
                    $(".result-container").append($(leftHalf[i]).clone());
                }
                for (var i = 0; i < rightHalf.length; i++) {
                    console.log("Right " +$(rightHalf[i]).text());
                    $(".result-container").append($(rightHalf[i]).clone());
                }
            }, delay * leftHalf.length + delay * rightHalf.length);
            
            setTimeout(function () {

                // Append clones of elements in rightHalf
                
            }, delay * leftHalf.length + delay * rightHalf.length);
        }
        
        setTimeout(function(){
            orderDelay();
        },delay*leftHalf);
        // Merge the sorted halves
        return merge(sortedLeft, sortedRight);
    }

    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        // Compare elements from the left and right arrays and merge them in sorted order
        while (leftIndex < left.length && rightIndex < right.length) {
            if (parseInt($(left[leftIndex]).text()) < parseInt($(right[rightIndex]).text())) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Add any remaining elements from the left and right arrays
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    $("#sort").on("click", mergeSort);
});
