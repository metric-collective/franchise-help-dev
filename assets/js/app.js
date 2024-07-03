document.addEventListener('DOMContentLoaded', function() {
    $('#hamburger').click(function() {
        $('.mobile_menu').slideToggle();
    });
    

    //Logo carousel
    var $logoContainer  = $('.fr_logo_container');
    var $logoInner      = $('<div class="fr_logo_inner"></div>');
    var $logos          = $logoContainer.children().clone();

    $logoInner.append($logos).append($logos.clone());
    $logoContainer.empty().append($logoInner);

    function startScrolling() {
        $logoInner.css('transform', 'translateX(0)');
        $logoInner.animate({ 'transform': 'translateX(-100%)' }, 15000, 'linear', function() {
            startScrolling();
        });
    }

    startScrolling();

});

