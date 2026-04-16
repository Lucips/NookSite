
const form=document.querySelector('form');

if (!form){
    console.log('No form found;exiting...');
    exit(0); /* ReqJ1 */
}

function updatePreview(){ /* ReqJ2 */
    const name=document.querySelector('#name').value;
    const email=document.querySelector('#email').value;
    const decoration=document.querySelector('#decoration').checked;
    const fishing=document.querySelector('#fishing').checked;
    const bughunting=document.querySelector('#bughunting').checked;
    const fossils=document.querySelector('#fossils').checked;
    const tips=document.querySelector('#tips').checked;

    preview.innerHTML=`
    <h3>Contact Preview</h3>
    <p><strong>Name:</strong>${name}</p>
    <p><strong>Email:</strong>${email}</p>
    <p><strong>Decoration:</strong>${decoration}</p>
    <p><strong>Fishing:</strong>${fishing}</p>
    <p><strong>Bughunting:</strong>${bughunting}</p>
    <p><strong>Fossils:</strong>${fossils}</p>
    <p><strong>Tips:</strong>${tips}</p>
    `;
}

function checkValidityState(field){  /* ReqJ3 */
    field.classList.remove('valid','invalid');

    if (field.checkValidity()){
        field.classList.add('valid');
    }else{
        field.classList.add('invalid');
    }
}

function validateform(){ /* ReqJ4 */ /* ReqJ5 */
    const errorbox=document.getElementById('error-box');
    errorbox.textContent='';
    errorbox.classList.remove('visible');

    const form =document.querySelector('form');
    if (!form.reportValidity()){
        return false;
    }

    const customError=checkCustomRules();

    if(customError){ /* ReqJ5 */
        errorbox.textContent=customError;
        errorbox.classList.add('visible');
        return false;
    }
    return true;
}


function checkCustomRules(){ /* ReqJ5 */
    
    const referralSelected=document.querySelector('#no').checked;
    const tipsselected=document.querySelector('#tips').checked;


    if(referralSelected && tipsselected){
        document.querySelector('#no').focus();
        return 'You will not recive any tips if you don`t select yes';
    }
    return null;
}


function handleKeydown(event){ /* ReqJ7 */
   if (event.key =='Enter'){
        document.getElementById('submit-btn').classList.add('light');
   }
}


function handleMouseOver(element){
    element.classList.add('light');
}
function handleMouseOut(element){
    element.classList.remove('light');
}
