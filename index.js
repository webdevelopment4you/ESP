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
    let displayCorona = document.getElementById('displayCorona');
    let dataForm =  document.getElementById("dataForm");
    minCoronaCurrent = document.getElementById('minCoronaCurrent');
    minCoronaCurrent.style.display='none';
    dataForm.style.display = 'none'
    
    submit1.addEventListener('click', e => {
        e.preventDefault();
        formResults="";
        displayCorona.style.display = 'none';
        suitableCorona.style.display = 'none'
        notsuitableCorona.style.display = 'none'
        console.log ('Corona power is currently hidden');
        // console.log(formResults);
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
        document.getElementById('TCArea').innerHTML = TCArea.toFixed(2);
        document.getElementById('minTRSets').innerHTML = minTRSets;
        document.getElementById('numberofTRSetsperboiler').innerHTML = numberofTRSetsperboiler;
        document.getElementById('cAreaperTR').innerHTML = cAreaperTR.toFixed(2);
        document.getElementById('meanDCCurrent').innerHTML = meanDCCurrent.toFixed(2);
        
        resultDiv.style.display = 'inherit';
        myFormforcorona.style.display = 'inherit';

        submit2.addEventListener('click', e => {
            e.preventDefault();
            let formData = new FormData(formElementforcorona);
            let meanDCCurrentvalue = formData.get('meanDCCurrentvalue');
            let coronaPower = meanDCCurrentvalue*avgDCBusvoltage/cAreaperTR;
            dataForm.style.display = 'inherit'
            console.log(coronaPower);
            let avgCoronaCurrentPerSqmm = coronaPower/60.5
            document.getElementById('coronaPower').innerHTML = coronaPower.toFixed(2);
            document.getElementById('coronaPowerMention').innerHTML = coronaPower.toFixed(2);
            document.getElementById('meanDCCurrentvalueMention').innerHTML = meanDCCurrentvalue;
            document.getElementById("avgCoronaCurrentPerSqmm").innerHTML = avgCoronaCurrentPerSqmm.toFixed(3);
            minCoronaCurrent.style.display='inherit';
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

            document.getElementById('btn').addEventListener('click', async function ()
            {       
                // const existingPdfBytes = await fetch('template.pdf').then(res => res.arrayBuffer());
                const file = document.getElementById('pdfTemplate').files[0];
                const existingPdfBytes = await file.arrayBuffer();
                
                const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                const pages = pdfDoc.getPages();
                const form = pdfDoc.getForm();

                // const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

                form.getTextField('lSpacing').setText(lSpacing);
                form.getTextField('minCorona').setText(minCorona.toString());
                form.getTextField('chambers').setText(chambers.toString());
                form.getTextField('cArea').setText(cArea.toString());
                form.getTextField('TCArea').setText(TCArea.toFixed(2).toString());
                form.getTextField('fields').setText(fields.toString());
                form.getTextField('Trsets').setText(Trsets.toString());
                form.getTextField('calc1').setText((TCArea.toFixed(2) + "/" + cArea).toString());
                form.getTextField('calc2').setText((TCArea/cArea).toFixed(2).toString());
                form.getTextField('minTRSets').setText(minTRSets.toString());
                form.getTextField('numberofTRSetsperboiler').setText((chambers+ "x" +fields+ "x" +Trsets+ "=" +numberofTRSetsperboiler).toString());
                form.getTextField('calc3').setText((TCArea.toFixed(2) + "/" + numberofTRSetsperboiler+ "=" + cAreaperTR).toString());
                form.getTextField('calc4').setText((minCorona + "x" + cAreaperTR.toFixed(2)+ "/" + "60.5").toString());
                form.getTextField('meanDCCurrent').setText((meanDCCurrent.toFixed(2) + "mA").toString());
                form.getTextField('meanDCCurrentvalueMention').setText(meanDCCurrentvalue.toString());
                form.getTextField('coronaPower').setText(coronaPower.toFixed(1).toString());
                form.getTextField('avgCoronaCurrentPerSqmm').setText(avgCoronaCurrentPerSqmm.toFixed(3).toString());
                form.getTextField('numberofTRSets').setText(numberofTRSetsperboiler.toString());

                
                const pdfBytes = await pdfDoc.save();
                
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'Filled_Form.pdf';
                link.click();
              }
        )
        });
         
    });
});





