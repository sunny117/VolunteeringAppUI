const DayChecker = (x, y) => {
    startDate = new Date(x);
    endDate = new Date(y);

    let count = 0, payload = [];
    let temp = startDate;
    while (temp.getTime() <= endDate.getTime() && count < 7) {
        payload.push(temp.getUTCDay())
        temp.setDate(temp.getDate() + 1);
        count++;
    }
    return payload;
}

export default {
    DayChecker
}