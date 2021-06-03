import express from "express";

export interface UserPayload {
  id: string;
  email: string;
  phone?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordChanged?: boolean;
  passwordChangeToken?: string;
  is_active?: boolean;
  activationCode?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
