export interface Email {
    Type?: string;
    From?: string;
    Email: string;
    Subject: string;
    Message: string;
    Link?: string;
    LinkLabel?: string;
    UserFullName?: string;
    Name?: string;
    Amount?: number;
    AmountPaid?: number;
    AmountDue?: number;
    NextBillingDate?: string;
  }