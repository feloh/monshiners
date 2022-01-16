export default {
    setSeason ()
    {
        const date = new Date()
        const month = date.getMonth()+1

        if (3 <= month && month <= 5) {
            return 'Spring'
        } else if (6 <= month && month <= 8) {
            return 'Summer'
        } else if (9 <=month && month <= 11) {
            return 'Fall'
        } else if (month === 12 ||  month === 1 || month === 2 ) {
            return 'Winter'
        }

    }
}
