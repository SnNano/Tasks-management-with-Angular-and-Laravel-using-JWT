
document.addEventListener('DOMContentLoaded', (event) => {
  let myNav1 = document.querySelector('#navbar-top1');
  let myNav2 = document.querySelector('#navbar-top2');
  let navLink = document.querySelectorAll('.nav-link');
  window.onscroll = function () {
      scrollMenu();
      scrollFunction();
    };
  function scrollMenu(){
      if( document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20){
          myNav1.classList.add('d-none');
          myNav2.style.backgroundColor ='#ffffff';
          myNav2.classList.add('shadow-sm');
          myNav2.style.display='inline';
          navLink.forEach((c) => {c.style.color='#000'})
        } else {
          myNav1.classList.remove('d-none');
          myNav2.style.display='none';
          navLink.forEach((c) => {c.style.color='#fff'})
        }
    }

  // Back to top
  let mybutton = document.querySelector('#btn-back-to-top');
  if(mybutton){
    mybutton.addEventListener('click', backToTop);
  }
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = 'block';
    } else {
      mybutton.style.display = 'none';
    }
  }
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});
