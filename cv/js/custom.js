$(document).ready(function(e) {
    e(".navigation").singlePageNav({
        currentClass: "active"
    });
    e(".flexslider").flexslider({
        animation: "fade",
        directionNav: !1
    });
    e(".menu-toggle-btn").click(function() {
        e(".responsive-menu").stop(!0, !0).slideToggle()
    });
    // Fade scroll
    $(window).scroll(function() {
        $(".fadeTop").each(function() {
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 60) {
                $(this).addClass('ef-slide');
            }
        });
    }).trigger("scroll");

    // link scroll
    $('a[href^="#"]').click(function() {
        var the_id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(the_id).offset().top
        }, 600);
        return false;
    });
});
$(function() {
    var e = "https://huukhuyen.github.io/",
        n = {
            twitter: !0,
            facebook: !0,
            googlePlus: !0
        };
    $(".socialShare").shareButtons(e, n)
});
$("#panel,#panel2").hide(), $("#flip").click(function() {
    $("#panel,#panel2").slideToggle("slow")
});
$("a[data-gal^='prettyPhoto']").prettyPhoto({
    hook: "data-gal"
})
$("a.close").click(function(e) {
    e.preventDefault(), $(".card-me").remove()
});
$(window).load(function() {
    var e = $(".card-me");
    e.hide(), $(window).scroll(function() {
        $(window).scrollTop() + $(window).height() >= $(document).height() - 100 ? e.css("display", "block") : e.css("display", "none")
    })
});
