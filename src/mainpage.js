document.getElementById('sub').onclick=readFile;
let compNames = [], valuesForEachComp = [], numberOfValues = [];
let csvContent;
   

function readFile(){
   var contents = document.getElementById('contents');
   var files = document.getElementById('file').files;//gets files from document element
   var file = files[0];//selects first file and assigns it to files
   var reader = new FileReader();//create file reader
   var line;
   reader.onload=function(evt){
      line = evt.target.result;
      //console.log(line[1]);
      //console.log(evt.target.result);
      interpretFile(line);
      //contents.innerHTML=evt.target.result;//This outputs file to page
   }
   reader.readAsBinaryString(file);
   return false;//prevents page from reloading
};
function interpretFile(line){
   let word = "", value = "";
   let n = 0, column = 0, temp = 0, pos = 0;
   let nextRow = 0;
   for(let i = 0; i != line.length; i++){
      if(line[i] === ","){
         if(nextRow > 1){
            if(value != ""){
               pos = column / 5;
               temp = parseFloat(value);
               addValues(pos, temp);
               value = "";
            }
         }
         else if(word === ""){
            continue;
         }
         else{
            compNames[n] = word;
            n++;
            word = "";
         }
         column++;
      }
      else if(line[i] === "\n"){
         nextRow++;
         if(nextRow === 1){
            for(let j = 0; j != compNames.length; j++){
               valuesForEachComp[j] = 0;
               numberOfValues[j] = 0;
            }
         }
         column = 0;
      }
      else if(nextRow < 1){
         word = word + line[i];
      }
      if(column % 5 === 4){
         if(line[i] === ","){
            continue;
         }
         value += line[i];
      }
   }
   getAverage();
   createFile();
   console.log(compNames.length);
   for(let i = 0 ; i != compNames.length; i++){
      console.log("comp:", compNames[i]);
      console.log(valuesForEachComp[i]);
      console.log(numberOfValues[i]);
   }
};
function addValues(position,value){
   if(isNaN(value) || value === 0){}
   else{
      position = Math.floor(position);
      valuesForEachComp[position] += value;
      numberOfValues[position] += 1;
   }
};
function getAverage(){
   for(let m = 0; m != compNames.length; m++){
      valuesForEachComp[m] = valuesForEachComp[m] / numberOfValues[m];
   }
};
function createFile(){
   csvContent = "data:text/csv;charset=utf-8,";

   for(let i = 0; i != compNames.length; i++){
      if(compNames[i].length === 1){}
      else{
         csvContent += compNames[i] + ",";
      }
   }
   csvContent += "\n";
   for(let i = 0; i != valuesForEachComp.length; i++){
      if(isNaN(valuesForEachComp[i])){}
      else{
         csvContent += valuesForEachComp[i] + ",";
      }
   }
   var encodeUri = encodeURI(csvContent);
   var link = document.createElement("a");
   link.setAttribute("href", encodeUri);
   link.setAttribute("download", "data.csv");
   document.body.appendChild(link);

   link.click();
  
};
