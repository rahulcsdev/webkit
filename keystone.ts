import { config } from '@keystone-6/core';
import { withAuth, session } from './auth';
import User from './Schemas/User'
import Project from './Schemas/Project';
import Milestone from './Schemas/Milestone';
import Task from './Schemas/Task';
import TimeEntery from './Schemas/TimeEntery';
import dotenv from "dotenv"
dotenv.config({path:"./.env"});

export default config(
    withAuth( {
      server: {
        cors: { origin: ['http://localhost:4000'], credentials: true }
      },
      db: {
          provider: 'postgresql',
          url: process.env.PostgressUrl||"",
      },
      lists: {
        User,
        Project,
        Milestone,
        Task,
        TimeEntery,
      },
      session,
      ui: {
        isAccessAllowed: (context:any) => !!context.session?.data,
      },
    })
  );
