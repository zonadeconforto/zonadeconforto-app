/**
 * Removes any non-numeric characters from a string.
 *
 * Useful for CPF, CNPJ, phone numbers and other masked inputs.
 */
export function removeMask(value: string): string {
  return value.replace(/\D/g, "");
}
