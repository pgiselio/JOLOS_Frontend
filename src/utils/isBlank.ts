export function isBlank(str: string | undefined | null): boolean {
    return (!str || /^\s*$/.test(str));
}