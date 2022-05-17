import { v4 as uuid } from "uuid";

// pendent: PENDENT,
// approved:APPROVED,
// rejected: REJECTED,

export class Feedback {
  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.status = "PENDENT";
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }

  id: string;
  type: string;
  comment: string;
  screenshot?: string;
  responsible?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
