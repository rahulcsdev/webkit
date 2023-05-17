import { config } from "@keystone-6/core";
import { withAuth, session } from "./auth";
import User from "./Schemas/User";
import Project from "./Schemas/Project";
import Milestone from "./Schemas/Milestone";
import Task from "./Schemas/Task";
import TimeEntery from "./Schemas/TimeEntery";
import File from "./Schemas/File";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { superAdminData } from "./seed";
import type { Context } from ".keystone/types";

export default config(
  withAuth({
    server: {
      cors: { origin: ["http://localhost:4000"], credentials: true },
    },
    //connect to the postgress database
    db: {
      provider: "postgresql",
      url: process.env.PostgressUrl || "",
      onConnect: async (context: Context) => {
        await superAdminData(context);
      },
    },

    lists: {
      User,// Register the User list
      Project,// Register the Project list
      Milestone,// Register the Milestone list
      Task,// Register the Task list
      TimeEntery,// Register the TimeEntry list
      File,// Register the File list
    },
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images",
        },
        storagePath: "public/images",
      },
      my_local_file: {
        kind: "local",
        type: "file",
        generateUrl: (path) => `http://localhost:3000/file${path}`,
        serverRoute: {
          path: "/file",
        },
        storagePath: "public/file",
      },
    },
    session,// Use the session configuration from the "auth" module
    ui: {
      isAccessAllowed: (context: any) => !!context.session?.data,
    },
  })
);
