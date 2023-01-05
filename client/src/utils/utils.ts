export const removeAccentsAndLower = (string: string) =>
    string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();