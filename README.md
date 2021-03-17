# Intro
Html and dom manipulation is pain. This library helps create simple tables in javascript. <br/>
You will have to write your own css to make it look decent. 

# Installation
To download the library, simply run this command in your project folder
```shell
npm install --save git+http://192.168.123.42:3090/interfil/TableJS.git
```   
The file should now be stored in your "node_modules" folder. Copy the "Table.js" file to the project folder.

---
<br/>

# Usage
## Initialization
```javascript
const table = new Table(tableData, document.getElementById('tableParent'));
```

---
<br/>

## Updating records with data
```javascript
table.updateRecords(array);
```

---
<br/>

# Table data definition
Table data is required to initialize the table
```javascript
let tableData = {
    columns: columns
    options: options
};
```
---
<br/>


## columns
The columns field in the tableData object contains an array where each record in the array describes a column
```javascript
tableData.columns = [
    { dataField: 'ProdId', headerText: 'Prod ID', width: 8, type: FIELDTYPE.TEXT, headerColClassName: 'col header-col', colClassName: 'col', colClick: (dataCol, htmlCol, dataRec)=>{ console.log(dataCol); } },
    { dataField: 'Qty', headerText: 'Quantity', width: 4, type: FIELDTYPE.NUMBER, headerColClassName: 'col-1 header-col', colClassName: 'col-1', colClick: (dataCol, htmlCol, dataRec)=>{ console.log(dataCol); } }
];
```

#### dataField
The name of the related field in the records  
<br/>
#### headerText
The text to be displayed in the header column  
<br/>
#### width
The with of the column. Similarly to the bootstrap css library, a row is defined to have a width of 12, so all the widths of the columns has to add up to 12 or lower.  
<br/>
#### type
Describes which datatype the cell should contain  
<br/>
#### headerColClassName
The classname of the header column  
<br/>
#### colClassName
The classname of the cell  
<br/>

#### elementClassName
The classname of the element  
Only used when type is either FIELDTYPE.BUTTON or FIELDTYPE.CHECKBOX  
<br/>

#### colClick
Function to be called when the cell is clicked  
##### Parameters
###### dataCol 
The data column / this
###### htmlCol
The generated html column
###### dataRec
The data record  
<br/>

#### elementClick
Function to be called when the element is clicked  
Only used when type is either FIELDTYPE.BUTTON or FIELDTYPE.CHECKBOX  
##### Parameters
###### dataCol 
The data column / this
###### htmlCol
The generated html column
###### dataRec
The data record  
<br/>

#### colBeforePrint
A function that is called before printing the cell  
##### Parameters
###### dataCol 
The data column / this
###### htmlCol
The generated html column
###### dataRec
The data record

---
<br/>

## options
```javascript
tableData.options = {
    headerClassName: 'header',
    recordParentClassName: 'records',
    recordClassName: 'row record',
    headerSort: true,
    recordClick: (dataRec, domRec)=>{ console.log(dataRec); }, 
    useDefaultCss: false
}
```
#### headerClassName
The classname of the header  

#### recordParentClassName
The classname of the record container  

#### recordClassName
The classname of the records  

#### headerSort
Set true if you want to sort the table by clicking the header columns  

#### recordClick
A function which is called when a record is clicked
##### Parameters
###### dataRec 
The data record that was clicked
###### htmlRec
The generated html record  

#### recordBeforePrint
##### Parameters
###### dataRec 
The data record that is being processed
###### htmlRec
The generated html record

---
<br/>

## Example
```javascript
import {Table, FIELDTYPE } from './table.js';

//Define table data
let tableData = {
    columns: [
        { dataField: 'ProdId', headerText: 'ProdId', width: 3, type: FIELDTYPE.TEXT, headerColClassName: 'header-col', colClassName: 'col' },
        { dataField: 'Status', headerText: 'Status', width: 3, type: FIELDTYPE.TEXT, headerColClassName: 'header-col', colClassName: 'col' },
        { dataField: 'Qty', headerText: 'Quantity', width: 3, type: FIELDTYPE.NUMBER, headerColClassName: 'header-col', colClassName: 'col' },
        { dataField: 'Remain', headerText: 'Remaining quantity', width: 3, type: FIELDTYPE.NUMBER, headerColClassName: 'header-col', colClassName: 'col' }
    ],
    options: {
        headerClassName: 'header',
        recordParentClassName: 'records',
        recordClassName: 'row record',
        headerSort: true,
        recordClick: (dataRec, domRec)=>{ 
            alert(dataRec.ProdId + ' clicked!');
        }, 
        recordBeforePrint: (dataRec, domRec)=>{
            if(dataRec.Status === 'Done')
                dataRec.style.backgroundColor = '#60bd68';
        }
    }
};

//Initialize the table
const table = new Table(tableData, document.getElementById('tableParent'));

//Data records
let records = [
    { ProdId: 'PR000001', Status: 'Done', Qty: 12, Remain: 0 },
    { ProdId: 'PR000002', Status: 'InProgress', Qty: 20, Remain: 10 },
    { ProdId: 'PR000003', Status: 'NotStarted', Qty: 10, Remain: 10 }
];

//Update the table with recrods
table.updateRecords(records);

```