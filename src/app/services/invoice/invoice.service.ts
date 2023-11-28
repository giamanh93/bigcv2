import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient, private router: Router) {
  }

  fetchInvoices() {
    const headers = {
      'Content-Type': 'application/json',
      'retailer': 'ecofoods',
      'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IndYYSJ9.eyJpc3MiOiJrdnNzand0Iiwic3ViIjo0MzE0MDMsImlhdCI6MTcwMTEzOTY0NywiZXhwIjoxNzAzNTU4ODQ3LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIwOTQ1NzY3ODg2Iiwicm9sZXMiOlsiVXNlciJdLCJwZXJtcyI6IiIsImt2c291cmNlIjoiUmV0YWlsIiwia3Z1c2V0ZmEiOjAsImt2d2FpdG90cCI6MCwia3ZzZXMiOiJlOTdmNWVmODYxMzU0ZjQ0YjgwZmU5NGJhMTlkMDI5MyIsImt2dWlkIjo0MzE0MDMsImt2bGFuZyI6InZpLVZOIiwia3Z1dHlwZSI6MCwia3Z1bGltaXQiOiJGYWxzZSIsImt2dWFkbWluIjoiRmFsc2UiLCJrdnVhY3QiOiJUcnVlIiwia3Z1bGltaXR0cmFucyI6IkZhbHNlIiwia3Z1c2hvd3N1bSI6IlRydWUiLCJrdmJpIjoiVHJ1ZSIsImt2Y3R5cGUiOjIsInVzZUJJIjp7IkN1c3RvbWVyQklSZXBvcnRfUmVhZCI6W10sIlNhbGVCSVJlcG9ydF9SZWFkIjpbXSwiUHJvZHVjdEJJUmVwb3J0X1JlYWQiOltdLCJGaW5hbmNlQklSZXBvcnRfUmVhZCI6W119LCJrdmJpZCI6NzM4MTcsImt2cmluZGlkIjoxMSwia3ZyY29kZSI6ImVjb2Zvb2RzIiwia3ZyaWQiOjcxNzI1MCwia3Z1cmlkIjo3MTcyNTAsImt2cmdpZCI6MjR9.Ryc-afu0rCKljfl-vHX3N8zKT_0Ljl_pwy_DOEXpz3oEH56MyfrQBXxxZDeYZEUouLijeJbg5fkH67UWUqS4Ipa4aLZa9zmG9InPXu8M9TfQd-kYb9jRv5yooq9hAWHEGJzKVQbqHt9iT75CmF41avB21rmKMoVpVU9H-cMEKh1El9ilgp--ghCYCiZuEYqAkNlTeK8Ix17GESwfhd6VToB2Hw482zLm2s2lAfSt5E7aKTLR0_RdMjTdgrYb8L-5TWiR-cp9kDu0rhqRQrowASqxaSIoz4bE7zyg2_0pwjCEnfyq882hXlvSUALQ4rUigW45xDaF1VltUT9rXPpa2Q',
      'branchid': '180921'
      // Bạn có thể thêm Cookie hoặc các header khác nếu cần thiết
    };

    const body = {

      'FiltersForOrm': {
        'Code': 'HD454415',
        'BranchIds': [73817],
        'FromDate': '2013-11-25T17:00:00.000Z',
        'ToDate': '2023-11-26T17:00:00.000Z',
        'InvoiceStatus': [3, 1]
      }
    };

    this.http.post('https://api-man1.kiotviet.vn/api/invoices/list', body, {headers})
      .subscribe(
        data => {
          // Xử lý dữ liệu ở đây
          console.log(data);
          // Chuyển hướng người dùng tới trang mới, giả sử là '/invoices'
          this.router.navigate(['https://ecofoods.kiotviet.vn/man/#/Invoices']);
        },
        error => {
          console.error(error);
        }
      );
  }
}
