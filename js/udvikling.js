document.addEventListener("DOMContentLoaded", function() {
    var content = document.querySelector(".content");
  
    window.addEventListener("scroll", function() {
      if (isScrolledIntoView(content)) {
        content.classList.add("show");
      }
    });
  
    function isScrolledIntoView(element) {
      var rect = element.getBoundingClientRect();
      var elemTop = rect.top;
      var elemBottom = rect.bottom;
  
      // Only completely visible elements return true:
      var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
      return isVisible;
    }
  });
  