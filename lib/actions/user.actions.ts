'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    })

    return parseStringify(session)
  } catch (err) {
    console.error('ERROR', err)
  }
}

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return parseStringify(newUserAccount)
  } catch (err) {
    console.error('ERROR', err)
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    console.log(account)
    return await account.get();
  } catch (error: any) {
    console.error('error from here')
    console.error(error.message)
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient()

    cookies().delete('appwrite-session')

    await account.deleteSession('current')
  } catch {
    return null
  }
}