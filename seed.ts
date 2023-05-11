import type { Context } from '.keystone/types';
import dotenv from "dotenv"
import { role } from './utils/data';
dotenv.config({path:"./.env"});
export async function superAdminData(context: Context) {
  if ((await context.db.User.count()) > 0) return;

  for (const user of [
    {
        name: process.env.name,
        email: process.env.email,
        password:process.env.password,
        code:process.env.code,
        role:["admin"]
    }
  ] as const) {
    await context.db.User.createOne({ data: user });
  }
}