import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Stock {
  symbol: string;
  current_price: number;
  market_cap: string;
  week_high: number;
  week_low: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  checkStockInWatchlist(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/watchlist/${ticker}`);
  }

  checkStockInPortfolio(ticker: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/portfolio/${ticker}`);
  }

  updateWatchlist(type: string, companyDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/watchlist/${type}`, companyDetails);
  }

  handleStockTransaction(type: string, transactionDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${type}`, transactionDetails);
  }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/stocks/list`);
  }

}
