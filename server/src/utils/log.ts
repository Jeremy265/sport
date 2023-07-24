const fs = require('fs');

const twoDigits = (number: number) =>
    String(number).padStart(2, '0')

export const log = (content: string, file: string) => {
    const date = new Date()

    try {
        fs.appendFileSync(`${process.env.BASE_PATH}/logs/${file}_${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}.txt`, `${date.getHours()}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())} - ${content}\n`)
    } catch (err) {
        console.error(err);
    }

}
