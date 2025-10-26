export default interface Transaction {
    amount: number;
    business_type: string;
    datetime: string;
    destination_account: string;
    id: number;
    origin_account: number | null;
}