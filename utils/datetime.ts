export const msToDatetime = (ms: number) =>
    new Date(ms).toISOString().slice(0, 16);

export const datetimeToMs = (dt: string) => new Date(dt).getTime();
