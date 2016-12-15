
// Smooth Scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Responsive Nav Menu
function responsiveNav() {
    var x = $('#responsive-nav');
    if (x.attr('class')==='top-nav') {
        x.attr('class','top-nav responsive');
    } else {
        x.attr('class','top-nav');
    }
}

$(document).ready( function () {

  // Resume Modal
  var modal = $('#myModal');
  var btn = $('#myBtn');
  var span = $(document).find('.close');

  btn.on('click', function() {
      modal.css('display','block');
  });

  span.on('click', function() {
      modal.css('display','none');
  });

  $(window).on('click', function(event) {
      if (event.target == modal) {
          modal.css('display','none');
      }
  });
});