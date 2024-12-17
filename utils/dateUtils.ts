export const getCurrentDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const dayName = days[currentDate.getDay()];
    const monthName = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();
    return ` ${dayName}, ${dayOfMonth} ${monthName} `;
};

export const formatDate = (datetime: any) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = new Date(datetime);

    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${day} ${month}`;
};

export const formatDateForApi = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    return `${year}-${month}-${day}`;
};
