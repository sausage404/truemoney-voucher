interface VoucherResult {
    amount: number;
    name: string;
    code: string;
}

interface ApiResponse {
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

export default async (phone: string = "", voucherCode: string = ""): Promise<VoucherResult> => {
    phone = phone.trim();
    if (!phone.length || /\D/.test(phone)) {
        throw new Error(VoucherError.INVALID_PHONE);
    }

    const parts = voucherCode.split("v=");
    const extractedCode = (parts[1] || parts[0]).match(/[0-9A-Za-z]+/)?.[0];
    if (!extractedCode || extractedCode.length !== 35) {
        throw new Error(VoucherError.INVALID_VOUCHER);
    }

    const response: ApiResponse = await fetch(`https://gift.truemoney.com/campaign/vouchers/${extractedCode}/redeem`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mobile: phone, voucher_hash: extractedCode })
    }).then(res => res.json());

    if (response.status.code === "SUCCESS" && response.data) {
        return {
            amount: Number(response.data.my_ticket.amount_baht.replace(/,/g, '')),
            name: response.data.owner_profile.full_name,
            code: extractedCode
        };
    }

    throw new Error(response.status.code);
};