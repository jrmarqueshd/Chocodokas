const menuItems = document.querySelectorAll('a[href^="#"]');

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget) + 500;
	scrollToPosition(to);
}

menuItems.forEach(item => {
	item.addEventListener('click', scrollToIdOnClick);
});

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 1000;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

// Após a window carregar por completa
window.addEventListener("load", ()=>{
    // Variaveis JS
    let date = new Date();
    let year = date.getUTCFullYear(-3);
    let since = 2018;

    let nameUrl = String;
    let telUrl = String;
    let emailUrl = "";
    let msg = String
    
    // Variaveis Browser
    let $year = document.getElementById("since");
    const $button = document.getElementById("buttonForm");
    const $nameForm = document.getElementById("nameForm");
    const $telForm = document.getElementById("telForm");
    const $emailForm = document.getElementById("emailForm");
    let $form = document

    $button.addEventListener("click", (e)=>{
      e.preventDefault();

      try{
        if($nameForm.value == "" || $nameForm.value == " ") throw "Por favor, preencha o seu nome!";
        if($telForm.value == "" || $telForm.value == " ") throw "Por favor, preencha o seu WhatsApp!";

        else{
          nameUrl = $nameForm.value;
          telUrl = $telForm.value;
          emailUrl = $emailForm.value;

          msg = `Ol%C3%A1%20me%20chamo%20*${nameUrl}*%20meu%20n%C3%BAmero%20%C3%A9%20o%20*${telUrl}*%20*${emailUrl}*,%20gostaria%20de%20saber%20mais%20sobre%20a%20venda%20de%20trufas%21%20`;
          urlFinal = `https://api.whatsapp.com/send?phone=551920016009&text=${msg}`;
          window.open(urlFinal, "_blank").focus();
        }
      }
      catch(err){
        alert(err);
      } 
    });


    // Imprime since no footer
    if(since == year){
        $year.innerText = `${year}.`;
    }
    else{
        $year.innerText = `${since} - ${year}.`;
    }

});