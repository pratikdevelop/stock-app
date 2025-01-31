import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { StockService } from '../stock.service';
interface Stock {
  symbol: string;
  current_price: number;
  market_cap: string;
  week_high: number;
  week_low: number;
}

@Component({
  selector: 'app-stock-listing',
  standalone: true,
  imports: [MatCardModule, MatTableModule],
  templateUrl: './stock-listing.component.html',
  styleUrl: './stock-listing.component.css'
})
  


export class StockListingComponent {
  stocks: Stock[] = [];
  displayedColumns: string[] = ['symbol', 'current_price', 'market_cap', 'week_high', 'week_low'];  // Add the columns you want to display


  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }
}
