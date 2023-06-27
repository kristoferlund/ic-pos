export const shortenPrincipal = (principal: string) => {
  const parts = principal.split("-");
  return parts[0] + "..." + parts[parts.length - 1];
};
