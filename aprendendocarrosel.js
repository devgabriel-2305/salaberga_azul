const carrosel = document.getElementById('carrosel')
const btnnext = document.getElementById('btnnext')
const btnprev = document.getElementById('btnprev')

const cardsClone = [...carrosel.children]
const qtd = 3
const gap = 24

// Clona os últimos cards para o início
cardsClone.slice(-qtd).forEach(card => {
    carrosel.prepend(card.cloneNode(true))
})

// Clona os primeiros cards para o final
cardsClone.slice(0, qtd).forEach(card => {
    carrosel.append(card.cloneNode(true))
})

let indice = qtd
let animando = false

function largura() {
    return carrosel.children[0].offsetWidth + gap
}

function atualizar(animacao = true) {

    carrosel.style.transition = animacao
        ? 'transform 1s'
        : 'none'

    carrosel.style.transform = `translateX(-${largura() * indice}px)`

    animando = animacao
}

// Mostra o primeiro card original
atualizar(false)

btnnext.addEventListener('click', () => {

    if (animando) return

    indice += qtd
    atualizar()

})

btnprev.addEventListener('click', () => {

    if (animando) return

    indice -= qtd
    atualizar()

})

carrosel.addEventListener('transitionend', () => {

    animando = false

    const total = cardsClone.length

    // Voltou para o início
    if (indice >= total + qtd) {
        indice = qtd
        atualizar(false)
    }

    // Voltou para o final
    if (indice < qtd) {
        indice = total
        atualizar(false)
    }

})

setInterval(() => {

    if (animando) return

    indice += qtd
    atualizar()

}, 4000)

window.addEventListener('resize', () => {
    atualizar(false)
})