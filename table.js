export const FIELDTYPES = Object.freeze({
    TEXT: 0,
    NUMBER: 1,
    BUTTON: 2,
    CHECKBOX: 3,
    DATE: 4
});

export class Table{
    /**
     * Constructor
     * @param {*} data 
     * @param {HTMLElement} parent 
     */
    constructor(data, parent){
        if(!data || !data.columns || !data.records || !data.options || !Array.isArray(data.columns) || !Array.isArray(data.records) || typeof data.options !== 'object' || !parent || !(parent instanceof HTMLElement)) throw new Error('Data is not supported');
        this.data = data;
        this.sortIndex = null;
        this.sortReverse = false;
        this.parent = parent;
        this.tableHeader = document.createElement('div');
        this.recordParent = document.createElement('div');
        this.parent.appendChild(this.tableHeader);
        this.parent.appendChild(this.recordParent);
        this.createHeaders();
    }

    /**
     * Sets the sort index and reverse sort variables
     * Redraws the table
     * @param {string} index  sort index
     */
    headerClick(index){
        if(index === this.sortIndex) this.sortReverse = !this.sortReverse;
        else this.sortReverse = false;
        this.sortIndex = index;
        this.create();
    }

    /**
     * Updates the table with new data
     * @param {any[]} data records
     */
    updateRecords(records){
        this.data.updateRecords = records; 
        this.create();
    }

    /**
     * Bubble sort function (The built-in array.sort function was not consistent between browsers)
     * @param {any[]} array array to sort
     * @param {()=>void} func compare function
     */
    sort(array, func){
        const retArr = array;
        let done = false; 
        for(let i = 0; i < retArr.length; i++){
            done = true;
            for(let j = 0; j < retArr.length-1; j++){
                const a = retArr[j];
                const b = retArr[j+1];
                const s = func(a,b);
                if(s > 0){
                    retArr[j] = b;
                    retArr[j+1] = a;
                    done = false;
                } 
            }
            if(done) break;
        }
        return retArr;
    }

    /**
     * Renders the headers into the parent specified in the constructor
     */
    createHeaders(){
        this.tableHeader.innerHTML = '';
        if(this.data.options.headerClassName) this.tableHeader.className = this.data.options.headerClassName;
        this.data.columns.forEach((column)=>{
            const col = document.createElement('div');
            col.innerHTML = column.headerText;
            if(column.headerColClassName) col.className = column.headerColClassName;
            if(this.data.options.headerSort) col.onclick = ()=>{ this.headerClick(column.dataField); }
            this.tableHeader.appendChild(col);
        });
    }

    /**
     * Renders the records into the parent specified in the constructor
     */
    create(){
        this.recordParent.innerHTML = '';
        if(this.data.options.recordParentClassName) this.recordParent.className = this.data.options.recordParentClassName;
        
        //Create a copy of the records(This is to get expected resoults from sorting the data)
        const records = [...this.data.records];

        //If sortindex is not null, sort the data
        if(this.sortIndex){
            this.sort(records,(a,b)=>{
                //let A = Number.isFinite(a[this.sortIndex]) || (Number.isFinite(Number(a[this.sortIndex])) && typeof a[this.sortIndex] === 'string') ? Number(a[this.sortIndex]) : a[this.sortIndex];
                //let B = Number.isFinite(b[this.sortIndex]) || (Number.isFinite(Number(b[this.sortIndex])) && typeof b[this.sortIndex] === 'string') ? Number(b[this.sortIndex]) : b[this.sortIndex];
                let A = a[this.sortIndex];
                let B = b[this.sortIndex];
                if((this.sortReverse && A > B) || (!this.sortReverse && A < B)) return -1;
                else if((this.sortReverse && A < B) || (!this.sortReverse && A > B)) return 1;
                return 0;
            });
        }

        //Iterate the sorted recrods
        records.forEach((record)=>{
            //Create row as div element and append the data to it
            const row = document.createElement('div');
            if(this.data.options.recordClassName) row.className = this.data.options.recordClassName;
            this.data.columns.forEach((column)=>{
                const col = document.createElement('div');
                switch(column.type){
                    case FIELDTYPES.DATE:
                        col.innerHTML = record[column.dataField].split('T')[0];
                        if(column.colClick) col.onclick = ()=>{ column.colClick(record, col); }
                        break;
                    case FIELDTYPES.TEXT:
                    case FIELDTYPES.NUMBER:
                        col.innerHTML = record[column.dataField];
                        if(column.colClick) col.onclick = ()=>{ column.colClick(record, col); }
                        break;
                    case FIELDTYPES.BUTTON:
                        const button = document.createElement('button');
                        button.innerHTML = record[column.dataField];
                        if(column.elementClick) button.onclick = ()=>{ column.elementClick(record, col); }
                        if(column.elementClassName) button.className = column.elementClassName;
                        col.appendChild(button);
                        break;
                    case FIELDTYPES.CHECKBOX:
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        if(typeof record[column.dataField] === 'boolean') checkbox.checked = record[column.dataField];
                        if(column.elementClick) checkbox.onclick = ()=>{ column.elementClick(record, checkbox.checked); }
                        if(column.elementClassName) checkbox.className = column.elementClassName;
                        col.onclick = (e)=>{ if(e.target !== checkbox) checkbox.click(); } //Temp?
                        col.appendChild(checkbox);
                        break;
                }
                if(column.colClassName) col.className = column.colClassName;
                row.appendChild(col);
            });

            //Set row onclick event and append row to parent
            if(this.data.options.recordClick) row.onclick = ()=>{ this.data.options.recordClick(record, row); }
            this.recordParent.appendChild(row);
        });
    }
}


/*
var exampleData = {
    columns: [
        { dataField: 'Qty', headerText: 'Antall', type: FIELDTYPES.TEXT, headerColClassName: '', colClassName: '', colClick: ()=>{}, elementClick: ()=>{}, elementClassName: '' },
        { dataField: 'ProdId', headerText: 'ProdId', type: FIELDTYPES.BUTTON, headerColClassName: '', colClassName: '', colClick: ()=>{}, elementClick()=>{}, elementClassName: '' }
        { dataField: 'Done', headerText: 'Done', type: FIELDTYPES.CHECKBOX, headerColClassName: '', colClassName: '', colClick: ()=>{}, elementClick()=>{}, elementClassName: '' }
    ],

    records: [
        { Qty: 10, ProdId: 'PR000001', Done: false },
        { Qty: 13, ProdId: 'PR000002', Done: false },
        { Qty: 17, ProdId: 'PR000003', Done: true },
        { Qty: 15, ProdId: 'PR000004', Done: false },
        { Qty: 12, ProdId: 'PR000005', Done: false }
    ], 

    options: {
        headerClassName: '',
        recordParentClassName: '',
        recordClassName: '',
        headerSort: true,
        recordClick: ()=>{}, 
        useDefaultCss: false
    }
}*/