
var data = {};

Modernizr.addTest('backgroundclip',function() {

  var div = document.createElement('div');

  if ('backgroundClip' in div.style)
    return true;

  'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g,function(val) {
    if (val+'BackgroundClip' in div.style) return true;
  });

});

$.modal.defaults = {
  overlay: "#000",        // Overlay color
  opacity: 0.75,          // Overlay opacity
  zIndex: 1,              // Overlay z-index.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  clickClose: true,       // Allows the user to close the modal by clicking the overlay
  closeText: '',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: true,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

 /////////////
 //   MAP   //
 /////////////

 ymaps.ready(function () {
     var myMap = new ymaps.Map('map', {
         center: [43.122709, 131.877427],
         zoom: 17,
         offset: [100, 100]
     });

     var myPlacemark = new ymaps.Placemark([43.122709, 131.877427], {
         balloonContentBody: [
             '<address>',
             '<strong>ЭКСПЕРТИЗА</strong>',
             '<br/>',
             'Группа компаний',
             '</address>'
         ].join('')
     }, {
         preset: 'islands#dotIcon',
         iconColor: '#000'

     });

     myMap.geoObjects.add(myPlacemark);
     myMap.behaviors.disable('scrollZoom');
 });


$(function(){

  smoothScroll.init();

  $('.topbar__callback').click(function(event) {
    event.preventDefault();
    $('#callback-modal').modal();
  });

  /////////////////
  //    SLIDER   //
  /////////////////

  (function(){
    var $slider = $('.slider');

    $slider.find('.slider__item').flexVerticalCenter({ cssAttribute: 'margin-top', verticalOffset: '0' });
    $slider.find('.slider__nav nav ul li a').flexVerticalCenter({ cssAttribute: 'top', verticalOffset: '-10px' });

    if ( $slider.find('.slider__item').length > 0 ) {
      //var count = $('#slider .slider__slide.active').attr('id').split('slide-')[1]-1;

      if ( $slider.attr('data-count') == undefined )
        $slider.attr('data-count', 0);
      var count = parseInt( $slider.attr('data-count') );

      var slidesCount = $slider.find('.slider__item').size() - 1;
    }

    $slider.find('.slider__nav nav ul li a').on('click', function(e) {
      e.preventDefault();

      if ( $slider.find('.slider__item:animated').length > 0 ) return;

      count = $(this).attr('href').split('#slide-')[1] - 1;

      var perc = count * 33.333;
      $slider.find('.slider__stripe').css('left', perc + '%');

      $slider.find('.slider__item.active').fadeOut(300, function() {
        $slider.find('.slider__item.active').removeClass('active');
        $slider.find('.slider__item').eq(count).addClass('active');
        $slider.find('.slider__item').eq(count).fadeIn(300);

        //
        $slider.attr('data-count', count);
      });
      $slider.find('.slider__nav li.active').removeClass('active');
      $slider.find('.slider__nav li').eq(count).addClass('active');
    });

    $slider.find('.slider__nav .slider__arrow').on('click', function(e) {
      e.preventDefault();

      if ( $slider.find('.slider__item:animated').length > 0 ) return;

      var direction;
      $(this).hasClass('slider__arrows__right') ? direction = 1 : direction = 0;

      if (direction == 0)
        (count == 0) ? count = slidesCount + 1 : count = count;
      else
        (count == slidesCount) ? count = - 1 : count = count;

      $slider.find('.slider__item.active').fadeOut(300, function() {
        $(this).removeClass('active');
        (direction == 1) ? count++ : count--;

        var perc = count * 33.333;
        $slider.find('.slider__stripe').css('left', perc + '%');

        $slider.find('.slider__item').eq(count).addClass('active');
        $slider.find('.slider__item').eq(count).fadeIn(300);
        $slider.find('.slider__nav li.active').removeClass('active');
        $slider.find('.slider__nav li').eq(count).addClass('active');
        ///
        $slider.attr('data-count', count);
      });
    });

  })();

  ///////////////////////
  //    TESTI-SLIDER   //
  ///////////////////////

  (function(){
    var $slider = $('.testimonials');

    if ( $slider.find('.testi__item').length > 0 ) {
      if ( $slider.attr('data-count') == undefined )
        $slider.attr('data-count', 0);
      var count = parseInt( $slider.attr('data-count') );

      var slidesCount = $slider.find('.testi__item').size() - 1;
    }

    $slider.find('.testi__arrow').on('click', function(e) {
      e.preventDefault();

      if ( $slider.find('.testi__item:animated').length > 0 ) return;

      var direction;
      $(this).hasClass('testi__arrows__right') ? direction = 1 : direction = 0;

      if (direction == 0)
        (count == 0) ? count = slidesCount + 1 : count = count;
      else
        (count == slidesCount) ? count = - 1 : count = count;

      $slider.find('.testi__item.active').fadeOut(300, function() {
        $(this).removeClass('active');
        (direction == 1) ? count++ : count--;

        $slider.find('.testi__item').eq(count).addClass('active');
        $slider.find('.testi__item').eq(count).fadeIn(300);
        ///
        $slider.attr('data-count', count);
      });
    });

  })();

  ////////////////////////
  //  PLACEHOLDERS FIX  //
  ////////////////////////

  if ($.fn.placeholder.input && $.fn.placeholder.textarea) {
  } else if ($.fn.placeholder.input) {
    $('textarea').placeholder();
  } else {
    $('input, textarea').placeholder();
  }

  ////////////////////////
  //  FORMS VALIDATION  //
  ////////////////////////

  $('form').each(function() {
    $(this).validate({
      errorPlacement: $.noop,
      submitHandler: function(form) {
        $(form).submitForm();
      }
    });
  });

  /////////////////
  //    ELSE     //
  /////////////////

  $('.logo').on('click', function(e) {
    e.preventDefault();
  });

});

////////////////////////////
//  FORM SUBMIT FUNCTION  //
////////////////////////////

  $.fn.submitForm = function() {

    var form = $(this);
    var preloaderHTML = '<div class="form-preloader"><i class="fa fa-refresh fa-spin"></i></div>';

    var okHTML = '<i class="fa fa-check"></i><br />Сообщение отправлено!';
    var errorHTML = '<i class="fa fa-frown-o"></i><br />Произошла ошибка!';

    form.append(preloaderHTML);
    var preloader = $(this).find('.form-preloader');

    //var preloaderHeight = preloader.height();
    //var innerHeight = preloader.find('div').height();
    // var preloaderPadding = ((preloaderHeight/2) - innerHeight/2) + 10;
    // preloader.css("padding-top", preloaderPadding + "px");

    preloader.show();
    preloader.toggleClass('active');

    var fields = form.find("input[type=text], input[type=email], input[type=tel]");
    // var data = {};
    data["formName"] = form.attr("data-title");

    $(fields).each(function(){
      var name = $(this).attr("name");
      var val = $(this).val();
      data[name] = val;
    });

    data["secret"] = "2f7d9f0d0acf89a8f6a57d79f0f7d475";

    var isError = false;

    $.ajax({
      type: "POST",
      url: "/mailer.php",
      //data: JSON.stringify(data),
      data: "data="+JSON.stringify(data),
      //contentType: "application/json; charset=utf-8",
      success: function (data) {
        preloader.html(okHTML);
      },
      error: function (data) {
        isError = true;
        preloader.html(errorHTML);
      }
    });

    $('.form-preloader').on('click', function() {

      $(this).toggleClass('active');

      setTimeout(function(){
        $('.form-preloader').remove();
      }, 500);

      if (!isError) {
        fields.val('');
      }
    });

  };
