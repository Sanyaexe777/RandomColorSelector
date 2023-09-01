const cols = document.querySelectorAll('.col')
const hexCods = '0123456789ABCDEF'

alert("Press 'SPACE' if you need change color.For copy press on the color tag." )

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code == 'Space') {
Random()
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type

    if(type == 'lock') {
        const node = event.target.tagName == 'I'
        ? event.target
        : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if(type == 'copy') {
        copy(event.target.textContent)
    }
})

function generator(){
let color = ''
for(let i = 0; i < 6; i++){
color += hexCods[Math.floor(Math.random() * hexCods.length)]
}
return '#' + color
}

function copy(text) {
 return navigator.clipboard.writeText(text)
}

function Random(isInitial){
    const colors = isInitial ? getColors() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const color = isInitial 
        ? colors[index]
          ? colors[index]
          : chroma.random() 
        : chroma.random()
         if(!isInitial) {
            colors.push(color)
         }

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        text.textContent = color
        col.style.background = generator()
        TextColor(text, color)
    })

updateHash(colors)

}

function TextColor(text, color){
    const lum = chroma(color).luminance()
    if(lum >= 0.5){
        text.style.color = 'black'
    }
    else{
        text.style.color = 'white'
    }
}
 
function updateHash(colors = []) {
document.location.hash = colors.map((col) => col.substring(1)).join('-')
}

function getColors() {
    if (document.location.hash.length > 1) {
 return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

Random(true)