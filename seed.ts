import type { Context } from '.keystone/types';
import dotenv from "dotenv"
dotenv.config({path:"./.env"});
export async function superAdminData(context: Context) {
  if ((await context.db.User.count()) > 0) return;

  for (const user of [
    {
        name: process.env.name,
        email: process.env.email,
        password:process.env.password,
        role: process.env.role,
        code:process.env.code
    }
  ] as const) {
    await context.db.User.createOne({ data: user });
  }
}