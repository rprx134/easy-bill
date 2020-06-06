export const getMonthInWords = (date) => {
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
    return month[date.getMonth()];
}

export const getDay = (date) => date.getDay();

export const getYear = (date) => date.getFullYear();

export const getCrrDate = () => {
    const today = new Date();
    const dateArr = [];
    dateArr.push(getDay(today));
    dateArr.push(getMonthInWords(today));
    dateArr.push(getYear(today));
    return dateArr.join(' ');
}

export const getquotationExpiryDate = () => {
    var date = new Date();
    var numberOfDaysToAdd = 180;
    date.setDate(date.getDate() + numberOfDaysToAdd);
    const dateArr = [];
    dateArr.push(getDay(date));
    dateArr.push(getMonthInWords(date));
    dateArr.push(getYear(date));
    return dateArr.join(' ');
}