# truemoney-voucher

[![npm version](https://img.shields.io/npm/v/truemoney-voucher.svg)](https://www.npmjs.com/package/truemoney-voucher)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/GPL-3.0)

A TypeScript package for redeeming TrueMoney vouchers (อั่งเปาทรูมันนี่) through the official TrueMoney API.

## Installation

```bash
npm install truemoney-voucher
```

## Usage

```typescript
import redeemVoucher, { VoucherError } from 'truemoney-voucher';

// Basic usage
async function redeemTrueMoneyVoucher() {
  try {
    // Parameters: recipient phone number and voucher code
    const result = await redeemVoucher('0891234567', 'v=ABCDE12345FGHIJ67890KLMNO12345PQRST67890');
    
    console.log(`Received ฿${result.amount} from ${result.name}`);
    return result; // { amount: number, name: string, code: string }
  } 
  catch (error) {
    if (error.message === VoucherError.INVALID_PHONE) {
      console.error('Invalid phone number format');
    } 
    else if (error.message === VoucherError.INVALID_VOUCHER) {
      console.error('Invalid voucher code format');
    } 
    else {
      console.error('API Error:', error.message);
    }
  }
}
```

## API Reference

**Parameters:**

Gets redeemed amount, recipient name, and redeemed voucher code.

| Parameter | Type | Description |
| --- | --- | --- |
| `phone` | string | Recipient phone number (digits only) |
| `voucherCode` | string | Voucher code in either direct format or URL parameter format (v=XXXXX...) |

**Returns:**

Promise resolving to a `VoucherResult` object:

| Property | Type | Description |
| --- | --- | --- |
| `amount` | number | Redeemed amount (฿) |
| `name` | string | Recipient name |
| `code` | string | Redeemed voucher code |

**Errors:**

Throws an Error with one of these messages:

| Error Message | Description |
| --- | --- |
| `VoucherError.INVALID_PHONE` | When phone number format is invalid |
| `VoucherError.INVALID_VOUCHER` | When voucher code format is invalid |
## Issues

If you encounter any problems or have suggestions, please file an issue on the GitHub repository.