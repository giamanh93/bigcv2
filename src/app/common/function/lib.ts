export function AgGridFn(lists: Array<any>) {
    const arrAgGrids: any = [];
    for (const value of lists) {
        let row: any = null;
        if (value.typeField === 'image') {
            row = {
                headerName: value.header,
                field: value.field,
                // headerClass: 'BGE8E9ED',
                filter: value.isFilter ? 'agTextColumnFilter' : '',
                sortable: false,
                width: value.width,
                minWidth: value.suppressSizeToFit ? value.width : null,
                suppressSizeToFit: value.suppressSizeToFit ? true : false,

                hide: value.isHide ? true : false,
                pinned: value.pinned,
                // cellRenderer: "avatarRendererFull",
                headerTooltip: value.note,
                tooltipField: value.field,
                // cellClass: ['text-center', 'text-right', 'border-right', 'd-flex', 'align-items-center', 'justify-content-center'],
                // valueFormatter: value.typeField == 'decimal' ? ""
            };
        } else if (value.typeField === 'image') {
            row = {
                headerName: value.header,
                field: value.field,
                // headerClass: 'BGE8E9ED',
                filter: value.isFilter ? 'agTextColumnFilter' : '',
                sortable: false,
                width: value.width,
                minWidth: value.suppressSizeToFit ? value.width : null,
                suppressSizeToFit: value.suppressSizeToFit ? true : false,
                hide: value.isHide ? true : false,
                pinned: value.pinned,
                cellRenderer: 'avatarRendererFull',
                headerTooltip: value.note,
                tooltipField: value.field,
                cellClass: ['text-center', 'text-right', 'border-right', 'd-flex', 'align-items-center', 'justify-content-center'],
                // valueFormatter: value.typeField == 'decimal' ? ""
            };
        } else if (value.typeField === 'check') {
            row = {
                headerName: value.header,
                field: value.field,
                width: value.width,
                minWidth: value.suppressSizeToFit ? value.width : null,
                suppressSizeToFit: value.suppressSizeToFit ? true : false,
                cellClass: value.cellClass,
                // headerClass: 'BGE8E9ED',
                filter: value.isFilter ? 'agTextColumnFilter' : '',
                sortable: false,
                cellRenderer: (params: any) => {
                    return `<span class="custom-control custom-checkbox float-left" style="margin-top: 7%;">
                    <input type="checkbox" ${params.value ? 'checked' : ''} disabled class="custom-control-input"  >
                    <label class="custom-control-label"></label>
                  </span>`;
                },
                hide: value.isHide ? true : false,
                pinned: value.pinned,
                headerTooltip: value.note,
            };
        } else if (value.typeField === 'decimal') {
            row = {
                headerName: value.header,
                field: value.field,
                cellClass: value.cellClass || [],
                // headerClass: value.headerClass ? value.headerClass : 'BGE8E9ED',
                cellStyle: value.cellStyle,
                // cellClassRules: value.conditionClass,
                // filter: 'agSetColumnFilter',
                sortable: false,
                aggFunc: value.aggFunc,
                rowGroup: value.rowGroup,
                rowGroupIndex: value.rowGroupIndex,
                filterParams: {
                    caseSensitive: true,
                    textFormatter: (r: any) => TextFormatter(r),
                    cellRenderer: cellRendererSanPham,
                },
                hide: value.isHide ? true : false,
                pinned: value.pinned,
                cellRenderer: value.masterDetail ? 'agGroupCellRenderer' : '',
                editable: value.editable ? value.editable : false,
                cellEditor: value.editable ? value.cellEditor : '',
                type: 'valueColumn',
                // aggFunc: 'sum',
                tooltipField: value.field,
                menuTabs: ['filterMenuTab', 'generalMenuTab'],
                headerTooltip: value.note,
                headerClass: value.headerClass,
                width: value.width,
                minWidth: value.suppressSizeToFit ? value.width : null,
                suppressSizeToFit: value.suppressSizeToFit ? true : false,
                valueFormatter: formatMargin
            };
        }  else {
            row = {
                width: value.width,
                minWidth: value.suppressSizeToFit ? value.width : null,
                // headerClass: 'BGE8E9ED',
                headerName: value.header,
                field: value.field,
                cellClass: value.cellClass,
                // filter: 'agSetColumnFilter',
                sortable: false,
                rowGroup: value.rowGroup,
                rowGroupIndex: value.rowGroupIndex,
                editable: value.editable ? value.editable : false,
                cellEditor: value.editable ? value.cellEditor : '',
                filterParams: {
                    caseSensitive: true,
                    textFormatter: (r: any) => TextFormatter(r),
                    cellRenderer: cellRendererSanPham,
                },
                menuTabs: ['filterMenuTab', 'generalMenuTab'],
                columnsMenuParams: {
                    suppressColumnFilter: true,
                  },
                cellRenderer: value.masterDetail ? 'agGroupCellRenderer' : '',
                hide: value.isHide ? true : false,
                pinned: value.pinned,
                suppressSizeToFit: value.suppressSizeToFit ? true : false,
                tooltipField: value.field,
                headerTooltip: value.note,
                suppressMovable: false,
                headerClass: value.headerClass,
            };
        }

        arrAgGrids.push(row);
    }
    return arrAgGrids;
}

export function formatMargin(params: any) {
    if (typeof params.value === 'number') {
        const numb = +params.value;
        return Number(numb).toLocaleString('en-GB');
    }
    return '';
}

export function cellRendererSanPham(params: any) {
    const rowData: any = [];
    if (!params.value || params.value === '(Select All)') {
        return params.value;
    }
    params.api.forEachNodeAfterFilter((node: any) => {
      const a = node.data;
      rowData.push(a);

    });
    return params.value;
}

export function TextFormatter(r: any) {
    if (r == null) { return null; }
    return r
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/æ/g, 'ae')
        .replace(/ç/g, 'c')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/ñ/g, 'n')
        .replace(/[òóôõö]/g, 'o')
        .replace(/œ/g, 'oe')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ýÿ]/g, 'y');
}

export function autoSizeAllGrid(skipHeader: boolean, gridColumnApi: any) {
   setTimeout(() => {
    const allColumnIds: string[] = [];
    gridColumnApi.getColumns()!.forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
    gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
   }, 100);
  }
