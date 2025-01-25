document.addEventListener('DOMContentLoaded', e => {
    let formElement = document.forms.myForm;
    let formElementforcorona = document.forms.myFormforcorona;
    let resultDiv = document.getElementById('myResults');
    let suitableDiv = document.getElementById('displaySuccess');
    let notsuitableDiv = document.getElementById('displayDanger');
    let suitableCorona = document.getElementById('displayCoronasuccess');
    let notsuitableCorona = document.getElementById('displayCoronadanger');
    let formResults = document.getElementById('formResults');
    let fillDetails = document.getElementById('fillDetails');
    let myFormforcorona = document.getElementById('myFormforcorona');
    let avgDCBusvoltage = 60.5;
    const submit1 = document.getElementById('submit1');
    const submit2 = document.getElementById('submit2');
    let displayCorona = document.getElementById('displayCorona')

    submit1.addEventListener('click', e => {
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
        let minCorona = formData.get('minCorona');

        let TCArea = 2* parseFloat(chambers) * parseFloat(lanes)* parseFloat(fields) * parseFloat(lFields) * parseFloat(hFields);
        console.log('TCArea', TCArea);

        let minTRSets = Math.ceil(TCArea/cArea);
        console.log('minimum TR Sets Required', minTRSets);

        let numberofTRSetsperboiler = chambers*fields*Trsets;
        console.log('number od TR Sets per Boiler', numberofTRSetsperboiler);

        let cAreaperTR = TCArea/numberofTRSetsperboiler;
        console.log('collection area per TR Sets', cAreaperTR);

        let meanDCCurrent = minCorona*cAreaperTR/avgDCBusvoltage;
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
        document.getElementById('meanDCCurrent').innerHTML = meanDCCurrent;
        
        resultDiv.style.display = 'inherit';
        myFormforcorona.style.display = 'inherit';
        submit2.addEventListener('click', e => {
            e.preventDefault();
            let formData = new FormData(formElementforcorona);
            let meanDCCurrentvalue = formData.get('meanDCCurrentvalue');
            let coronaPower = meanDCCurrentvalue*avgDCBusvoltage/cAreaperTR;
            console.log(coronaPower);
            document.getElementById('coronaPower').innerHTML = coronaPower;
            if (coronaPower<minCorona) {
                if (suitableCorona.style.display='none') {
                    notsuitableCorona.style.display = 'inherit';
                } else {
                    suitableCorona.style.display='none'
                    notsuitableCorona.style.display = 'inherit';
                }
            } else {
                if (notsuitableCorona.style.display = 'none') {
                    suitableCorona.style.display = 'inherit';
                } else {
                    notsuitableCorona.style.display = 'none'
                    suitableCorona.style.display = 'inherit';
                }
            }
            displayCorona.style.display = 'inherit';
        });
    });

});