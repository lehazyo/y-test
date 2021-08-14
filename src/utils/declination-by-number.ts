export const declinationByNumber = (n: number, words: string[]) => {
  const mod100 = n % 100; 
  const mod10 = n % 10;

  if (mod100 > 10 && mod100 < 20) {
    return words[2];
  }
  if (mod10 > 1 && mod10 < 5) {
    return words[1];
  }
  if (mod10 === 1) {
    return words[0];
  }
  return words[2];
}