import currency from "currency.js";

export function formatCurrencyText(value) {
    return currency(value,
        {separator: ",", decimal: ".", symbol: "$"}
    ).format();
}

export function computeCurrencyTextColor(value) {
    return value < 0 ? "#c62828" : "#4caf50";
}