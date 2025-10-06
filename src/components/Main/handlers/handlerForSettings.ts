/**
 * src\components\Main\handlers\handlerForSettings.ts
 */

const handlerSettings = {

    /**
     *
     * @param target This 'target' should be from "<td data-name='setting'>"" HTMLTableCellElement
     * @returns ```
     * [
     * [
            "flof",
            {
                "id": "line2"
            }
        ],
        [
            "type",
            {
                "id": "2",
                "content": "WRITE-AFF"
            }
        ],
        [
            "category",
            {
                "id": "1",
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
                "id": "2",
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
            "id",
            {
                "content": "2025-10-02T04:58:46"
            }
        ]
    ]
        ```
     *
     */
    getAllTdOfTr(target: HTMLTableCellElement) {
        const trHTML = target.tagName.toLowerCase().startsWith("svg")
        ? (((target.parentElement as HTMLButtonElement).parentElement as HTMLTableCellElement).parentElement as HTMLTableRowElement)
        : target.parentElement as HTMLTableRowElement;
        if (!(trHTML.tagName.toLowerCase().startsWith("tr"))) return;
        const allTdHtml = trHTML.querySelectorAll('td');
        const map = new Map();
        if (trHTML.hasAttribute("data-flow")){
            map.set("flow",  {"id": trHTML.getAttribute("data-flow")});
        }

        allTdHtml.forEach((item: HTMLTableCellElement) =>{
            if (item.hasAttribute("data-type")){
                map.set("type", {
                    "id": item.getAttribute("data-type"),
                    "content": item.textContent
                });
            } else if (item.hasAttribute("data-category")){
                map.set("category", {
                    "id": item.getAttribute("data-category"),
                    "content": item.textContent
                });
            } else if (item.hasAttribute("data-status")) {
                map.set("status", {
                    "id": item.getAttribute("data-status"),
                    "content": item.textContent
                });
            } else if (item.hasAttribute("data-name")){
                if (item.getAttribute("data-name")?.startsWith("money")){
                    map.set("money", {"content": item.textContent});
                } else if (item.getAttribute("data-name")?.startsWith("subcategory")){

                    const arrContent =item.querySelectorAll("option");
                    const arrcontent = [];
                    for (let i = 0; i < (arrContent).length; i++){
                        arrcontent.push({
                            id: arrContent[i].getAttribute("data-subcategery"),
                            content: arrContent[i].textContent
                        });
                    }
                    map.set("subcategory", arrcontent);
                    }
                  else if (item.getAttribute("data-name")?.startsWith("slug")){
                    map.set("slug", {"content": item.textContent});
                } else if (item.getAttribute("data-name")?.startsWith("created_at")){
                    map.set("created_at", {"content": item.textContent});
                }  else if (item.getAttribute("data-name")?.startsWith("updated_at")) {
                    map.set("updated_at", {"content": item.textContent});
                }
            }

        });
        return [...map];
    }
};

export default handlerSettings;
