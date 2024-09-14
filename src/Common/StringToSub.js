export default function Change(string) {
  try {
    if (string?.length > 10) {
      let firstFour = string.slice(0, 10);
      let lastFour = string.slice(-10);
      let subString = firstFour + ".........." + lastFour;
      return subString;
    } else {
      return string;
    }
  } catch (e) {
    console.log(e);
  }
}
