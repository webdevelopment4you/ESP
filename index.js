document.addEventListener('DOMContentLoaded', e => {
    let formElement = document.forms.myForm;
    let resultDiv = document.getElementById('myResults');
    let suitableDiv = document.getElementById('displaySuccess');
    let notsuitableDiv = document.getElementById('displayDanger');
    let formResults = document.getElementById('formResults');
    let fillDetails = document.getElementById('fillDetails');

    formElement.addEventListener('submit', e => {
        e.preventDefault();
        formResults="";
        console.log(formResults);
        let formData = new FormData(formElement); // build form data
        let cArea = formData.get('cArea'); // get form field values
        let chambers = formData.get('chambers');
        let lanes = formData.get('lanes');
        let lSpacing = formData.get('lSpacing');
        let fields = formData.get('fields');
        let lFields = formData.get('lFields');
        let hFields = formData.get('hFields');
        let Trsets = formData.get('Trsets');

        let TCArea = 2* parseFloat(chambers) * parseFloat(lanes)* parseFloat(fields) * parseFloat(lFields) * parseFloat(hFields);
        console.log('TCArea', TCArea);

        let minTRSets = Math.ceil(TCArea/cArea);
        console.log('minimum TR Sets Required', minTRSets);

        let numberofTRSetsperboiler = chambers*fields*Trsets;
        console.log('number od TR Sets per Boiler', numberofTRSetsperboiler);

        let cAreaperTR = TCArea/numberofTRSetsperboiler;
        console.log('collection area per TR Sets', cAreaperTR);

        if (cAreaperTR<cArea) {
            if (notsuitableDiv.style.display='none') {
                suitableDiv.style.display = 'inherit';
            } else {
                notsuitableDiv.style.display='none'
                suitableDiv.style.display = 'inherit';
            }
        } else {
            if (suitableDiv.style.display = 'none') {
              notsuitableDiv.style.display = 'inherit';
            } else {
                suitableDiv.style.display = 'none'
                notsuitableDiv.style.display = 'inherit';
            }
        }

        if (fillDetails.style.display='inherit') {
            fillDetails.style.display='none';
        } else {
            fillDetails.style.display='inherit';
        }
        document.getElementById('TCArea').innerHTML = TCArea;
        document.getElementById('minTRSets').innerHTML = minTRSets;
        document.getElementById('numberofTRSetsperboiler').innerHTML = numberofTRSetsperboiler;
        document.getElementById('cAreaperTR').innerHTML = cAreaperTR;
        
        resultDiv.style.display = 'inherit';
    });

});