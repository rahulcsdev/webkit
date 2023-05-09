import { gql } from "@apollo/client";

export const addProject = gql`
  mutation ($data: ProjectCreateInput!) {
    createProject(data: $data) {
      id
    }
  }
`;

export const addMilestone = gql`
  mutation ($data: MilestoneCreateInput!) {
    createMilestone(data: $data) {
      id
    }
  }
`;

export const addTask = gql`
  mutation ($data: TaskCreateInput!) {
    createTask(data: $data) {
      id
    }
  }
`;
export const addTimesheet = gql`
  mutation ($data: TimeSheetCreateInput!) {
    createTimeSheet(data: $data) {
      id
    }
  }
`;

export const updateTimesheet = gql`
  mutation ($where: TimeSheetWhereUniqueInput!, $data: TimeSheetUpdateInput!) {
    updateTimeSheet(where: $where, data: $data) {
      id
    }
  }
`;

export const updateAllTimeEntry = gql`
  mutation ($data: [TimeEntryUpdateArgs!]!) {
    updateTimeEntries(data: $data) {
      id
      reviewStatus
      remarks
    }
  }
`;

export const updateProject = gql`
  mutation ($where: ProjectWhereUniqueInput!, $data: ProjectUpdateInput!) {
    updateProject(where: $where, data: $data) {
      id
      member {
        id
        name
      }
    }
  }
`;
export const updateTask = gql`
  mutation ($where: TaskWhereUniqueInput!, $data: TaskUpdateInput!) {
    updateTask(where: $where, data: $data) {
      id
    }
  }
`;
export const updateMilestone = gql`
  mutation ($where: MilestoneWhereUniqueInput!, $data: MilestoneUpdateInput!) {
    updateMilestone(where: $where, data: $data) {
      id
    }
  }
`;
export const updateTimeEntry = gql`
  mutation ($where: TimeEntryWhereUniqueInput!, $data: TimeEntryUpdateInput!) {
    updateTimeEntry(where: $where, data: $data) {
      id
    }
  }
`;
export const UserLogin = gql`
mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      sessionToken
      item {
        name
        id
      }
    }
    ... on UserAuthenticationWithPasswordFailure {
      message
    }
  }
}
`;

export const getProjectList = gql`
  query (
    $where: ProjectWhereInput
    $take: Int
    $skip: Int
    $orderBy: [ProjectOrderByInput!]
  ) {
    projects(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      status
      projectType
      code
      startDate
      endDate
      member {
        name
      }
      projectManager {
        id
        name
      }
    }
  }
`;

export const getUser = gql`
  query (
    $where: UserWhereInput
    $take: Int
    $skip: Int
    $orderBy: [UserOrderByInput!]
  ) {
    users(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
    }
  }
`;

export const getMilestone = gql`
  query (
    $where: MilestoneWhereInput
    $take: Int
    $skip: Int
    $orderBy: [MilestoneOrderByInput!]
  ) {
    milestones(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      project {
        name
      }
      status
      code
      startDate
      endDate
      name
    }
  }
`;

export const getTask = gql`
  query (
    $where: TaskWhereInput
    $take: Int
    $skip: Int
    $orderBy: [TaskOrderByInput!]
  ) {
    tasks(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      code
      discription
      project {
        id
        name
      }
      priority
      status
      milestone {
        id
        name
      }
      startDate
      endDate
      taskType
      estimateTime
    }
  }
`;

export const getProjectDetail = gql`
  query ($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      id
      name
      member {
        id
        name
      }
      projectManager {
        id
        name
      }
      projectType
      status
      startDate
      endDate
    }
  }
`;
export const getTaskDetails = gql`
  query ($where: TaskWhereUniqueInput!) {
    task(where: $where) {
      id
      code
      taskType
      estimateTime
      discription
      project {
        id
        name
      }
      code
      name
      priority
      status
      endDate
      startDate
      milestone {
        id
        name
      }
    }
  }
`;
export const getMilestoneDetails = gql`
  query ($where: MilestoneWhereUniqueInput!) {
    milestone(where: $where) {
      id
      project {
        name
        id
      }
      name
      startDate
      endDate
      status
    }
  }
`;
export const getspecficUser = gql`
query User($id: ID!) {
  user(where: { id: $id }) {
    id
    name
    email
    designation
    dateOfJoining
    reportingManager {
      id
      name
    }
  }
}
`;

export const getTimesheetDetails = gql`
  query ($where: TimeSheetWhereUniqueInput!) {
    timeSheet(where: $where) {
      timeEntry {
        id
        project {
          name
          id
        }
        task {
          name
          id
        }
        activities
        duration
        reviewStatus
        remarks
        reviewedAt
        reviewedBy {
          id
          name
        }
      }
    }
  }
`;

export const viewTimesheetDetails = gql`
  query (
    $where: TimeEntryWhereInput
    $take: Int
    $skip: Int
    $orderBy: [TimeEntryOrderByInput!]
  ) {
    timeEntries(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      project {
        name
      }
      task {
        id
        name
      }
      projectType
      reviewStatus
      projectManager
      activities

      duration
      remarks
      date
      userName {
        name
        id
        reportingManager {
          name
          id
        }
      }
    }
  }
`;

export const getTimeEntries = gql`
  query ($where: TimeEntryWhereUniqueInput!) {
    timeEntry(where: $where) {
      id
      project {
        id
        name
      }
      task {
        id
        name
      }
      projectType
      reviewStatus
      projectManager
      activities

      reviewedBy {
        name
        id
      }
      reviewedAt
      duration
      remarks
    }
  }
`;

export const finduserRole = gql`
  query ($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      role
    }
  }
`;

export const addUser = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateUser(where: $where, data: $data) {
      id
    }
  }
`;


export const getTasks = gql`
  query Query {
    tasks {
      name
      id
    }
  }
`;

 export const getProjects = gql`
  query Projects {
    projects {
      name
      id
    }
  }
`;

export const addTimesheets = gql`
  mutation Mutation($data: [TimeEnteryCreateInput!]!) {
    createTimeEnteries(data: $data) {
      activities
      project {
        id
        name
      }
      task {
        id
        name
      }
      duration
      date
    }
  }
`;