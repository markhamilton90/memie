
document.querySelectorAll('.message').forEach(elem => {
    elem.addEventListener('click', e => {
        e.target.classList.remove('active')
        let nextElem = e.target.dataset.target

        switch (nextElem) {
            case 'storyboard':
                nextStoryboard()
                break
            case 'balloon':
                showBalloon()
                break
            default:
                document.getElementById(nextElem).classList.add('active')
        }
    })
})

// Countdown
const day = 1000 * 60 * 60 * 24;
const startDate = new Date();
const endDate = new Date('12/19/2024');

const timeSpan = endDate - startDate;
const daysRemaining = Math.ceil(timeSpan / day);

const counterElement = document.querySelector('.count')
const startingVal = parseInt(counterElement.textContent)
const screen = document.querySelector('.mask')
let intervalID = null

let countComplete = false

const countdown = document.querySelector('.countdown')
countdown.addEventListener('transitionstart', e => {

    if (countComplete) {
        return
    }

    if (e.propertyName == 'opacity') {
        intervalID = setInterval(countDown, 70)
    }
})

function countDown() {
    let days = parseInt(counterElement.textContent) - 1
    counterElement.textContent = days

    let percentage = (days/startingVal) * 100
    screen.style.width = `${percentage}%`

    if (days == daysRemaining) {
        clearInterval(intervalID)
        countComplete = true
        document.querySelector('.countdown').classList.add('lower')
    }
}

let countdown1Text = `Only ${daysRemaining} days babe`
let countdown2Text = `${daysRemaining} days, until I can finally hold you in my arms 😏 🥰`

document.getElementById('countdown1').textContent = countdown1Text
document.getElementById('countdown2').textContent = countdown2Text

document.querySelector('.countdown-wrapper').addEventListener('animationend', e => {
    if (e.animationName == 'lower') {
        // nextStoryboard()
        let nextMessage = e.target.dataset.target
        console.log(e)
        document.getElementById(nextMessage).classList.add('active')
    }
})




// Envelope
const envelope = document.querySelector('.envelope-wrapper')
envelope.addEventListener('click', e => {
    e.currentTarget.classList.add('active')
})
envelope.addEventListener('animationend', e => {
    if (e.animationName == 'fadeOut') {
        // nextStoryboard()
        let nextMessage = e.target.dataset.target
        document.getElementById(nextMessage).classList.add('active')
    }
})

function showBalloon() {
    document.getElementById('balloon').classList.add('active')
}

// Balloon
const balloon = document.getElementById('balloon')
const heartWrapper = document.querySelector('.heart-wrapper')
balloon.addEventListener('click', e => {
    e.target.width += 4
    confetti()

    if (e.target.width >= 200) {
        e.target.classList.add('hidden')
        heartWrapper.classList.replace('hidden', 'active')

        document.body.classList.add('dark-to-light')

        setTimeout(function() {
            let audio = new Audio('./audio/wonder.mp3')
            audio.currentTime = 4
            audio.play()
        }, 1000)
    }
})

let topText = document.querySelector('.heart-wrapper .top-text')
let bottomText = document.querySelector('.heart-wrapper .bottom-text')

document.body.addEventListener('animationend', e => {
    if (e.animationName == 'darkToLight') {
        topText.classList.add('active')
        bottomText.classList.add('active')
    }
})

bottomText.addEventListener('transitionend', e => {
    if (e.propertyName == 'top') {
        document.getElementById('birthday1').classList.add('active')
    }
})

window.storyboard = 1

function nextStoryboard() {
    let current = document.querySelector('.storyboard.active')
    current.classList.remove('active')

    window.storyboard++

    let active = document.querySelector(`.storyboard[data-storyboard="${window.storyboard}"]`)
    active.classList.add('active')

    if (active.classList.contains('confetti')) {
        document.getElementById('balloon1').classList.add('active')
    }
}
