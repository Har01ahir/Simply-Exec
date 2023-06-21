import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Contract } from '../contract.model';

// TODO: Replace this with your own data model type


// TODO: replace this with real data from your application
// const EXAMPLE_DATA: Contract[] = [];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ContractTableDataSource extends DataSource<Contract> {
  data: Contract[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(data: Contract[]) {
    super();
    this.data = data;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Contract[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Contract[]): Contract[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Contract[]): Contract[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    
    // 'created_at','updated_at'
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'customerId': return compare(+a.customerId, +b.customerId, isAsc);
        case 'vendorId': return compare(+a.vendorId, +b.vendorId, isAsc);
        case 'customer_payment_status': return compare(a.customer_payment_status, b.customer_payment_status, isAsc);
        case 'vendor_delivery_status': return compare(a.vendor_delivery_status, b.vendor_delivery_status, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'created_at': return compareTimestamp(a.created_at, b.created_at, isAsc);
        case 'updated_at': return compareTimestamp(a.updated_at, b.updated_at, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareTimestamp(a:Date, b: Date, isAsk: boolean) {
  return ( Number(a.getDate) - Number(b.getDate) );
}
