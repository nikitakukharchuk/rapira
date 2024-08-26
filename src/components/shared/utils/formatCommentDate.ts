export function formatCommentDate(locales?: string | string[]) {
    const date = new Date();

    const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const formattedDate = date.toLocaleDateString(locales || 'ru-RU', optionsDate);
    const formattedTime = date.toLocaleTimeString(locales || 'ru-RU', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
}