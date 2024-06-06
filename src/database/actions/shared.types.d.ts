import { Schema } from 'mongoose';

import { IUser } from '@/database/models/user.model';

/**
 * Common interfaces used in actions
 */
interface ClerkId {
  clerkId: string;
}

interface UserId {
  userId: string;
}

interface OptionalPage {
  page?: number;
}

interface OptionalPageSize {
  pageSize?: number;
}

interface OptionalSearch {
  searchQuery?: string;
}

interface OptionalFilter {
  filter?: string;
}

interface Path {
  path: string;
}

interface Content {
  content: string;
}

interface Searchable
  extends OptionalPage,
    OptionalPageSize,
    OptionalSearch,
    OptionalFilter {}

/**
 * Interfaces for user actions
 */
export interface CreateUserParams extends ClerkId {
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface GetUserByIdParams extends UserId {}

export interface GetUserByClerkIdParams extends ClerkId {}

export interface GetAllUsersParams extends Searchable {}

export interface UpdateUserParams extends ClerkId, Path {
  updateData: Partial<IUser>;
}

export interface DeleteUserParams extends ClerkId {}
