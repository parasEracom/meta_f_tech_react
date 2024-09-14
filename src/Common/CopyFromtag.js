export default async function CopyFromtag(id) {
  var text = document.getElementById(id).innerText;
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);

  document.getElementById("CopiedMsg").style.top = "20px";
  let delayres = await delay(1000);
  document.getElementById("CopiedMsg").style.top = "-70px";
}
const element = document.getElementById("CopiedMsg");
if (element) {
  element.style.display = "none";
} else {
  console.error("Element not found");
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
