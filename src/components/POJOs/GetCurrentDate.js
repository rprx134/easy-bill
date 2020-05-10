export const getCurrMonthInWords = () => {
    const today = new Date();
    const month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[today.getMonth()];
}

export const getCurrDay = () => new Date().getDay();

export const getCurrYear = () => new Date().getFullYear();

export const getCrrDate = () => {
    const dateArr = [];
    dateArr.push(getCurrDay());
    dateArr.push(getCurrMonthInWords());
    dateArr.push(getCurrYear());
    return dateArr.join(' ');
}