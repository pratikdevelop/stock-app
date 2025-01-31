import { Component } from '@angular/core';
import { StockService } from '../../stock.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StockTradeComponent } from './stock-trade/stock-trade.component';

@Component({
  selector: 'app-stock-detail',
  imports: [MatSnackBarModule, RouterModule, MatIconModule, CommonModule],
  standalone:true,
  templateUrl: './stock-detail.component.html',
  styleUrl: './stock-detail.component.css'
})
export class StockDetailComponent {

  companyDetails: any;
  latestPrice: any;
  stockExists = false;
  stockExistsInPortfolio = false;
  showModal = false;
  showModaltype = "buy";
  showAlert: string | null = null;
  ticker: any;

  constructor(
    private stockService: StockService,
    private alertService: MatSnackBar,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRouter.params.subscribe((param: any) => {
      this.ticker = param.ticker;
      
    })
    this.getLatestPrice();
    this.getCompanyDetails();
    this.checkStockExistsOrNot();
    this.checkStockExistsOrNotInPortfolio();
  }

  // Check if stock exists in watchlist
  checkStockExistsOrNot(): void {
    this.stockService.checkStockInWatchlist(this.companyDetails.ticker).subscribe(
      (response: any) => {
        this.stockExists = response.exists;
      },
      (error) => {
        console.error('Error checking stock in watchlist', error);
      }
    );
  }

  // Check if stock exists in portfolio
  checkStockExistsOrNotInPortfolio(): void {
    this.stockService.checkStockInPortfolio(this.companyDetails.ticker).subscribe(
      (response: any) => {
        this.stockExistsInPortfolio = response.exists;
      },
      (error) => {
        console.error('Error checking stock in portfolio', error);
      }
    );
  }

  // Add or remove stock from watchlist
  updateWatchlist(type: string): void {
    this.stockService.updateWatchlist(type, this.companyDetails).subscribe(
      (response: any) => {
        this.showAlert = type === 'add' ? 'Stock added to watchlist successfully' : 'Stock removed from watchlist successfully';
        setTimeout(() => this.showAlert = null, 2000);
        this.checkStockExistsOrNot();
      },
      (error) => {
        console.error('Error updating watchlist', error);
      }
    );
  }

  // Handle modal show for buying or selling stock
  handleShowModal(type: string): void {
    this.showModal = true;
    this.showModaltype = type;
  }

  handleCloseModal(quantity: number, totalPrice: number, price: number): void {
    const { ticker, name } = this.companyDetails;
    this.stockService.handleStockTransaction(this.showModaltype, { ticker, name, quantity, price, totalPrice }).subscribe(
      (response) => {
        this.showAlert = "Stock transaction successful";
        this.checkStockExistsOrNotInPortfolio();
        setTimeout(() => this.showAlert = null, 1000);
      },
      (error) => {
        console.error('Error handling stock transaction', error);
      }
    );
    this.showModal = false;
  }

  // Assuming you're inside a class and have ticker, latestPrice, and companyDetails as properties

  async getLatestPrice(): Promise<void> {
    try {
      const response = await fetch(`https://stocktrader.site/latestprice/${this.ticker}`);
      const price = await response.json();
      this.latestPrice = price;  // Save the fetched price to your component's state
      console.log("Price:", this.latestPrice);
    } catch (error) {
      console.error("Failed to fetch the latest price:", error);
    }
  }

  async getCompanyDetails(): Promise<void> {
    try {
      const response = await fetch(`https://stocktrader.site/company-details/${this.ticker}`);
      const details = await response.json();
      this.companyDetails = details;  // Save the fetched details to your component's state
      console.log("Company Details:", this.companyDetails);
    } catch (error) {
      console.error("Failed to fetch company details:", error);
    }
  }

}
