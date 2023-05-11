export const formatDate = (date: Date) => {
    date = new Date(date);
    return (
        `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}(${[ "日", "月", "火", "水", "木", "金", "土" ][date.getDay()]})`
    );
}

export const formatTime = (date: Date) => {
    const startTime = new Date(date);
    const hundMin = 100 * 60 * 1000;
    const endTime = new Date(date);
    endTime.setTime(startTime.getTime() + hundMin);
    let startMin:string|number = startTime.getMinutes()
    if (0 <= startMin && startMin <= 9) {
        startMin = `0${startMin}`;
    }

    let endMin:string|number = endTime.getMinutes()
    if (0 <= endMin && endMin <= 9) {
        endMin = `0${endMin}`;
    }
    return (
        `${startTime.getHours()}:${startMin} 〜 ${endTime.getHours()}:${endMin}`
    );
}