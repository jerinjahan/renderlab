export function formatDateTime(isoString: string, locale: string = "en-AU") {
    const date = new Date(isoString);

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    }).format(date);
}
