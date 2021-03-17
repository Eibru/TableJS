/// <reference types="typescript" />
export enum FIELDTYPE {
    TEXT = 0,
    NUMBER = 1,
    BUTTON = 2,
    CHECKBOX = 3,
    DATE = 4
}

export interface TableColumn<T> {
    dataField: string;
    headerText: string;
    width?: Number;
    type: FIELDTYPE;
    headerColClassName?: string;
    colClassName?: string;
    elementClassName?: string;
    colClick?: (column:TableColumn<T>, col:HTMLElement, record:T)=>void;
    elementClick?: (column:TableColumn<T>, col:HTMLElement, record:T)=>void;
    colBeforePrint?: (column:TableColumn<T>, col:HTMLElement, record:T)=>void;
}

export interface TableOptions<T> {
    headerClassName?: string;
    recordParentClassName?: string;
    recordClassName?: string;
    headerSort?: Boolean;
    recordClick?: (record:T, rec: HTMLElement)=>void;
    recordBeforePrint?: (record:T, rec: HTMLElement)=>void;
}

export interface TableData<T>{
    columns: TableColumn<T>[];
    options: TableOptions<T>;
}

export declare class Table<T>{
    private data: TableData<T>;
    private sortIndex: string|null;
    private sortReverse: Boolean;
    private parent: HTMLElement;
    private tableHeader: HTMLElement;
    private recordParent: HTMLElement;
    private records: T[];

    constructor(data: TableData<T>, parent?: HTMLElement, records?: T[]);
    private checkRecords(): void;
    private headerClick(index:string): void;
    updateRecords(records:T[]): void;
    private sort(array:T[], func:(a:Object, b:Object)=>Number): void;
    private createHeaders(): void;
    private applyColumnStyle(column: TableColumn<T>, col: HTMLElement): void;
    create(): void;
}
