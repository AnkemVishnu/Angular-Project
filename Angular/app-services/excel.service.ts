import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportExcelFile(json: Array<any>, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    var wscols = [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 },];
    worksheet["!cols"] = wscols;
    var range = XLSX.utils.decode_range(worksheet['!ref']);
    for (var C = range.s.r; C <= range.e.r; ++C) {
      var address = XLSX.utils.encode_col(C) + "1"; // <-- first row, column number C
      if (!worksheet[address]) continue;
      worksheet[address].v = worksheet[address].v.toUpperCase();
    }

    const workbook: XLSX.WorkBook = { Sheets: { 'Consumers': worksheet }, SheetNames: ['Consumers'] };
    const excelArray: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelArray], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, excelFileName + new Date().getTime() + EXCEL_EXTENSION);
  }

  public importExcelFile(e: any): Array<any> {
    const bstr: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const sheetname: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetname];
    return XLSX.utils.sheet_to_json(worksheet, { raw: false });
  }

}