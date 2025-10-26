export function formatNumberWithComma(inputNumber: number): string {
    if (typeof inputNumber !== 'number' || !isFinite(inputNumber)) {
        console.error("Invalid input provided to formatNumberWithComma.");
        return '0';
    }

    return inputNumber.toLocaleString('en-US', {
        maximumFractionDigits: 0,
    });
}