export function formatCkBtc(amount: bigint | undefined) {
  if (!amount) return "0";
  const integerPart = amount / 100000000n;
  const fractionalPart = amount % 100000000n;
  const fractionalPartString = fractionalPart.toString().padStart(8, "0");
  const fractionalPartTrimmed = fractionalPartString.replace(/0+$/, ""); // Removes trailing zeroes
  console.log(
    amount,
    integerPart,
    fractionalPart,
    fractionalPartString,
    fractionalPartTrimmed
  );
  return `${integerPart.toLocaleString()}.${fractionalPartTrimmed}`;
}
