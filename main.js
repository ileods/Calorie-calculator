let myRange = document.querySelector('#range');
let myValue = document.querySelector('#myValue');

const activity = document.querySelectorAll('input[name="activity"]');
const target = document.querySelectorAll('input[name="target"]');
const gender = document.querySelectorAll('input[name="gender"]');
const age = document.querySelectorAll('input[name="age"]');
const kkal = document.getElementById('result');
const inputs = document.querySelectorAll('input');


let myUnits = 'myUnits';
let off = myRange.offsetWidth / (parseInt(myRange.max) - parseInt(myRange.min));
let px =  ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetParent.offsetWidth / 2);

myValue.parentElement.style.left = px + 'px';
myValue.parentElement.style.top = myRange.offsetHeight + 'px';
myValue.innerHTML =  myRange.value;


myRange.oninput =function(){
    let px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetWidth / 2);
    myValue.innerHTML =  myRange.value ;
    myValue.parentElement.style.left = px + 'px';
};   

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

myValue.addEventListener('click',function(){
    myValue.contentEditable="true";
    myValue.addEventListener('input',function(){
        myValue.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                myValue.contentEditable="false";
                if (!isNumber(myValue.innerText)){
                    myValue.innerText=65;
                    myRange.value=65;
                } else if (myValue.innerText===''||parseInt(myValue.innerText)<40) {
                    myValue.innerText=40;
                    myRange.value=40;
                } else if (parseInt(myValue.innerText)>130){
                    myValue.innerText=130;
                    myRange.value=130;
                    
                }
                myRange.value = parseInt(myValue.innerText);
                let px = ((myRange.valueAsNumber - parseInt(myRange.min)) * off) - (myValue.offsetWidth / 2);
                myValue.parentElement.style.left = px + 'px';
                calculate();
            }
        })  
    })
})


inputs.forEach(function(item) {
    item.addEventListener('input', calculate);
})


calculate();

function calculate(){

    let weight = parseInt(myValue.innerText);
    let nameGender;
    gender.forEach(function(item){
        if (item.checked){
            nameGender=parseInt(item.value);
        }
    });

    let ageValue;
    age.forEach(function(item){
        if (item.checked){
            ageValue=parseInt(item.value)
        }
    });

    let targetValue;
    target.forEach(function(item){
        if (item.checked){
            targetValue=parseFloat(item.value);
        }
    });

    let activityValue;
    activity.forEach(function(item){
        if (item.checked) {
            activityValue = parseFloat(item.value);
        }
    });

    let halfResult=0;

    if (nameGender==1){
        if(ageValue==1){
            halfResult = (0.062 * weight + 2.036) * 240;
        } else if (ageValue==2) {
            halfResult = (0.034 * weight + 3.538) * 240;
        } else if (ageValue==3) {
            halfResult = (0.038*weight + 2.755 ) * 240
        }
    } 
    if (nameGender===2){
        if(ageValue===1){
            halfResult= (0.063 * weight + 2.896) * 240 
        } else
        if (ageValue===2) {
            halfResult= (0.0484 * weight + 3.653) * 240
        } else
        if (ageValue===3) {
            halfResult= (0.0491*weight + 2.459) * 240
        }
    }

    let result = halfResult * activityValue * targetValue;

    const formatter = new Intl.NumberFormat('ru');

    kkal.innerText = formatter.format(result);

}
