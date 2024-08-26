export function getCommentWordForm(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return 'комментариев';
    }

    if (lastDigit === 1) {
        return 'комментарий';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'комментария';
    }

    return 'комментариев';
}