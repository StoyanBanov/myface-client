export const getTimeFromString = (str, options = {}) => {
    const date = new Date(str)

    const result = []
    if (options.date)
        result.push([ensureTwoDigits(date.getDate()), ensureTwoDigits(date.getMonth() + 1), date.getFullYear()].join('.'))

    if (options.time)
        result.push([date.getHours(), date.getMinutes(), date.getSeconds()].join(':'))

    return `${result.join(' - ')}`

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