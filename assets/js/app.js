document.addEventListener('DOMContentLoaded', function() {
    $('#hamburger').click(function() {
        $('.mobile_menu').slideToggle();
    });
    $("#header").load("header.html");
    $("#footer").load("footer.html");

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

    //Archive filter
    function filterTags(tag) {
        $('.fr-archive-single').each(function() {
            var hasTag = false;
            $(this).find('.fr-archive-single-tag').each(function() {
                if ($(this).text().trim() === tag) {
                    hasTag = true;
                    return false;
                }
            });
            if (hasTag) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $('.fr-archive-nav-item').click(function() {
        var tag = $(this).text().trim();
        $('.fr-archive-nav-item').removeClass('active');
        $(this).addClass('active');

        if ($(this).hasClass('is-all')) {
            $('.fr-archive-single').show();
        } else {
            filterTags(tag);
        }

        // Smooth scroll to center the clicked item
        var $this = $(this);
        var $container = $('.fr-archive-nav');

        var scrollLeft = $this.position().left + $container.scrollLeft() - ($container.width() / 2) + ($this.width() / 2);

        $container.animate({
            scrollLeft: scrollLeft
        }, 500);
    });

    $('.fr-archive-nav-item.is-all').addClass('active');
    $('.fr-archive-single').show();


    //Archive card random color changing
    var fr_archive_colors = [
        ["#f7f0e9", "#F5EBE0"],
        ["#f2eded", "#EAE4E9"],
        ["#f6f3e4", "#F3F0D7"],
        ["#f7f0e9", "#F5EBE0"]
    ];

    // Shuffle array function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    $('.fr-archive-single').each(function(index) {
        var row = Math.floor(index / 3);

        if (index % 3 === 0) {
            fr_archive_colors = shuffle(fr_archive_colors);
        }

        var colors = fr_archive_colors[index % 3];
        $(this).css('background-color', colors[0]);
        $(this).hover(
            function() {
                $(this).css('background-color', colors[1]);
            },
            function() {
                $(this).css('background-color', colors[0]);
            }
        );
    });

    //Carousel
    var $logoContainer = $('.fr_logo_container');
    var $logoInner = $('<div class="fr_logo_inner"></div>');
    var $logos = $logoContainer.children().clone();

    $logoInner.append($logos).append($logos.clone());
    $logoContainer.empty().append($logoInner);

});


