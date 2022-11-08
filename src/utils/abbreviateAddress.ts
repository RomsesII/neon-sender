export function abbreviateAddress(base58 = "", size = 4) {
    return `${base58.slice(0, size).toUpperCase()}****${base58.slice(-size).toUpperCase()}`;
}
