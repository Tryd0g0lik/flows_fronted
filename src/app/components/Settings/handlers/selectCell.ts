/**
 * src\app\components\Settings\handlers\selectCell.ts
 */
import { MouseEvent } from "react";
const selectCell = {

    /**
     * @description
     * This function for getting data of cell.
     * Note! Here the proporty return's id has type number!
     * @param event - MouseEvent<HTMLTableCellElement> - event of click by button["Сохранить"]
     * @returns```
     * [
        [
            "flow",
            {
                "id": 2
            }
        ],
        [
            "type",
            {
                "id": 2,
                "content": "WRITE-AFF"
            }
        ],
        [
            "category",
            {
                "id": 1,
                "content": "MARKETIRNG"
            }
        ],
        [
            "subcategory",
            [
                {
                    "id": 4,
                    "content": "AVITO"
                },
                {
                    "id": 3,
                    "content": "FARPOST"
                }
            ]
        ],
        [
            "status",
            {
                "id": 2,
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
                "content": "2025-10-01"
            }
        ],
        [
            "updated_at",
            {
                "content": "2025-10-01"
            }
        ]
    ]
    */
    getData(event: MouseEvent<HTMLTableRowElement>){
        if (!(event.target instanceof HTMLButtonElement) && !((event.target as HTMLButtonElement).value.toLowerCase().startsWith("Сохранить"))) {
            return;
        }
        const trHtml = event.currentTarget as unknown as HTMLTableRowElement;
        const arrCellsHtml = trHtml?.querySelectorAll('td');
        if (!arrCellsHtml){
            return;
        }
        const map = new Map();
        if (trHtml.hasAttribute("data-flow")){
            map.set("flow",  {"id": Number(trHtml.getAttribute("data-flow"))});
        }
        arrCellsHtml.forEach((item: HTMLTableCellElement) => {
            const inputHTMP = item.querySelector('input');
            if (item.hasAttribute("data-type")){
                map.set("type", {
                    "id": Number(item.getAttribute("data-type")),
                    "content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder
                });
            } else if (item.hasAttribute("data-category")){
                map.set("category", {
                    "id": Number(item.getAttribute("data-category")),
                    "content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder
                });
            } else if (item.hasAttribute("data-status")) {
                map.set("status", {
                    "id": Number(item.getAttribute("data-status")),
                    "content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder
                });
            } else if (item.hasAttribute("data-name")){
                if (item.getAttribute("data-name")?.startsWith("money")){
                    map.set("money", {"content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder});
                } else if (item.getAttribute("data-name")?.startsWith("subcategory")){

                    const arrContent =item.querySelectorAll("option");
                    const arrcontent = [];
                    for (let i = 0; i < (arrContent).length; i++){
                        arrcontent.push({
                            id: Number(arrContent[i].getAttribute("data-subcategery")),
                            content: arrContent[i].value
                        });
                    }
                    map.set("subcategory", arrcontent);
                    }
                  else if (item.getAttribute("data-name")?.startsWith("slug")){
                    map.set("slug", {"content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder});
                } else if (item.getAttribute("data-name")?.startsWith("created_at")){
                    map.set("created_at", {"content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder});
                }  else if (item.getAttribute("data-name")?.startsWith("updated_at")) {
                    map.set("updated_at", {"content": ((inputHTMP as HTMLInputElement).value).length > 0 ? (inputHTMP as HTMLInputElement).value : (inputHTMP as HTMLInputElement).placeholder});
                } else {
                    null;
                }
            }
        });
        return [...map];
    },
    getFormData(data: any){
        const form = new FormData();
        data.forEach((item: any) => {
            if (item[0] === "flow"){
                form.append("flow", item[1].id);
            } else if (item[0] === "type"){
                form.append("type_id", item[1].id);
            } else if (item[0] === "status"){
                form.append("status_id", item[1].id);
            } else if (item[0] === "subcategory"){}
        });
    }
    // sendPatchRequest(data: any){null;}
};

export default selectCell;
