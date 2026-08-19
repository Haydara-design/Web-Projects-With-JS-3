function add(arg, fadeFunc = 'fade', appearFunc = 'appear', style = 'block') {
    arg.style.display = style
    arg.classList.remove(fadeFunc)
    arg.classList.add(appearFunc)
}
function remove(arg, fadeFunc = 'fade', appearFunc = 'appear') {
    arg.classList.remove(appearFunc)
    arg.classList.add(fadeFunc)
    setTimeout(() => { arg.style.display = 'none' }, 500);
}
function errors(class_, innerText) {
    let er = document.createElement('p')
    er.classList.add(class_)
    er.innerText = innerText
    return er
}
function cr(ele, cla, inner, att) {
    let r = document.createElement(ele)
    if (inner)
        r.innerHTML = inner
    if (cla)
        r.className = cla
    if (att)
        for (let [key, value] of Object.entries(att))
            r.setAttribute(key, value)
    return r
}
function creat(elements, classes, innerHTMLs, atteributes) {
    let arr = []
    for (let i = 0; i < elements.length; i++) {
        arr.push(document.createElement(elements[i]))
        if (classes[i])
            arr[i].className = classes[i]
        if (innerHTMLs[i])
            arr[i].innerHTML = innerHTMLs[i]
        if (atteributes[i])
            for (let [key, value] of Object.entries(atteributes[i]))
                arr[i].setAttribute(key, value)
    }
    return arr
}
function appened(...lista) {
    for (let k = 0; k < lista.length; k++)
        for (let i = 0; i < lista[k][1].length; i++)
            lista[k][0].appendChild(lista[k][1][i])
    return lista[0][0]
}
function addLayer() {
    overLayer.style.opacity = 0.4;
    overLayer.style.zIndex = 1000;
}
function removeLayer() {
    overLayer.style.opacity = 0;
    overLayer.style.zIndex = -1;
}
say = console.log

let hum = document.querySelector('.hum')
let closeImg = document.querySelector('.close')
let aside = document.querySelector('aside')
let overLayer = document.querySelector('.over-layer')
let cartIcon = document.querySelector('.image')
let card = document.querySelector('.card')
let left = document.querySelector('.left')
let bigImg = document.querySelector('.big-img')
let minus = document.querySelector('.fa-minus')
let plus = document.querySelector('.fa-plus')
let num = document.querySelector('.cont p')
let smallImg = document.querySelectorAll('.small-img')
let smallImgPic = document.querySelectorAll('.small-img img')
let theShowImg = document.querySelector('.big-img img')

let leftCopy = left.cloneNode(true)
let bigImgClone = leftCopy.querySelector('.big-img')
let iLeft = cr('i', "fa-solid fa-angle-left", false, false)
let iRight = cr('i', "fa-solid fa-angle-right", false, false)
bigImgClone.appendChild(iLeft)
bigImgClone.appendChild(iRight)

let iClose = cr('i', 'fa-solid fa-xmark', false, false)
let cont2 = cr('div', 'cont2', false, false)
cont2.appendChild(iClose)
cont2.appendChild(leftCopy)

bigImg.onclick = function () {
    addLayer()
    document.body.appendChild(cont2)
    add(cont2, 'scale-fade', 'scale-appear')
}
iClose.onclick = function () {
    removeLayer()
    remove(cont2, 'scale-fade', 'scale-appear')
    setTimeout(() => { document.body.removeChild(cont2) }, 510)
}
hum.onclick = function () {
    addLayer()
    add(aside)
}

closeImg.onclick = function () {
    removeLayer()
    remove(aside)
}

let cartCheck = true
cartIcon.onclick = function (e) {
    e.stopPropagation()
    cartCheck ? (add(card, 'fade-up', 'appear-down'), cartCheck = false) : (remove(card, 'fade-up', 'appear-down'), cartCheck = true);
}
// document.onclick = function () {
//     if (!cartCheck) {
//         remove(card, 'fade-up', 'appear-down');
//         cartCheck = true
//     }
// }
minus.onclick = function () { if (num.innerText !== '0') num.innerText -= 1 }
plus.onclick = function () { num.innerText = Number(num.innerText) + 1 }

function change(element, thump, big) {
    element.forEach((ele, ind) => {
        ele.onclick = function () {
            element.forEach((e) => {
                e.classList.remove('active')
            })
            this.classList.add('active')
            remove(thump)
            setTimeout(() => { thump.src = big[ind].getAttribute('src').replace('-thumbnail', ''); add(thump) }, 501)

        }
    })
}
change(smallImg, theShowImg, smallImgPic)
let smallImg2 = cont2.querySelectorAll('.small-img')
let smallImgPic2 = cont2.querySelectorAll('.small-img img')
let theShowImg2 = cont2.querySelector('.big-img img')
change(smallImg2, theShowImg2, smallImgPic2)

let angleLeft = cont2.querySelector('.fa-angle-left')
let angleRight = cont2.querySelector('.fa-angle-right')

let srcs = []
smallImgPic2.forEach((ele) => {
    srcs.push(ele.getAttribute('src').replace('-thumbnail', ''))
})

function next(elements, thump) {
    let index = 0;
    elements.forEach((ele, ind) => {
        if (ele.classList.contains('active')) {
            say(ind)
            if (ind !== 3)
                ele.classList.remove('active')
            index = ind;
        }
    })
    if (index !== 3) {
        elements[index + 1].classList.add('active')
        remove(thump)
        setTimeout(() => { thump.src = srcs[index + 1]; add(thump) }, 510)
    }

}
function previous(elements, thump) {
    let index = 0;
    elements.forEach((ele, ind) => {
        if (ele.classList.contains('active')) {
            say(ind)
            if (ind !== 0)
                ele.classList.remove('active')
            index = ind;
        }
    })
    if (index !== 0) {
        elements[index - 1].classList.add('active')
        remove(thump)
        setTimeout(() => { thump.src = srcs[index - 1]; add(thump) }, 510)
    }

}
angleRight.onclick = function () {
    next(smallImg2, theShowImg2)
}
angleLeft.onclick = function () {
    previous(smallImg2, theShowImg2)
}

let goods = `        <div class="text-image">
            <div class="image5"><img src="images/image-product-1-thumbnail.jpg" alt=""></div>
            <div class="text">
                <p>Fall Limited Edition Sneakers</p>
                <p class="total-price"></p>
            </div>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        <button>Checkout</button>`

let noti = cr('div', 'noti', goods, false)
let pNoti = noti.querySelector('.total-price')
let objects = document.querySelector('.objects')
let emptyCart = document.querySelector('.empty-cart')
let addToCart = document.querySelector('.buttons button')
let trash = noti.querySelector('.fa-trash-can')
let imageSpan = document.querySelector('.image span')

addToCart.onclick = function () {
    if (num.innerText !== '0') {
        pNoti.innerHTML = `$125.00 x ${num.innerText}  <b>$${(num.innerText * 125).toFixed(2)} </b>`
        imageSpan.innerText = num.innerText
        imageSpan.style.display = 'inline'
        objects.appendChild(noti)
        add(noti)
        objects.classList.add('goods')
    }
}
trash.onclick = function () {
    remove(noti)
    imageSpan.style.display = 'none'
    setTimeout(() => {
        objects.removeChild(noti)
        objects.classList.remove('goods')
    }, 510)
}

let cloneAngleLeft = angleLeft.cloneNode(true)
let cloneAngleRight = angleRight.cloneNode(true)

cloneAngleRight.onclick = function () {
    next(smallImg, theShowImg)
}
cloneAngleLeft.onclick = function () {
    previous(smallImg, theShowImg)
}
window.matchMedia('(max-width:569px)').addEventListener('change', function (e) {
    if (e.matches) {
        left.appendChild(cloneAngleLeft)
        left.appendChild(cloneAngleRight)
    }
    else {
        if (left.contains(cloneAngleLeft)) {
            left.removeChild(cloneAngleLeft)
            left.removeChild(cloneAngleRight)
        }
    }
})
