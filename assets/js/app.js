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

    // var $logoContainer = $('.fr_logo_container');
    // var $logoInner = $('<div class="fr_logo_inner"></div>');
    // var $logos = $logoContainer.children().clone();

    $logoInner.append($logos).append($logos.clone());
    $logoContainer.empty().append($logoInner);


    //Archive filter
    $(document).ready(function() {
        var $archiveSingles     = $('.fr-archive-single');
        var $archiveNavItems    = $('.fr-archive-nav-item');
        var $archiveNav         = $('.fr-archive-nav');
        var $allNavItem         = $('.fr-archive-nav-item.is-all');
        
        function filterTags(tag) {
            $archiveSingles.fadeOut();
                $archiveSingles.each(function() { 
                    var $single = $(this);
                    var hasTag = $single.find('.fr-archive-single-tag').filter(function() {
                        return $(this).text().trim() === tag;
                    }).length > 0;
                    
                    if (hasTag) {
                        $single.fadeIn(300);
                    }
                
            });
        }
    
        //Scroll the filter selection on mobiles
        $archiveNavItems.click(function() {
            var $this   = $(this);
            var tag     = $this.text().trim();
    
            $archiveNavItems.removeClass('active');
            $this.addClass('active');
    
            if ($this.hasClass('is-all')) {
                $archiveSingles.stop(true, true).fadeOut(300, function() {
                    $archiveSingles.fadeIn(300);
                });
            } else {
                filterTags(tag);
            }
    
            var scrollLeft = $this.position().left + $archiveNav.scrollLeft() - ($archiveNav.width() / 2) + ($this.width() / 2);
    
            $archiveNav.animate({
                scrollLeft: scrollLeft
            }, 500);
        });
    
        $allNavItem.addClass('active');
        $archiveSingles.show();
    });
    


    //Archive card random color changing
    if ($('.fr-archive-single').length){
        var fr_archive_colors = [
            ["#f7f0e9", "#F5EBE0"],
            ["#f2eded", "#EAE4E9"],
            ["#f6f3e4", "#F3F0D7"]
        ];
        var colorPattern = [1, 2, 3, 2, 3, 1, 3, 1, 2];
        var patternIndex = 0; 
        $('.fr-archive-single').each(function(index) {
            var colorSetIndex = colorPattern[patternIndex]; 
        
            var colors = fr_archive_colors[colorSetIndex - 1]; 
        
            $(this).css('background-color', colors[0]);
        
            $(this).hover(
            function() {
                $(this).css('background-color', colors[1]);
            },
            function() {
                $(this).css('background-color', colors[0]);
            }
            );
        
            patternIndex = (patternIndex + 1) % colorPattern.length;
        });
    }


    //Quick nav
    var headings = $('.fr-single-blog-content-wrapper h1, .fr-single-blog-content-wrapper h2, .fr-single-blog-content-wrapper h3, .fr-single-blog-content-wrapper h4, .fr-single-blog-content-wrapper h5');
    headings.css('scroll-margin-top', '100px');
    
    headings.each(function(index) {
        var heading = $(this);
        var text = heading.text().trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        var id = $('#' + text).length ? text + '-' + index : text;
    
        heading.attr('id', id);
        $('.fr-single-blog-nav-inner').append($('<a></a>').attr('href', '#' + id).addClass('fr-single-blog-nav-link').text(heading.text()));
    });
    
    $('.fr-single-blog-nav-inner a:first').addClass('active');
    $('.fr-single-blog-nav-inner').on('click', 'a', function(event) {
        event.preventDefault();
        $('.fr-single-blog-nav-link').removeClass('active');
        $(this).addClass('active');
        document.querySelector($(this).attr('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    

});


