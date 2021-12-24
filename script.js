const Day = document.getElementById('day')
const Hour = document.getElementById('hour')
const Minute = document.getElementById('minute')
const Second = document.getElementById('second')
const Background = document.getElementById('background')
const Count = 50
const DeadLine = new Date('2022/01/05 00:00')
const Now = new Date()

function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CreateImageRandom() {
    let top = Random(30, 100),
        left = Random(0, window.innerWidth),
        size = Random(30, 120),
        speed = Random(500, 6000)

    CreateImage(top * -1, left, size, speed)
}

function CreateImage(top, left, size, speed) {
    let div = document.createElement('div')
    div.className = 'image'


    div.style.setProperty('--t', `calc(${top}px - ${size}px)`)
    div.style.setProperty('--l', `${left}px`)
    div.style.setProperty('--s', `${size}px`)
    div.style.setProperty('--sp', `${speed}ms`)

    Background?.appendChild(div)

    setTimeout(() => {
        Background.removeChild(div)
        CreateImageRandom()
    }, speed);
}

function SetBackgroundImage() {
    Background.innerHTML = ''

    for (let i = 0; i < Count; i++)
        CreateImageRandom()
}

function OnBackgroundClick() {
    document.body.onclick = (event) => {
        CreateImage(
            event.y,
            event.x,
            Random(30, 120),
            Random(500, 6000)
        )
    }
}

function DiffTime() {
    const now = new Date().getTime(), end = DeadLine.getTime(), total = (end - now);

    if (total <= 0)
        return {
            "day": 0,
            "hour": 0,
            "minute": 0,
            "second": 0,
            "ended": true
        }

    const totalD = Math.abs(Math.floor(total / 1000));

    const years = Math.floor(totalD / (365 * 60 * 60 * 24));
    const months = Math.floor((totalD - years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
    const days = Math.floor((totalD - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24) / (60 * 60 * 24));
    const hours = Math.floor((totalD - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24 - days * 60 * 60 * 24) / (60 * 60));
    const minutes = Math.floor((totalD - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24 - days * 60 * 60 * 24 - hours * 60 * 60) / (60));
    const seconds = Math.floor(totalD - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24 - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60);


    return {
        "day": days,
        "hour": hours,
        "minute": minutes,
        "second": seconds,
        "ended": false
    }
}

function SetTimer() {
    let { day, hour, minute, second, ended } = DiffTime()

    second = second < 10 ? `0${second}` : second
    minute = minute < 10 ? `0${minute}` : minute
    hour = hour < 10 ? `0${hour}` : hour
    day = day < 10 ? `0${day}` : day

    Day.innerHTML = day
    Hour.innerHTML = hour
    Minute.innerHTML = minute
    Second.innerHTML = second

    return ended
}

function StartTimer() {
    let interval;
    function StopTimer() {
        clearInterval(interval)
        document.querySelector('section').style.setProperty('backdrop-filter', 'blur(0px)')
        document.querySelector('section').style.backgroundColor = 'transparent'
        document.querySelector(`section div.timer`).style.opacity = 0
        document.querySelector(`section div.footer`).style.opacity = 0
    }

    if (SetTimer() == true) StopTimer()
    interval = setInterval(() => {
        if (SetTimer() == true) StopTimer()
    }, 1000);
}

function CacheStuff() {
    caches.open('townland:comming-soon').then((cache) => {
        cache.addAll([
            'https://avatars.githubusercontent.com/u/96562526',
            '/images/github.png',
            '/images/twitter.png',
            '/images/mail.png',
            '/style.css',
            '/script.js',
            '/index.html'
        ])
    })
}

StartTimer()
CacheStuff()
OnBackgroundClick()
SetBackgroundImage()