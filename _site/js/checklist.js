/*jshint browser: true, devel: true, jquery: true*/

$(document).ready(function () {
    
    /*------------------- Open & close checklist items -------------------*/
    $(".checklist-item-title").on("click", function () {
        $(this).next('.checklist-sub-item-wrapper').slideToggle(600);

        if ($(this).closest('.checklist-item').hasClass('open')) {
            
            $(this).closest('.checklist-item').removeClass('open');
            
            
            // Close sub-items when close step
            if ( $(this).closest('.checklist-item').find('.checklist-sub-item').hasClass('open') ) {
               
                $(this).closest('.checklist-item').find('.checklist-sub-item.open').find('.content-wrapper').slideToggle(600);
                $(this).closest('.checklist-item').find('.checklist-sub-item').removeClass('open');
            }
            
        } else {
            $(this).closest('.checklist-item').addClass('open');
        }
         
     });
    
    /*------------------- Close checklist step button -------------------*/
    $(' .checklist-close-step').on('click', function(){
        $(this).parents('.checklist-sub-item-wrapper').hide();
        $(this).parents('.checklist-item').removeClass('open');
    });
    
    
    /*------------------- Open & close sub-checklist items -------------------*/
     $(".checklist-sub-item-title").on("click", function () {

        $(this).next('.content-wrapper').slideToggle(600);
         
        if ($(this).closest('.checklist-sub-item').hasClass('open')) {
            $(this).closest('.checklist-sub-item').removeClass('open');
        } else {
            $(this).closest('.checklist-sub-item').addClass('open');
        }
         
     });
    
    // Expand all
    $(".checklist-expand-all").on("click", function (){

    if($(this).hasClass('open')) {
        $(this).removeClass('open');
        $('.checklist-sub-item-wrapper').slideUp(400);
        $(".checklist-item").removeClass('open');

        $(this).find('h5').text('Open all');

    } else { 
        $(this).addClass('open');
        $('.checklist-sub-item-wrapper').slideDown(400);
        $(".checklist-item").addClass('open');

        $(this).find('h5').text('Close all');
    }
        
    });
    
    
    
    /*------------------- Checkbox functionality -------------------*/ 
    /*$('.checkbox-icon').on('click', function(){
        // Mark item as done
        var parent_item = $(this).parents('.checklist-item');
        $(parent_item).toggleClass('done');
        
        
        // Scroll and close
        if(parent_item.hasClass('done')) {
            console.log('now is done');
            
            parent_item.removeClass('open');
                var parent_position = parent_item.position();
                $("html").animate(
                    {
                    scrollTop: $(parent_item).offset().top
                      },
                    400 //speed
                );

                var content = $(this).parents('.checklist-sub-item-wrapper');
                setTimeout(function(){
                    content.slideUp(1000);
                }, 400);
            
         } 
    });*/
    
    /*------------------- Close functionality -------------------*/ 
    $('.close-item btn').on('click', function () {

        // Scroll and close
        var parent_item = $(this).parents('.checklist-item');

        parent_item.removeClass('open');
        var parent_position = parent_item.position();
        $("html").animate({
                scrollTop: $(parent_item).offset().top
            },
            400 //speed
        );

        var content = $(this).parents('.checklist-sub-item-wrapper');
        setTimeout(function () {
            content.slideUp(1000);
        }, 400);
    });
    
    
    
    


}); // END doc ready

