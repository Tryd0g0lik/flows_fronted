/**
 * src\classes\table.ts
 */
import {MouseEvent} from "react";
class Table {
    private readonly _table: HTMLTableElement;
    target: HTMLElement;
    tagname: string;
    private tr?: HTMLTableRowElement;
    private  _content?: object;
    /**
     * This class is oriented what him will be placed in tag '<table ocClick={(event) => new Table(event)}>'
     * @param event This is an Event which have be to emerges from source
     */
    constructor(event: MouseEvent) {
        this._table = event.currentTarget as HTMLTableElement;
        this.target = event.target as HTMLElement;
        this.tagname = this.target.tagName.toLowerCase();
        this.tr = undefined;
        this._content = undefined;
    }

    get parensTr(): HTMLTableRowElement | undefined {
       return this.tr; 
    }

    
    set parensTr(element: HTMLTableRowElement ) {
        this.tr = element;
    }

    /**
     * @param content ```
     *  [
            [
                "type",
                {
                    "data-type": "2",
                    "content": "WRITE-AFF"
                }
            ],
            [
                "category",
                {
                    "data-category": "1",
                    "content": "MARKETIRNG"
                }
            ],
            [
                "updated_at",
                {
                    "content": ""
                }
            ],
            [
                "status",
                {
                    "data-statrus": "2",
                    "content": "PRIVATE"
                }
            ],
            [
                "money",
                {
                    "content": "30000"
                }
            ],
            [
                "slug",
                {
                    "content": "line2"
                }
            ],
            [
                "created_at",
                {
                    "content": "2025-10-02T04:58:46"
                }
            ]
        ]
        ```
     */
    set content(content: []) {
        const objectFlow = new Object();
        content.forEach((item) => {
            
            objectFlow[item[0]] = item[1];
        });
        this._content = {...objectFlow};
    }

    get content(): object | undefined {
        return this._content;
    }
};

export default Table;
