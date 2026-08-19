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
say = console.log
let replyP = document.querySelectorAll('.flex p:last-child:not(.edit-delete)')
let allPLast = document.querySelectorAll('.flex p:last-child')
let left = document.querySelectorAll('.left')
let replyCard = document.querySelectorAll('.reply-card.card.c1')
let cards = document.querySelectorAll('.v1')
let overLayer = document.querySelector('.over-layer')
let deleteSpan = document.querySelector('.red')
let myComment = document.querySelector('.e1')
let plusMinusP = document.querySelectorAll('.plus-minus p')
let plus = document.querySelectorAll('.fa-plus')
let minus = document.querySelectorAll('.fa-minus')

replyP.forEach((ele, ind) => {
    ele.onclick = function () {
        replyCard[ind].classList.remove('c1')
        cards[ind].style.marginBottom = '10px'
    }
})

let c = `        <h2>Delete comment</h2>
        <p>Are you sure you want to delete this comment? this will remove the comment and can't be undone.</p>
        <div class="buttons">
            <button>NO, CANCEL</button>
            <button>YES, DELETE</button>
        </div>`

let cont2 = cr('div', 'cont2', c, false)
let btns = cont2.querySelectorAll('button')

function addLayer() {
    overLayer.style.opacity = 0.4;
    overLayer.style.zIndex = 400;
}
function removeLayer() {
    overLayer.style.opacity = 0;
    overLayer.style.zIndex = -1;
}

deleteSpan.onclick = function () {
    document.body.appendChild(cont2)
    add(cont2)
    addLayer()
}
btns.forEach((ele, ind) => {
    ele.onclick = function () {
        remove(cont2)
        removeLayer()
        if (ind === 1)
            myComment.classList.add('c1')
    }
})
if(window.matchMedia('(max-width:460px)').matches){
    left.forEach((ele,ind)=>{
        ele.appendChild(allPLast[ind])
    })
}

minus.forEach((ele,ind)=>{
    ele.onclick = function(){
        plusMinusP[ind].innerText -= 1
    }
})
plus.forEach((ele,ind)=>{
    ele.onclick = function(){
        plusMinusP[ind].innerText = Number(plusMinusP[ind].innerText) + 1
    }
})
say(plus)