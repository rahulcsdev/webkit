import type { Context } from '.keystone/types';
import dotenv from "dotenv"
import { role } from './utils/data';

// Load environment variables from .env file
dotenv.config({path:"./.env"});

// Function to create super admin data
export async function superAdminData(context: Context) {

  // Check if there are existing users in the database
  const UserData= await context.db.User.findMany({});
  if ((await context.db.User.count()) > 0) return;// If there are existing users, return early and do not proceed with creating the super admin data
  // Create a single user with super admin privileges
  for (const user of [
    {
        name: process.env.name,
        email: process.env.email,
        password:process.env.password,
        code:process.env.code,
        role:["admin","userManagement","projectManagement","taskManagement","milestoneManagement","timeEntryManagement"]
    }
  ] as const) {
    await context.db.User.createOne({ data: user }); // Add the user to the database
  }
}