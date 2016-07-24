$(document).ready(function(e) {
    e(".navigation").singlePageNav({
        currentClass: "active"
    }), e(".flexslider").flexslider({
        animation: "fade",
        directionNav: !1
    }), e(".menu-toggle-btn").click(function() {
        e(".responsive-menu").stop(!0, !0).slideToggle()
    })
}), $(window).load(function() {
    $(".preloader").fadeOut(1e3)
}), $(function() {
    (new WOW).init(), $(".nav").singlePageNav({
        offset: 70
    }), $(".navbar-collapse a").click(function() {
        $(".navbar-collapse").collapse("hide")
    })
}), $(function() {
    var e = "https://huukhuyen.github.io/",
        n = {
            twitter: !0,
            facebook: !0,
            googlePlus: !0
        };
    $(".socialShare").shareButtons(e, n)
}), $("#panel,#panel2").hide(), $("#flip").click(function() {
    $("#panel,#panel2").slideToggle("slow")
}), $("a[data-gal^='prettyPhoto']").prettyPhoto({
    hook: "data-gal"
}), $("a.close").click(function(e) {
    e.preventDefault(), $(".card-me").remove()
}), $(window).load(function() {
    var e = $(".card-me");
    e.hide(), $(window).scroll(function() {
        $(window).scrollTop() + $(window).height() >= $(document).height() - 100 ? e.css("display", "block") : e.css("display", "none")
    })
});
