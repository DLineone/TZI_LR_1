const inputtext = document.querySelector(".inputtext");
const inputkeys = document.querySelector(".inputkeys");
const outputcodetext = document.querySelector(".outputcodetext");
const outputdecodetext = document.querySelector(".outputdecodetext");

function fileInputHandler(event)
{
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    inputtext.value = reader.result
      .replace(/[^a-zA-Z \.\r\n]/g, "")
      .toLowerCase();
  }
  reader.readAsText(file);
}

function dropHandler(event)
{
  console.log('File(s) dropped');
  event.preventDefault();

  if (event.dataTransfer.items) {

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      inputtext.value = reader.result
        .replace(/[^a-zA-Z \.\r\n]/g, "")
        .toLowerCase();
    }
    reader.readAsText(file);
  }
}

function dragOverHandler(event) {
  event.preventDefault();
}

const textAreas = document.querySelectorAll("textarea");

[...textAreas].map((textArea)=>
{
  textArea.addEventListener("dragover", (event)=>
  {
    event.preventDefault();
  });
  
  textArea.addEventListener("drop", (event)=>
  {
    console.log('File(s) dropped');
    event.preventDefault();

    if (event.dataTransfer.items) {

      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        event.target.value = reader.result
          .replace(/[^a-zA-Z \.\r\n]/g, "")
          .toLowerCase();
      }
      reader.readAsText(file);
    }
  });
});

function codeText()
{
  let text = inputtext.value;
  text = text.split('');
  let keys = inputkeys.value;
  keys = keys.split(' ');

  for(let i = 0, count = 0; i < text.length; i++, count++)
  {
    if( (/[a-z]/).test(text[i]) )
    {
      let letter = text[i];
      let letterCode = letter.charCodeAt() - "a".charCodeAt();
      for (let j = 0; j < keys.length; j++) {
        let cryptoLetter = keys[j][count % keys[j].length]; 
        let cryptoCode = cryptoLetter.charCodeAt() - "a".charCodeAt() + 1; 
        letterCode = letterCode + cryptoCode;
      }
      letterCode = "a".charCodeAt() + (letterCode % ("z".charCodeAt() - "a".charCodeAt() + 1));

      text[i] = String.fromCharCode(letterCode);
    }
    else
    {
      count--;
    }
  }
  text = text.join('');
  outputcodetext.value = text;
}

function decodeText()
{
  let text = outputcodetext.value;
  text = text.split('');
  let keys = inputkeys.value;
  keys = keys.split(' ');

  for(let i = 0, count = 0; i < text.length; i++, count++)
  {
    if( (/[a-z]/).test(text[i]) )
    {
      let letter = text[i];
      let letterCode = letter.charCodeAt() - "a".charCodeAt();
      for (let j = 0; j < keys.length; j++) {
        let cryptoLetter = keys[j][count % keys[j].length]; 
        let cryptoCode = cryptoLetter.charCodeAt() - "a".charCodeAt() + 1; 
        letterCode = letterCode - cryptoCode + ("z".charCodeAt() - "a".charCodeAt() + 1);
      }
      letterCode = "a".charCodeAt() + (letterCode % ("z".charCodeAt() - "a".charCodeAt() + 1));

      text[i] = String.fromCharCode(letterCode);
    }
    else
    {
      count--;
    }
  }
  text = text.join('');
  outputdecodetext.value = text;
}

function saveCodetText (filename) 
{
    const blob = new Blob([outputcodetext.value], {type: 'UTF-8'});

    if(window.navigator.msSaveOrOpenBlob) 
    {
        window.navigator.msSaveBlob(blob, filename);
    }
    else
    {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function saveDecodetText(filename) 
{
    const blob = new Blob([outputdecodetext.value], {type: 'UTF-8'});

    if(window.navigator.msSaveOrOpenBlob) 
    {
        window.navigator.msSaveBlob(blob, filename);
    }
    else
    {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}