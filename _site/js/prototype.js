/*jshint browser: true, devel: true, jquery: true*/



$(document).ready(function () {
    
    // Max amount for grants 'showing. and function to keep number between 0 and max_showing.
    var max_showing = 87;
    var max_min_count = function(number){
        var count = number;
        if (count > 131) {
            count = 131;
        } else if (count < 10) {
            count = 11;
        }
        return count; 
    };

    
    // Main navigation functionality
    $('.navbar-nav .nav-item.dropdown').on('click', function(){
        $(this).find('.navigation-first-level-menu').toggleClass('show');
    });

    $('body').click(function(e){
        var top_menu_link = $('.navigation-main-menu > .nav-item').has(e.target).length > 0,
            dropdown_menu = $('dropdown-menu').has(e.target).length > 0;
        
        if(!top_menu_link) {
            
            $('.dropdown-menu').each(function(){
                $(this).removeClass('show');
            });
        } else {
        }
    });
    
    // Main nav - top level links
    $('#navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_2').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/finder/tool.html";
    });
    $('#navbarDropdownMenuLink_3').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/expertise-and-advice.html";
    });
    $('#navbarDropdownMenuLink_4').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/events/events-finder.html";
    });
    $('#navbarDropdownMenuLink_5').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/news.html";
    }); 

    // Mobile nav (for the moble test version only)
    $('.mobile-test .collapse').css('display', 'none');
    
    $('#ChangeToggle').on('click', function(){
        $('.mobile-test .collapse').toggleClass('open');
    });
    
    $('.mobile-test #navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/registrations";     
    });
    $('.mobile-test #navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-final/planning";
    });
    
    $('#ChangeToggle').on('click', function(){
        $('#navigation-bar').slideToggle();
    });
    $(window).on('resize', function(){
        if ($(window).width() < 770) {
            $('#navigation-bar').hide();
        } else {
           $('#navigation-bar').show(); 
        }
    });
    
    
    
    // Information page accordions
    $('.accordion-item-tile').on('click', function(){
        $(this).parents('.accordion-item').toggleClass('open');
        $(this).parents('.accordion-item').find('.accordion-item-content').slideToggle(400);
    });
    
    
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).remove();
        }
    });
    $('.breadcrumb-home-wrapper').last().addClass('last');

    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i];
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-option=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
    }

    if ($( ".anchor-menu .sticky-container" ).length) {

        // Apply menu stickiness
        menuStickiness();
        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-option
        $('.anchor-menu a').each(function(){
            
            // Get rid of punctuation before converting it an ID.
             var a_text = $(this).text(),
                element_name = a_text.replace(". ", "");
                element_name = element_name.replace(/\s+/g, '-').toLowerCase();
                element_name = element_name.replace("'", "");
                element_name = element_name.replace(",", "");
                element_name = element_name.replace(/[0-9]/g, '');
                var name_str = '#' + element_name;
                var element_position = $(name_str).offset();
                //console.log(element_position);
                      
            if ($(name_str).length){
                $(this).attr('data-option', Math.round(element_position.top));
        
                $(this).on('click', function(){
                    $([document.documentElement, document.body]).animate(
                        { scrollTop: $(name_str).offset().top }, 400);
                    $('.anchor-menu a').removeClass('active-sticky');
                    $(this).addClass('active-sticky');
                });
            }   
        });   
    } // END if .anchor-menu .sticky-container EXISTS
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    

   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $('.inactive-path').on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
        $(".shortlist-wrapper-2").removeClass("active");
    });
    
    // Search not working modal
    $(".search-bar-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });

    
    
    // FUNCTION TO COUNT and SET active filter counts
    var all_filter_types = ['event-type', 'date', 'topic', 'postcode'];
    var subcategory_filters = ['date', 'topic', 'location'];
   

    var add_filter_classes= function(filter_type, filter_option, filter_label){
        var show_class = filter_type + "-show";
        var hide_class = filter_type + "-hide";
        var parent = $("label[data-option='" + filter_option + "']").parents('.checkbox-item');
        var grandparent = $("label[data-option='" + filter_option + "']").parents('.filter-item').attr('ID');
        
        $(".search-card-result").each(function(){
            $(this).removeClass(show_class);   
            $(this).removeClass(hide_class);    
        }); 
        
        var selected_items = [];
        $('#'+grandparent + " .checkbox-item.selected").each(function(){  
            var item = $(this).attr('data-label');
            selected_items.push(item);    
        });
        
        //console.log(selected_items);

              
        $(".search-card-result").each(function(){
             
            for (var m = 0; m < selected_items.length; m++ ) {
                if ($(this).hasClass(selected_items[m])) {  
                    $(this).addClass(show_class);
                    $(this).removeClass(hide_class);
                }
            }
        });
        
        $(".search-card-result").each(function(){
           
            if( selected_items.length === 0 ) {
                $(this).removeClass(hide_class);
                $(this).removeClass(show_class);
            } else {
                if (!$(this).hasClass(show_class) ) {
                   $(this).addClass(hide_class);
                } 
            }   
        });
        
        var filter_count = sessionStorage.getItem(grandparent);
        
        if(filter_count === null) {
            filter_count = 0;
        }
        
        if(parent.hasClass('selected')) { 
            sessionStorage.setItem(filter_option, "true");
            filter_count = +filter_count  +1;
            sessionStorage.setItem(grandparent, filter_count);
        
        } else {
            sessionStorage.removeItem(filter_option);
            filter_count = +filter_count  -1;
            sessionStorage.setItem(grandparent, filter_count);    
        }
       
    };
    
    // FUNCTION TO HIDE SHOW SPECIFIC TASK RESULT
    var task_result_display = function(filter_types, result_item){
        
        var active_count = 0;
        for ( var k = 0; k < filter_types.length; k++) {
            var filter_state = sessionStorage.getItem(filter_types[k]);
            
            if (filter_state > 0) {
                
                active_count = parseInt(active_count, 10) + parseInt(filter_state, 10);
            }
        }
        console.log(active_count);
        
        if (active_count === 0) {
            $(result_item).addClass('no-filters');
        } else if (active_count > 0 ) {
            $(result_item).removeClass('no-filters');
        }
    };
    
     
    
    
    
    // FUNCTION TO ADD CLASSES FOR FILTERING RESULTS (checkbox items)
    /*var add_filter_classes= function(filter_type, filter_option, filter_label){
        
        var show_class = filter_type + "-show";
        var hide_class = filter_type + "-hide";
        var parent = $("label[data-option='" + filter_option + "']").parents('.checkbox-item');
        var grandparent = $("label[data-option='" + filter_option + "']").parents('.filter-item').attr('ID');

        var filter_count = sessionStorage.getItem(grandparent);
        if(filter_count === null) {
            filter_count = 0;
        }
        
        if(parent.hasClass('selected')) { 
            
            sessionStorage.setItem(filter_option, "true");
            
            filter_count = +filter_count  +1;
            
            sessionStorage.setItem(grandparent, filter_count);
            
            $(".search-card-result").each(function(){
                if ($(this).hasClass(filter_label)) {
                    $(this).addClass(show_class);
                    $(this).removeClass(hide_class);
                } 
            }); 
            
        } else {

            sessionStorage.removeItem(filter_option);
            
            filter_count = +filter_count  -1;
            sessionStorage.setItem(grandparent, filter_count);
            
            $(".search-card-result").each(function(){
                if ($(this).hasClass(filter_label)) {
                    $(this).removeClass(show_class); 
                } 
            }); 
            
        }
        
        if($("#" + filter_type + " .checkbox-item.selected").length === 0) {
            
            $(".search-card-result").each(function(){
                $(this).removeClass(hide_class);
                $(this).removeClass(show_class);
            });
        } else {
           
            $(".search-card-result").each(function(){
            
                if (!$(this).hasClass(show_class)) {
                    $(this).addClass(hide_class);
                }
            });
        }         
        
    };
    */
    
     

    // FILTER ACCORDIONS
    // Open filter accordions
    $('.filter-item-title').on('click', function(){
        
        if ( $(this).hasClass('open') ) {
            $(this).parents('.filter-item').find('.filter-item-content').slideUp();
            $(this).removeClass('open');
        } else { 
            $('.filter-item-content').slideUp();
            $('.filter-item-title').removeClass('open');
            
            $(this).parents('.filter-item').find('.filter-item-content').slideDown();
            $(this).addClass('open');
        }
        
    });
   
    
    // FILTER SELECTONS
    // Select filter 'bubble' options - multiple select
    $('.active-filters.multi-select li').on('click', function(){
        
        //total_active_filters();
        
        var filter_option = $(this).attr('data-option');
        var filter_label = $(this).attr('data-label');
        var filter_type = $(this).parents('.filter-item').attr('ID');

        sessionStorage.removeItem(filter_option);
        
        $(this).toggleClass('selected');
        $(".checkbox-item[data-option='" + filter_option + "']").toggleClass('selected');

        add_filter_classes(filter_type, filter_option, filter_label);
        count_results();
        task_result_display(subcategory_filters, "#search-result-Z");
        
    });

    
    // Select filter checkbox options
    $('.checkbox-item label').on('click', function(){
                
        //total_active_filters();
        
        var filter_option = $(this).attr('data-option');
        var filter_label = $(this).attr('data-label');
        var filter_type = $(this).parents('.filter-item').attr('ID');
        
        $(this).parents('.checkbox-item').toggleClass('selected');
        $(this).parents('.filter-item').find('.active-filters li[data-option="' + filter_option +'"]').toggleClass('selected ');
  
        add_filter_classes(filter_type, filter_option, filter_label);
        count_results();
        task_result_display(subcategory_filters, "#search-result-Z");
                   
    }); 
    
    // On demand click disables date filter  
    /*$('#event-type .checkbox-item').on('click', function(){
        //console.log('selected');
        
        if ( $('label[data-option="past-recorded-events"]').parents('.checkbox-item').hasClass('selected') ) {
            
            if ($('label[data-option="in-person-events"]').parents('.checkbox-item').hasClass('selected') || $('label[data-option="online-events"]').parents('.checkbox-item').hasClass('selected')) {
                $("#date").removeClass('hidden');
                $("#date").slideDown();
            } else {
                $("#date").addClass('hidden');
                $("#date .checkbox-item").each(function(){
                    $(this).removeClass('selected');
                });
                
                $('li[filter-type="date"]').each(function(){
                    $(this).removeClass('selected');
                });
                
                var filter = "date";
                var date_options  = ["this-month", "this-month-plus-1", "this-month-plus-2"];
                
                sessionStorage.setItem('date', 0);
                for ( var j = 0; j < date_options.length; j++){ 
                    sessionStorage.removeItem(date_options[j]);
                }
                $('.search-card-result').each(function(){
                    $(this).removeClass('date-hide date-show');
                });
                $('#date .filter-item-title').removeClass('open');
                $('#date .filter-item-content').slideUp();
                $('#date').slideUp();
                
                
                count_results();
                
            }
        } else {
            $("#date").removeClass('hidden');
            $("#date").slideDown();
        }
    });*/
    
    
    // Select filter text input options (postcode field)
    $('.text-field-filter button').on('click', function(){
        
        var filter_option = $(this).parents(".filter-item-content").find("label").attr('data-option');
        var filter_label = $(this).parents(".filter-item-content").find("label").attr('data-label');
        var filter_type = $(this).parents('.filter-item').attr('ID');
        var postcode_val = $(this).parents('.filter-item-content').find('input').val();
   
        $(this).parents('.text-field-filter').find('.active-filters li').text(postcode_val).addClass('selected');
        $(this).parents('.text-field-item').addClass('selected');
        
        $('#search-result-Z').removeClass('no-filters');
        
        sessionStorage.setItem(filter_option, true);
        sessionStorage.setItem(filter_type + "_value", postcode_val);
        sessionStorage.setItem(filter_type, 1);
        
        var show_class = filter_type + "-show";
        var hide_class = filter_type + "-hide";
        
         
        $(".search-card-result").each(function(){
           
            if ( $(this).hasClass(filter_type)) {
                $(this).addClass(show_class);
            } else {
                $(this).addClass(hide_class);
            }
            }); 
        
        count_results();
         
    });
    
    $(".text-select li").on('click', function(){
        
        var filter_type = $(this).parents('.filter-item').attr('id');
        var filter_option = $(this).attr('data-option');
        
        
        sessionStorage.removeItem(filter_option);
        sessionStorage.setItem(filter_type, 0);
        
        $(this).removeClass('selected');
        $(this).parents('.filter-item').find('.text-field-item').removeClass('selected');
        
        var show_class = filter_type + "-show";
        var hide_class = filter_type + "-hide";
        
        $(".search-card-result").each(function(){
                $(this).removeClass(hide_class);
                $(this).removeClass(show_class);
            });
        
        count_results();
        
    });
    

    //CREATE 'SHOWING' NUMBER
    var showing = sessionStorage.getItem('showing');
    
    if (showing === null) {
        showing = 86;
    }
    
    $('span.number').text(showing);
    
    // LIMIT NUMBER OF SEARCH CARDS DISPLAY
    var count_results = function(){
        var count = 0;
        $('.search-card-result').each(function(){
            $(this).removeClass('hidden');
        });
        $('.search-card-result:visible').each(function(){
            count++;
            
            if (count > 10) {
                $(this).addClass('hidden');
            } 
        });
        
        if(count < 10) {
            $('.pagination-wrapper').css('display', 'none');
            $('.page-number-wrapper').css('display', 'none');
            
            $('span.number').text(count);
        } else {
            $('.pagination-wrapper').css('display', 'block');
            $('.page-number-wrapper').css('display', 'block');
            
           
            var new_showing = Math.floor(Math.random() * 21) + 50;
            $('span.number').text(new_showing);
        }
        
        if (count === 0) {
            $('.no-results').addClass('show');
        } else {
            $('.no-results').removeClass('show');
        }
        
    };
    count_results();
    
    
    
    // MOBILE FILTER VISIBILITY
    $('.view-filters').on('click', function(){
        $('.filter-wrapper').addClass('active');
        $('.modal-background').addClass('active');

        //add active state to mobile filter counters
        for (var m = 0; m < all_filter_types.length; m++) {
            var filter_type = sessionStorage.getItem(all_filter_types[m]);
            if (filter_type !== null) {           
                $('#' + all_filter_types[m] + ' .mobile-counter').text(filter_type).addClass('active');
            }
        }
        
        //Close open filter accordions
        $('.filter-item-content').hide();
         $('.filter-item-title').removeClass('open');
        
    });
    $('.filter-wrapper .modal-close').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
        
    });
    $('.mobile-apply-filters-button').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
    });
    
 
    
    // CLEAR ALL FILTERS / QUESTIONS
    var clear_filters = function(){
        $('.active-filters li.selected').removeClass('selected');
        $('.checkbox-item.selected').removeClass('selected');

        $('.filter-item-title').removeClass('open');
        $('.filter-item-content').slideUp();
        $('.filter-item .custom-control-input').prop('checked', false).removeClass('selected');
        
        $('.search-card-result').each(function(){
            $(this).removeClass("event-type-hide event-type-show date-hide date-show topic-hide topic-show postcode-hide postcode-show");
        });
        
        count_results();
        
        sessionStorage.clear();
        
        $('.mobile-counter').each(function(){
            $(this).removeClass('active').text(0);
        });
        $('.filter-counter').text(0);
    };
    
    $('.clear-all').on('click', function(){
        clear_filters();
    });
    

        
    // SET ACTIVE FILTERS ON PAGE LOAD - MULTIPLE SELECT
    $('#postcode .active-filters li').text(sessionStorage.getItem('postcode_value'));
    
    var filter_set_multiple = ['in-person-events', 'online-events', 'past-recorded-events', 'business-finance', 'business-planning', 'contracting-and-tendering', 'customer-service', 'digital-business', 'employing-people', 'exporting', 'government-grant-programs', 'industry-compliance', 'innovation-and-commercialisation', 'marketing', 'networking', 'starting-a-business', 'taxation-and-record-keeping', 'work-health-and-safety', 'past-mmonths', 'this-month', 'this-month-plus-1', 'this-month-plus-2', 'this-month-plus-3', 'postcode_status'];
    
    var filter_types = ['event-type', 'date', 'topic', 'postcode'];
    
    var add_show_classes_on_load = function(item){
        
        $(item).each(function(){
            if ( $(this).hasClass(filter_label) ) {
                $(this).addClass(show_class);
            }   
        });   
    };
    
    var add_hide_classes_on_load = function(item, filter_type){
        
        var show_class = filter_type + "-show";
        var hide_class = filter_type + "-hide";
        
        $(item).each(function(){
            if (!$(this).hasClass(show_class)) {
                $(this).addClass(hide_class);
            }
        });
    };
    
    for ( var filter = 0; filter < filter_set_multiple.length; filter++) {
        
        var filter_option = filter_set_multiple[filter];    
        
            if (sessionStorage.getItem(filter_option) === "true") {  
            
                // Select filters on the page  
                
                var filter_type = $('.active-filters li[data-option="' + filter_option + '"]').attr('filter-type');
                var filter_label = $('.active-filters li[data-option="' + filter_option + '"]').attr('data-label');
                
                
                if (!filter_type) {
                    filter_type =  $('label[data-option="' + filter_option + '"]').attr('filter-type');
                }
                if (!filter_label) {
                    filter_label =  $('label[data-option="' + filter_option + '"]').attr('data-label');
                }
                
                var show_class = filter_type + "-show";
                var hide_class = filter_type + "-hide";
            
                $('.active-filters li[data-option="' + filter_option + '"]').toggleClass('selected');    
                $('label[data-option="' + filter_option + '"]').parent('.checkbox-item').toggleClass('selected');
                
                add_show_classes_on_load('.search-card-result');
            }
        
    }
    for ( var i = 0; i < filter_types.length; i++) {
        
        var f_type = filter_types[i];
        
        if (sessionStorage.getItem(f_type) > 0) {
            add_hide_classes_on_load('.search-card-result', f_type);
        }
    }
    count_results();

    
    

    
    
    


    
    // SET DYNAMIC MONTHS
    var date = new Date(),
        current_month = date.getMonth(),
        current_month_plus_1 =  date.getMonth() + 1,
        current_month_plus_2 =  date.getMonth() + 2,
        current_month_plus_3 =  date.getMonth() + 3,
        month_set = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        current_year = date.getFullYear();
 
    $('.current-month').text(month_set[current_month]);
    $('.current-month-plus-1').text(month_set[current_month_plus_1]);
    $('.current-month-plus-2').text(month_set[current_month_plus_2]);
    $('.current-month-plus-3').text(month_set[current_month_plus_3]);
    $('.current-year').text(current_year);
    
    
    
    // READ MORE ACCORDIONS
    $('.accordion.event-information .accordion-item button').on('click', function(){
        //console.log($(this));
        $(this).parents('.accordion-item').toggleClass('open');
        $(this).parents('.accordion-item').find('.accordion-body').slideToggle();
    });

    
    
}); // END doc ready

