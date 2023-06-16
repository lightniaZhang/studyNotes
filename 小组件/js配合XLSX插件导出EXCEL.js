// function exportObject() {
//   let json = {
//     Props: { SheetNames: ["Sheet1"], Worksheets: 1, Application: "SheetJS" },
//     SheetNames: ["Sheet1"],
//     Sheets: {
//       Sheet1: {
//         "!cols": [
//           { wpx: 100 },
//           { wpx: 150 },
//         ],//列单元格设置
//         "!rows": [],//行单元格设置
//         "!merges": [
//           { s: { c: 0, r: 0 }, e: { c: 14, r: 2 } },
//           { s: { c: 0, r: 4 }, e: { c: 0, r: 6 } },
//         ],
//         /*单元格设置*/
//         A4: {
//           t: "s", //值类型
//           v: "类别", //值
//           s: {
//             font: { sz: 14, bold: true, color: { rgb: "000000" } },
//             fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "ffffff" } }, //填充样式
//             alignment: {
//               horizontal: "center",
//               vertical: "center",
//               wrap_text: true,
//             },
//             border: {
//               top: { style: "thin", color: "000000" },
//               left: { style: "thin", color: "000000" },
//               right: { style: "thin", color: "000000" },
//               bottom: { style: "thin", color: "000000" },
//             }, //边框样式
//           },
//         },
//         "!ref": "A1:O47", //excle区域
//       },
//     },
//   };
// }

function s2ab(s) {
  if (typeof ArrayBuffer !== "undefined") {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    var buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}

function exportAll() {
  let that = this;

  //导出文件名
  const newPageName = "年度通关物流费分析";

  const successCall = (response) => {
    if (response.data.result === "1") {
      if (response.data.records < 1) {
        that.$message.warning("没有数据可以导出！");
        that.endLoading();
        return;
      }

      //查询导出数据处理
      that.modelForm.tableData = JSON.parse(JSON.stringify(response.data.rows));

      //合并单元格位置起-止
      let merges = [
        { s: { c: 0, r: 0 }, e: { c: 14, r: 2 } },
        { s: { c: 0, r: 4 }, e: { c: 0, r: 6 } },
      ];

      const wb = {
        Props: {
          SheetNames: ["Sheet1"], //表格页签名
          Worksheets: 1, //表格页签数量
          Application: "SheetJS",
        },
        SheetNames: ["Sheet1"], //表格页签名
        Sheets: {
          Sheet1: { "!cols": [], "!rows": [], "!merges": merges },
        },
      };

      /*导出excle table表头*/
      let index = 0; //单元格行坐标
      let colIndex = ""; //单元格坐标

      for (const item of that.cloumData) {
        //cloumData导出列数组
        if (!item.noexport) {
          //noexport为判断是否需要导出
          colIndex =
            index > 25
              ? that.getCharCol(index)
              : String.fromCharCode(65 + index); // Unicode编码65为 A
          // colIndex为列号

          const col = colIndex + "4"; //找到单元格位置，如 A4
          index += 1;
          wb.Sheets.Sheet1["!cols"].push({
            wpx: item.width ? item.width : 100,
          });
          // 设置列宽度

          wb.Sheets.Sheet1[col] = { t: "s" }; //设置单元格值类型
          wb.Sheets.Sheet1[col]["v"] = item.label; //设置单元格值
          const bg = item.bg ? item.bg : "ffffff"; // 设置标题背景颜色
          const rgb = item.rgb ? item.rgb : "000000"; // 设置标题背景颜色
          wb.Sheets.Sheet1[col]["s"] = {
            font: { sz: 14, bold: true, color: { rgb: rgb } },
            fill: { bgColor: { indexed: 64 }, fgColor: { rgb: bg } },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrap_text: true,
            },
            border: {
              top: { style: "thin", color: "000000" },
              left: { style: "thin", color: "000000" },
              right: { style: "thin", color: "000000" },
              bottom: { style: "thin", color: "000000" },
            },
          }; // 设置单元格样式
        }
      }

      let title = [
        {
          name: "年度通关物流费分析",
          location: "A1",
          size: 18,
        },
      ];
      for (const items of title) {
        wb.Sheets.Sheet1[items.location] = { t: "s" };
        wb.Sheets.Sheet1[items.location]["v"] = items.name;
        wb.Sheets.Sheet1[items.location]["s"] = {
          font: { sz: items.size, bold: true, color: { rgb: "000000" } },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrap_text: true,
          },
          border: {
            top: { style: "thin", color: "000000" },
            left: { style: "thin", color: "000000" },
            right: { style: "thin", color: "000000" },
            bottom: { style: "thin", color: "000000" },
          },
        };
      }

      let rowsData = this.initTableDataCopy;
      wb.Sheets.Sheet1["!ref"] = "A1:" + colIndex + (rowsData.length + 7); // 设置导出数据范围

      for (let i = 0; i < rowsData.length; i++) {
        index = 0;
        let rowIndex = i + 5;
        for (const item of that.cloumData) {
          if (!item.noexport) {
            const col =
              (index > 25
                ? that.getCharCol(index)
                : String.fromCharCode(65 + index)) + rowIndex; //单元格位置

            if (
              !Number.isNaN(Number(rowsData[i][item.prop])) &&
              item.type != "select"
            ) {
              wb.Sheets.Sheet1[col] = { t: "n" };
            } else {
              wb.Sheets.Sheet1[col] = { t: "s" };
            } // 判断单元格值类型

            if (item.type === "select") {
              let obj11 = item.options.find(function (obj) {
                if (
                  obj.value ==
                  (rowsData[i][item.prop] == null ? "" : rowsData[i][item.prop])
                ) {
                  return obj;
                }
              });
              wb.Sheets.Sheet1[col]["v"] = obj11
                ? obj11.label
                : rowsData[i][item.prop];
            } else {
              wb.Sheets.Sheet1[col]["v"] =
                rowsData[i][item.prop] == null ? "" : rowsData[i][item.prop];
            }
            wb.Sheets.Sheet1[col]["s"] = {
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrap_text: true,
              },
              border: {
                left: { style: "thin", color: "000000" },
                right: { style: "thin", color: "000000" },
                bottom: { style: "thin", color: "000000" },
              },
            };
            index += 1;
          }
        }
        rowsData[i] = null;
      }
      try {
        if (window.navigator.msSaveOrOpenBlob) {
          const wbout = new Blob(
            [
              that.s2ab(
                XLSX.write(wb, {
                  bookType: "xlsx",
                  bookSST: false,
                  type: "binary",
                })
              ),
            ],
            { type: "" }
          );
          navigator.msSaveBlob(
            new Blob([wbout]),
            `${newPageName}_${Date.now()}.xlsx`
          );
        } else {
          const wbout = new Blob(
            [
              that.s2ab(
                XLSX.write(wb, {
                  bookType: "xlsx",
                  bookSST: false,
                  type: "binary",
                })
              ),
            ],
            { type: "" }
          );
          saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            `${newPageName}_${Date.now()}.xlsx`
          );
        }
        that.endLoading();
      } catch (e) {
        console.log(e);
        that.endLoading();
      }
    } else {
      that.$message({ type: "error", message: response.data.msg });
    }
    that.endLoading();
  };

  
  that.startLoading("导出中……", ".container");

  this.GLOBAL.DataQuery(
    this,
    `${this.service}postSPPagedList.do?command=PKG_IES_REPORT_ANNUAL_LOGISTICS_COST.FN_QUERYANNUALCOST`,
    {},
    successCall
  );
}
