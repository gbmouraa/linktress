export const copyToClipboard = (username: string) => {
  const text = "https://linktress-pied.vercel.app/linktress/";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text + username);
  }
};
