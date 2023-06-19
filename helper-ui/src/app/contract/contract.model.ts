import { ContractStatus } from "./enum/contract-status.enum";
import { CustomerPaymentStatus } from "./enum/payment-status.enum";
import { VendorDeliveryStatus } from "./enum/vendor-delivery-status.enum";

export interface Contract {
    this: Contract;
    id: number;
    customerId: number;
    vendorId: number;
    customer_payment_status: CustomerPaymentStatus;
    vendor_delivery_status: VendorDeliveryStatus;
    status: ContractStatus;
    created_at: Date;
    updated_at: Date;

    
    

  }
