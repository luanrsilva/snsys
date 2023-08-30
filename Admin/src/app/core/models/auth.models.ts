export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email: string;
}

export class SimpleUser {
  email: string;
  name: string;
  password: string;
}

export class Company {
  businessName: string;
  email: string;
  socialName: string;
  documentCnpj: string;
  cellNumber: string;
  phone: string;
}

export class Subscription {
  name: string;
  subscriptionPlanId: number;
  subscriptionPlanPeriodId: number;
}


