/*MENU MOBILE*/
const btnmobile = document.getElementById('btn-mobile')
function mostrar_menu(){
    let menu = document.getElementById('menu')
    let simbol = document.getElementById('simbol')
    menu.classList.toggle('active')
    if(menu.classList.contains('active')){
        simbol.innerHTML = 'close'
    }else{
        simbol.innerHTML = 'menu'
    }
}
btnmobile.addEventListener('click', mostrar_menu)

/*EFEITO DE BOLHAS*/
const areabolhas = document.querySelector('.bolhas')
function criarBolhas(){
    const bolha = document.createElement('span')
    bolha.className = 'bolha'
    const tamanho = Math.random() * 5 + 10
    bolha.style.width = tamanho + 'px'
    bolha.style.height = tamanho + 'px'
    bolha.style.left = Math.random() * 100 + '%'
    bolha.style.animationDuration = Math.random() * 5 + 5 + 's'
    areabolhas.appendChild(bolha)
    setTimeout(()=>{
        bolha.remove()
    }, 10000)
}
setInterval(criarBolhas, 850)