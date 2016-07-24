var menu = $('#top-navigator');
$(window).scroll(function() {
    if ($(window).scrollTop() >= 200) {
        if (!menu.hasClass('navbar-fixed-top')) {
            menu.addClass('navbar-fixed-top', 1000, "easeOutBounce");
        }
    } else {
        if (menu.hasClass('navbar-fixed-top')) {
            menu.removeClass('navbar-fixed-top', 1000, "easeOutBounce");
        }
    }
});

function ShowTime() {
    var a = new Date;
    var b = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var c = new Array("Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy");
    var d = c[a.getDay()] + ", ";
    var e = a.getYear();
    var f = a.getDate();
    if (e < 1900) e += 1900;
    if (f < 10) d += "0" + a.getDate() + "/" + b[a.getMonth()] + "/" + e;
    else d += "" + a.getDate() + "/" + b[a.getMonth()] + "/" + e;


    var g = a.getHours();
    if (g < 10) {
        g = "0" + g
    }

    var p = a.getMinutes();
    if (p < 10) {
        p = "0" + p
    }

    var s = a.getSeconds();
    if (s < 10) {
        s = "0" + s
    }

    if (document.getElementById("timer") != null) {
        document.getElementById("timer").innerHTML =  d+ ", " + g + ":" + p + ":" + s + ""
        // document.getElementById("timer").innerHTML = g + ":" + p + ":" + s + ""
    }
}

$(document).ready(function() {
    ShowTime();
    setInterval("ShowTime()", 1000);

    var currentSpan = 2;

    $('.featured-news > .nav span').click(function() {
        $(this).parent().find('span').removeClass('hover');
        $(this).addClass('hover');
        $('.featured-news-content').hide();
        $("#featured_" + $(this).text()).fadeIn('fast');

        currentSpan = parseInt($(this).text()) + 1;

        if (currentSpan > 4) currentSpan = 1;
    });

    var iShow = setInterval(function() {
        $('#nav' + currentSpan).parent().find('span').removeClass('hover');
        $('#nav' + currentSpan).addClass('hover');
        $('.featured-news-content').hide();
        $("#featured_" + $('#nav' + currentSpan).text()).fadeIn('medium');

        currentSpan++;

        if (currentSpan > 4) currentSpan = 1;
    }, 4000);

    $('.featured-news').hover(function() {
        clearInterval(iShow);
    }, function() {
        iShow = setInterval(function() {
            $('#nav' + currentSpan).parent().find('span').removeClass('hover');
            $('#nav' + currentSpan).addClass('hover');
            $('.featured-news-content').hide();
            $("#featured_" + $('#nav' + currentSpan).text()).fadeIn('medium');

            currentSpan++;

            if (currentSpan > 4) currentSpan = 1;
        }, 7000);
    });
});
