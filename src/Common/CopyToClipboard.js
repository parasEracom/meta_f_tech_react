export default async function CopyToClipboard(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(copyText.value);
  
    document.getElementById("CopiedMsg").style.top = '20px';
    let delayres = await delay(1000);
    document.getElementById("CopiedMsg").style.top = '-70px';   
};

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
