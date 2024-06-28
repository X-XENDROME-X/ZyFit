document.querySelector(".mobile-btn").addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("active");
});



document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slide-in');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, 
      rootMargin: '0px', 
      threshold: 0.15 
    });
  
    images.forEach(image => {
      image.classList.remove('is-visible');
      observer.observe(image);
    });
  });

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
