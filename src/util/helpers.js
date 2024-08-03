export const getTimeFromString = (str, options = {}) => {
    const date = new Date(str)

    const dateArr = []
    if (options.date)
        dateArr.push(ensureTwoDigits(date.getDate()), ensureTwoDigits(date.getMonth()), date.getFullYear())

    const timeArr = []
    if (options.time)
        timeArr.push(date.getHours(), date.getMinutes(), date.getSeconds())

    return `${dateArr.join('.')} - ${timeArr.map(ensureTwoDigits).join(':')}`

    function ensureTwoDigits(time) {
        return `0${time}`.slice(-2)
    }
}

export const getDateAndTime = (str) => getTimeFromString(
    str,
    {
        date: new Date(str).getDate() != new Date(Date.now()).getDate(),
        time: true
    })