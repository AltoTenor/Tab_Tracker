

//Some Defintions
const inputbtn=document.getElementById("input-btn")
const tabbtn=document.getElementById("tab-btn")
const deletebtn=document.getElementById("delete-btn")
const inputEL=document.getElementById("input-el")
const ulEL=document.getElementById("ul-el")

let myLeads=[]
if (localStorage.getItem('myLeads') && localStorage.getItem('myLeads')!='undefined' && localStorage.getItem('myLeads')!=undefined){
    myLeads=JSON.parse(localStorage.getItem('myLeads'))
}


//Saving to localstorage Declared
let savetolocal =(arr)=>localStorage.setItem('myLeads',JSON.stringify(arr));


//Print Function Declared
let print=(arr)=>{
    let listitems="";
    console.log(arr);
    arr.filter(i=>(i!=="")).forEach((i,index)=>listitems+=`<li>
                                                        <a href="${i}" target="_blank" id="link"> 
                                                            ${i}
                                                        </a>
                                                        <a href="#" style="font-size:13px" class="trash" data-internalid="${index}">🗑️ </a>
                                                    </li>`
                                                    );
    ulEL.innerHTML=listitems;
}

//MAIN CODE STARTS HERE
if (myLeads.length!=0) print(myLeads);

//Sigle Delete Function
function singdelete(index,arr){
    arr.splice(index,1);
    savetolocal(arr);
    print(arr);
}


document.addEventListener("click", function(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('trash')) {
        console.log('deleting' + e.target.getAttribute("data-internalid"));
        let num=e.target.getAttribute("data-internalid");
        singdelete(num,myLeads);
        // alert(e.target.innerHTML);
    }
});

//Tab Function
tabbtn.addEventListener("click",()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLeads.push(tabs[0].url);
        savetolocal(myLeads);
        print(myLeads);
    });
    
    
})

//Save Function
inputbtn.addEventListener("click",()=>{
    myLeads.push(inputEL.value)
    inputEL.value=''
    savetolocal(myLeads);
    // console.log(myLeads);
    print(myLeads);
})

//Delete all Function
deletebtn.addEventListener("dblclick",()=>{
    localStorage.clear();
    myLeads=[];
    print(myLeads);
})












//Print Function Alternate Version
// function render(){
//     let listitems="";
//     for (let i=0;i<myLeads.length;i++){
//         // ulEL.innerHTML+='<li>' +myLeads[i] + "</li>";
//         // const li = document.createElement("li");
//         // li.textContent=myLeads[i];
//         // ulEL.append(li);
//         if (myLeads[i]!="") listitems+=`<li><a href="${myLeads[i]}"> ${myLeads[i]} </a></li>`;
//     }
//     ulEL.innerHTML=listitems;
// }
// render();



// localStorage.setItem('myLeads','hi');
// console.log(localStorage.getItem('myLeads'));