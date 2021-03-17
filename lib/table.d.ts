/// <reference types="typescript" />
export enum FIELDTYPE {
    TEXT = 0,
    NUMBER = 1,
    BUTTON = 2,
    CHECKBOX = 3,
    DATE = 4
}

export interface TableColumn {
    dataField: string;
    headerText: string;
    width?: Number;
    type: FIELDTYPE;
    headerColClassName?: string;
    colClassName?: string;
    elementClassName?: string;
    colClick?: (column:TableColumn, col:HTMLElement, record:Object)=>void;
    elementClick?: (column:TableColumn, col:HTMLElement, record:Object)=>void;
    colBeforePrint?: (column:TableColumn, col:HTMLElement, record:Object)=>void;
}

export interface TableOptions {
    headerClassName?: string;
    recordParentClassName?: string;
    recordClassName?: string;
    headerSort?: Boolean;
    recordClick?: (record:Object, rec: HTMLElement)=>void;
    recordBeforePrint?: (record:Object, rec: HTMLElement)=>void;
}

export interface TableData{
    columns: TableColumn[];
    records?: Object[];
    options: TableOptions;
}

export declare class Table{
    private data: TableData;
    private sortIndex: string|null;
    private sortReverse: Boolean;
    private parent: HTMLElement;
    private tableHeader: HTMLElement;
    private recordParent: HTMLElement;
    private records: Object[];

    constructor(data: TableData, parent: HTMLElement, records?: Object[]);
    checkRecords(): void;
    headerClick(index:string): void;
    updateRecords(records:Object[]): void;
    sort(array:Object[], func:(a:Object, b:Object)=>Number): void;
    createHeaders(): void;
    applyColumnStyle(column: TableColumn, col: HTMLElement): void;
    create(): void;
}
