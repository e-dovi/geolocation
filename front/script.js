const submit = document.getElementById("submit-button");
const main = document.getElementById('main-form');


const addInput = () => {
  const main = document.getElementById('main-form');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder="Address or street name";
  input.className = 'address';
  input.name = `address${document.getElementById('main-form').children.length + 1}`;
  main.appendChild(input);
  main.appendChild(document.createElement('br'));
}
document.getElementById('add').addEventListener('click', addInput);

const validate = (field) => {
  let s = 0;
  let text = field.split('');
      
      for(let i=0; i<text.length; i++){
        if(text[i].charCodeAt(0)===32) {
          s += 1;
        }     
      }
    if(text.length<=s){
      return false;
    }
    else{
      return true;
    }
}
const handleSubmit =  () => {
  const e = document.getElementById('main-form');
  const formData = new FormData(e);
  //console.log(formData.get("location"))
 if(validate(formData.get("location")) && (validate(formData.get("address1"))) && (validate(formData.get("address2")))) {
  submit.disabled = true;
 const el = document.createElement('b');
 el.innerHTML = '<i class="fa-solid fa-spinner fa-spin" id="loading"></i>'
 main.appendChild(el);
 // Create FormData from the form
 // console.log(formData);
  //console.log(formData.get('input1'));
  fetch('/sort', {
    method: 'POST',
    body: formData})
    .then(async r => {
      if(r.ok){
        const result = await r.json();
        
        const final = document.getElementById('result');

        const str = document.createElement('p');
        str.innerHTML = "Sorted by distance from provided location <i class='fa-solid fa-arrow-down fa-beat-fade fa-xl'></i>";
        
        final.replaceChildren(str);

        return result;
      }
      else{
        const err = document.getElementById("error");
        err.innerHTML= "Sorry something went wrong. Please try again later. <i class='fa-solid fa-circle-xmark fa-beat'></i>"
        setTimeout(() => {
          err.innerHTML = ""
        }, 4000);
      }
    })
    .then(e => {

      //console.log(e)

      e.map((i) => {
        const final = document.getElementById('result');

        const elt = document.createElement('li');
        elt.innerHTML = Object.keys(i)[0];

        submit.disabled = false;
        final.appendChild(elt);
      });

      const rm =  document.getElementById("loading");
      rm.remove();
    })
    .catch(e => {
      const err = document.getElementById("error");
        err.innerHTML= "Sorry something went wrong. Please try again later. <i class='fa-solid fa-circle-xmark fa-beat'></i>"
        submit.disabled = false;
        setTimeout(() => {
          err.innerHTML = ""
        }, 4000);
        const rm =  document.getElementById("loading");
      rm.remove();
    })
 }
 else{
        const err = document.getElementById("error");
        err.innerHTML= "Please make sure to fill out at least the first three fields. <i class='fa-solid fa-circle-xmark fa-beat'></i>"
        submit.disabled = false;
        setTimeout(() => {
          err.innerHTML = ""
        }, 4000);
 }
 
  
}