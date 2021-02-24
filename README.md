
##Usage
###Initialization
```javascript
const table = new Table(table_data, document.getElementById('tableParent'));
```
###Updating records
```javascript
table.updateRecords(array);
```

##Table data definition
Table data is required to initialize the table
```javascript
let tableData = {
    columns: columns,
    records: records,
    options: options
};
```
###Columns options
The columns field in the tableData object contains an array where each record in the array describes a column
```javascript
tableData.columns = [
    { dataField: 'ProdId', headerText: 'Prod ID', type: FIELDTYPES.TEXT, headerColClassName: 'col header-col', colClassName: 'col', colClick: ()=>{}, elementClick()=>{}, elementClassName: '' },
    { dataField: 'Qty', headerText: 'Quantity', type: FIELDTYPES.NUMBER, headerColClassName: 'col-1 header-col', colClassName: 'col-1', colClick: ()=>{}, elementClick: ()=>{}, elementClassName: '' }
];
```

####dataField
The name of the related field in the records

####headerText
The text to be displayed in the header column

####type
Describes which datatype the cell should contain

####headerColClassName
The classname of the header column

####colClassName
The classname of the cell

####colClick
Function to be called when the cell is clicked

####elementClick
Only used when type is either FIELDTYPES.BUTTON or FIELDTYPES.CHECKBOX
Function to be called when the element is clicked

####elementClassName
Only used when type is either FIELDTYPES.BUTTON or FIELDTYPES.CHECKBOX
The classname of the element

###Records
The records field contains the records. Only the fields defined in the columns field will be displayed
```javascript
tableData.records = [
    { ProdId: 'PR000001', Qty: 10},
    { ProdId: 'PR000002', Qty: 4},
    { ProdId: 'PR000003', Qty: 6},
    { ProdId: 'PR000004', Qty: 12}
];
```

###options
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
####headerClassName
The classname of the header

####recordParentClassName
The classname of the record container

####recordClassName
The classname of the records

####headerSort
Set true if you want to sort the table by clicking the header columns

####recordClick
Function to be executed when a records is clicked. 
Returns both the data record and the generated dom record

####useDefaultCss
NOT IMPLEMENTED

##Example
```javascript
//Define table data
let tableData = {
    columns: tableData.columns = [
        { dataField: 'ProdId', headerText: 'Prod ID', type: FIELDTYPES.TEXT, headerColClassName: 'col header-col', colClassName: 'col', colClick: ()=>{}, elementClick()=>{}, elementClassName: '' },
        { dataField: 'Qty', headerText: 'Quantity', type: FIELDTYPES.NUMBER, headerColClassName: 'col-1 header-col', colClassName: 'col-1', colClick: ()=>{}, elementClick: ()=>{}, elementClassName: '' }
    ],
    records: [],
    options: {
        headerClassName: 'header',
        recordParentClassName: 'records',
        recordClassName: 'row record',
        headerSort: true,
        recordClick: (dataRec, domRec)=>{ console.log(dataRec); }, 
        useDefaultCss: false
    }
};
//Initialize table
const table = new Table(table_data, document.getElementById('tableParent'));

function onData(records){
    //Simply pass the new data into the updateRecrods method
    table.updateRecords(records);
}