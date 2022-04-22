const Emitter = require('events')
let emitter = new Emitter()

let paramsTimes = process.argv.slice(2)

class Timer {
    
    idInterval = null

    constructor(time, eventName) {
        this.time = time
        this.eventName = eventName
    }

    init() {
        this.idInterval = setInterval(() => {
            emitter.emit(this.eventName, this.diffDate(), this.eventName)
        }, 1000)
    }

    diffDate() {
        let currentDate = new Date().getTime()
        let futureDate = this.formattingDate(this.time).getTime()
        let differenceTime = futureDate - currentDate
        let seconds = Math.floor(differenceTime / 1000)
        let minuts = Math.floor(seconds / 60)
        let hours = Math.floor(minuts / 60)
        let days = Math.floor(hours / 24)

        let hoursLeft = hours - (days*24)
        let minutsLeft = minuts - (days*24*60) - (hoursLeft*60)
        let secondsLeft = seconds - (days*24*60*60) - (hoursLeft*60*60) - (minutsLeft*60)
        
        if(futureDate < currentDate) {
            clearInterval(this.idInterval)
            return `На таймере ${this.eventName} вышло время`
        }

        return `Осталось ${days} дней, ${hoursLeft} часов, ${minutsLeft} минут, ${secondsLeft} секунд`
    }

    formattingDate(date) {
        let [year, month, day, hours] = date.split('-').reverse()
        let futureDate = new Date(year, month - 1, day, hours, 0, 0, 0)
        return futureDate
    }
}

paramsTimes.forEach((element, index) => {
    let eventName = `Timer ${index + 1}`
    new Timer(element, eventName).init()
    emitter.on(eventName, function (timerName, message) {
        console.log(`${timerName} - ${message}`)
      })
});