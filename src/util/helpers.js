export const getTimeFromString = (str) => {
    const date = new Date(str)

    return `${date.getHours()}:${date.getMinutes()}`
}