/**
 * @fileoverview
 * Type definitions for @mbext/command-handler
 * See https://github.com/iduckphone/mbext-command-handler for more details.
 *
 * @license GNU General Public License v3
 *
 * @author [sausage404] <parinya24dev@gmail.com>
 *
 * This file contains type definitions for the @mbext/command-handler JavaScript library.
 * It provides TypeScript types for the library's public API.
 * 
 * To use these types, include this file in your TypeScript project and ensure
 * your TypeScript compiler is configured to recognize `.d.ts` files.
 */

export interface VoucherResult {
    amount: number;
    name: string;
    code: string;
}

export interface ApiResponse {
    status: {
        code: string;
    };
    data?: {
        my_ticket: {
            amount_baht: string;
        };
        owner_profile: {
            full_name: string;
        };
    };
}

export enum VoucherError {
    INVALID_PHONE = "INVALID_PHONE",
    INVALID_VOUCHER = "INVALID_VOUCHER"
}