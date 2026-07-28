//MENU MOBILE
const btnmobile = document.getElementById('btn-mobile')
function mostrar_menu() {
    let menu = document.getElementById('menu')
    let simbol = document.getElementById('simbol')
    menu.classList.toggle('active')
    if (menu.classList.contains('active')) {
        simbol.innerHTML = 'close'
    } else {
        simbol.innerHTML = 'menu'
    }
}
btnmobile.addEventListener('click', mostrar_menu)

//EFEITO DE BOLHAS
const areabolhas = document.querySelector('.bolhas')
function criarBolhas() {
    const bolha = document.createElement('span')
    bolha.className = 'bolha'
    const tamanho = Math.random() * 5 + 10
    bolha.style.width = tamanho + 'px'
    bolha.style.height = tamanho + 'px'
    bolha.style.left = Math.random() * 100 + '%'
    bolha.style.animationDuration = Math.random() * 5 + 5 + 's'
    areabolhas.appendChild(bolha)
    setTimeout(() => {
        bolha.remove()
    }, 10000)
}
setInterval(criarBolhas, 850)

//ANIMAÇÃO REVEAL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => obs.observe(el));

//CARROSSEL
const data = [
    {
        img: "imagens/salablue.jpeg",
        caption: "Sala Azul 2025",
        tilt: -2.5
    },
    {
        img: "imagens/unifor.jpeg",
        caption: "Visita à Unifor",
        tilt: 1.5
    },
    {
        img: "imagens/encontro.jpeg",
        caption: "Encontro",
        tilt: -1.8
    }
];

const stage = document.getElementById('stage');
const dotsWrap = document.getElementById('dots');
let current = 0;
let startX = 0;
let dragging = false;
let dragOffset = 0;

function buildCards() {
    stage.innerHTML = '';
    data.forEach((item, i) => {
        const rot = (i - 1) * -6;
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = i;
        card.innerHTML = `
        <div class="tape" style="left:-16px; transform: rotate(-8deg);"></div>
        <div class="tape" style="right:-16px; transform: rotate(8deg);"></div>
        <img src="${item.img}" alt="${item.caption}" draggable="false">
        <p class="font-bold font-surfer text-2xl text-center text-escuro mt-3">${item.caption}</p>
      `;
        card.addEventListener('mousedown', onDragStart);
        card.addEventListener('touchstart', onDragStart, { passive: true });
        stage.appendChild(card);
    });
    buildDots();
    render();
}

function buildDots() {
    dotsWrap.innerHTML = '';
    data.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === current ? ' active' : '');
        d.addEventListener('click', () => { current = i; render(); });
        dotsWrap.appendChild(d);
    });
}

function render() {
    const cards = stage.querySelectorAll('.card');
    cards.forEach((card, i) => {
        let offset = i - current;
        const len = data.length;
        if (offset > len / 2) offset -= len;
        if (offset < -len / 2) offset += len;

        const isCurrent = offset === 0;
        const shift = stage.offsetWidth * 0.85 + 40;
        const baseX = offset * shift;
        const scale = isCurrent ? 1 : 0.8;
        const z = isCurrent ? 10 : 1;
        const opacity = isCurrent ? 1 : 0;
        const rotate = isCurrent ? data[i].tilt : offset * 8;

        card.style.zIndex = z;
        card.style.transform = `translateX(-50%) translateX(${baseX + (isCurrent ? dragOffset : 0)}px) rotate(${rotate}deg) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.pointerEvents = isCurrent ? 'auto' : 'none';
    });

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function next() {
    current = (current + 1) % data.length;
    render();
}
function prev() {
    current = (current - 1 + data.length) % data.length;
    render();
}

document.getElementById('nextBtn').addEventListener('click', next);
document.getElementById('prevBtn').addEventListener('click', prev);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
});

function onDragStart(e) {
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchmove', onDragMove, { passive: true });
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
}

function onDragMove(e) {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    dragOffset = x - startX;
    render();
}

function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    if (dragOffset < -60) next();
    else if (dragOffset > 60) prev();
    dragOffset = 0;
    render();
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchend', onDragEnd);
}

buildCards();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(render, 100);
});
//CARROSEL TEAM
const carrosel = document.getElementById('carrosel');
const btnnext = document.getElementById('btnnext');
const btnprev = document.getElementById('btnprev');

const cardsClone = [...carrosel.children];
const qtd = 3; 
const gap = 24;

cardsClone.slice(-qtd).forEach(card => {
    carrosel.prepend(card.cloneNode(true));
});

cardsClone.slice(0, qtd).forEach(card => {
    carrosel.append(card.cloneNode(true));
});

function qtdCards() {
    if (window.innerWidth < 768) {
        return 1;
    } else if (window.innerWidth < 992) {
        return 2;
    } else {
        return 3;
    }
}
let passo = qtdCards(); 
let indice = qtd;       
let animando = false;
function largura() {
    return carrosel.children[0].offsetWidth + gap;
}
function atualizar(animacao = true) {
    if (animacao) {
        carrosel.style.transition = 'transform .85s';
    } else {
        carrosel.style.transition = 'none';
    }
    carrosel.style.transform = `translateX(-${largura() * indice}px)`;
    animando = animacao;
}
atualizar(false);
btnnext.addEventListener('click', () => {
    if (animando) return;
    indice += passo;
    atualizar();

});
btnprev.addEventListener('click', () => {
    if (animando) return;
    indice -= passo;
    atualizar();

});
carrosel.addEventListener('transitionend', () => {
    animando = false;
    const total = cardsClone.length;
    if (indice >= total + qtd) {
        indice = qtd;
        atualizar(false);
    }
    if (indice < qtd) {
        indice = total;
        atualizar(false);
    }
});
setInterval(() => {
    if (animando) return;
    indice += passo;
    atualizar();
}, 4000);
window.addEventListener('resize', () => {
    passo = qtdCards();
    atualizar(false);
});