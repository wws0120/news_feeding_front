export const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString.toString().replace(' ', 'T')).getTime();  
    const now = new Date().getTime(); 
    const differenceInSeconds = (now - date) / 1000;

    if (differenceInSeconds < 60) {
        return `${Math.floor(differenceInSeconds)} 秒前`;
    } else if (differenceInSeconds < 60 * 60) {
        return `${Math.floor(differenceInSeconds / 60)} 分鐘前`;
    } else if (differenceInSeconds < 60 * 60 * 24) {
        return `${Math.floor(differenceInSeconds / (60 * 60))} 小時前`;
    } else if (differenceInSeconds < 60 * 60 * 48) {
        return `${Math.floor(differenceInSeconds / (60 * 60 * 24))} 天前`;
    } else {
        return new Date(date).toLocaleDateString('zh-TW', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }
};