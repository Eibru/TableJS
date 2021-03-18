# Intro
Html and dom manipulation is pain. This library helps create simple tables in javascript/typescript. <br/>
You will have to write your own css to make it look decent. 

# Installation
To download the library, simply run this command in your project folder
```shell
npm install --save ......
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
    { dataField: 'ProdId', headerText: 'Prod ID', width: 6, type: FIELDTYPE.TEXT, headerColClassName: 'header-col', colClassName: 'col', elementClassName: '', colClick: (dataCol, htmlCol, dataRec)=>{}, elementClick: (dataCol, htmlCol, dataRec)=>{}, colBeforePrint: (dataCol, htmlCol, dataRec)=>{} },
    { dataField: 'Qty', headerText: 'Quantity', width: 6, type: FIELDTYPE.NUMBER, headerColClassName: 'header-col', colClassName: 'col', elementClassName: '', colClick: (dataCol, htmlCol, dataRec)=>{}, elementClick: (dataCol, htmlCol, dataRec)=>{}, colBeforePrint: (dataCol, htmlCol, dataRec)=>{} }
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
    recordClassName: 'row',
    headerSort: true,
    recordClick: (dataRec, htmlRec)=>{},
    recordBeforePrint: (dataRec, htmlRec)=>{},
}
```
#### headerClassName
The classname of the header  
<br/>

#### recordParentClassName
The classname of the record container  
<br/>

#### recordClassName
The classname of the records  
<br/>

#### headerSort
Set true if you want to sort the table by clicking the header columns  
<br/>

#### recordClick
A function which is called when a record is clicked
##### Parameters
###### dataRec 
The data record that was clicked
###### htmlRec
The generated html record  
<br/>

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

---
<br/>

## Typescript
### Install types
```shell
npm install --save-dev @types/......
```
---
<br/>

### Example
```typescript
import { Table, TableColumn, TableData, TableOptions, FIELDTYPE } from './node_modules/tablejs/lib/table.js';

//Define structure for record
interface Record {
    ProdId:string;
    Status:string;
    Qty:Number;
    Remain:Number;
}

//Define table data
let tableData:TableData<Record> = {
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
        recordClick: (dataRec:Record, domRec:HTMLElement)=>{ 
            alert(dataRec.ProdId + ' clicked!');
        }, 
        recordBeforePrint: (dataRec:Record, domRec:HTMLElement)=>{
            if(dataRec.Status === 'Done')
                domRec.style.backgroundColor = '#60bd68';
        }
    }
};

//Data records
let records = [
    { ProdId: 'PR000001', Status: 'Done', Qty: 12, Remain: 0 },
    { ProdId: 'PR000002', Status: 'InProgress', Qty: 20, Remain: 10 },
    { ProdId: 'PR000003', Status: 'NotStarted', Qty: 10, Remain: 10 }
];

//Initialize the table
if(document.getElementById('table')){
    const table = new Table(tableData, document.getElementById('table'));
    table.updateRecords(records);
}

```

