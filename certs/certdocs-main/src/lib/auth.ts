import { and, eq } from "drizzle-orm";
import { db } from "../db/index";
import {
  loginLogs,
  oauthProviders,
  passwords,
  sessions,
  users,
} from "../db/schema";
import Bowser from "bowser";
import bcrypt from "bcryptjs";
import redis from "./redis";
import { customAlphabet } from "nanoid";

type NewUserArgs = {
  email: string;
  userName: string;
  fullName: string;
  profilePhoto: string;
  emailVerified: boolean;
};

type UserExistArgs = {
  email: string;
  strategy: "google" | "github";
};

type NewSessionArgs = {
  userId: string;
};

type NewLogsArgs = {
  userAgent: string | null;
  userId: string;
  sessionId: string;
  ip: string;
  strategy: "github" | "google" | "credentials" | "magic_link";
};

type TokenArgs = {
  userId: string;
  strategy: "github" | "google";
  refreshToken: string;
  accessToken: string;
};

const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 14);

export const createUser = async ({
  email,
  fullName,
  profilePhoto,
  userName,
  emailVerified,
}: NewUserArgs) => {
  try {
    const newUser = await db
      .insert(users)
      .values({
        email,
        profilePhoto,
        fullName,
        emailVerified,
        userName,
      })
      .returning({ id: users.id });

    return { userId: newUser[0].id };
  } catch (error) {
    throw new Error("Error while creating user");
  }
};

export const checkUserExists = async ({ email }: UserExistArgs) => {
  const userExists = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
    },
    where: and(
      eq(users.email, email),
      eq(users.isBlocked, false),
      eq(users.isDeleted, false)
    ),
  });

  return userExists;
};

export const checkOauthUserExists = async ({
  email,
  providerId,
  strategy,
}: {
  email: string;
  providerId: string;
  strategy: "github" | "google";
}) => {
  const userExists = await db.query.users.findFirst({
    where: and(
      eq(users.email, email),
      eq(users.isBlocked, false),
      eq(users.isDeleted, false)
    ),
    columns: {
      id: true,
      email: true,
    },
    with: {
      oauthProviders: {
        where: and(
          eq(oauthProviders.providerUserId, String(providerId)),
          eq(oauthProviders.strategy, strategy)
        ),
      },
    },
  });

  const oauthProviderData = await db.query.oauthProviders.findFirst({
    where: and(
      eq(oauthProviders.providerUserId, String(providerId)),
      eq(oauthProviders.strategy, strategy)
    ),
    with: {
      user: {
        columns: {
          id: true,
          email: true,
        },
      },
    },
  });

  return { userExists, oauthProviderData };
};

export const createOauthProvider = async ({
  providerId,
  userId,
  email,
  strategy,
}: {
  providerId: string | number;
  userId: string;
  email: string;
  strategy: "github" | "google";
}) => {
  try {
    await db.insert(oauthProviders).values({
      providerUserId: String(providerId),
      userId,
      strategy,
      email,
    });
  } catch (error) {
    console.log("Error while creating oauth provider", error);
    throw new Error("Error while creating oauth provider");
  }
};

export const createSession = async ({ userId }: NewSessionArgs) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const newSession = await db
      .insert(sessions)
      .values({
        userId,
        expiresAt: expiresAt.getTime(),
      })
      .returning({ id: sessions.id });

    return { sessionId: newSession[0].id, expiresAt };
  } catch (error) {
    throw new Error("Failed to create session");
  }
};

export const createLoginLog = async ({
  userAgent,
  userId,
  sessionId,
  ip,
  strategy,
}: NewLogsArgs) => {
  if (!userAgent) {
    throw new Error("Internal Error");
  }
  const parser = Bowser.getParser(userAgent);

  try {
    await db.insert(loginLogs).values({
      userId,
      sessionId,
      ip,
      strategy,
      os: `${parser.getOSName()} ${parser.getOSVersion()}`,
      browser: `${parser.getBrowserName()} ${parser.getBrowserVersion()}`,
      device: parser.getPlatformType(),
    });
  } catch (error) {
    throw new Error("Failed to create logs");
  }
};
