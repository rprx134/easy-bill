export const roundOfPrice = (value, decimals = 2) => {
    // return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    return parseFloat(value).toFixed(decimals);
}