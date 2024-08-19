export const getRelativeTime = (dateValue:Date) => {
    console.log('dateValue',dateValue)
    const dateUTC = new Date(dateValue.toISOString()).getTime();
    const nowUTC = new Date().getTime();
    const differenceInSeconds = (nowUTC - dateUTC) / 1000;
console.log('data',dateUTC)
console.log('now',nowUTC)
    if (differenceInSeconds < 60) {
        return `${Math.floor(differenceInSeconds)} 秒前`;
    } else if (differenceInSeconds < 60 * 60) {
        return `${Math.floor(differenceInSeconds / 60)} 分鐘前`;
    } else if (differenceInSeconds < 60 * 60 * 24) {
        return `${Math.floor(differenceInSeconds / (60 * 60))} 小時前`;
    } else if (differenceInSeconds < 60 * 60 * 48) {
        return `${Math.floor(differenceInSeconds / (60 * 60 * 24))} 天前`;
    } else {
        return new Date(dateUTC).toLocaleDateString('zh-TW', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
};