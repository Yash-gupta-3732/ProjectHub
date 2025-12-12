import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { writeClient } from "@/sanity/lib/write-client";

import type { User, Account, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

type GitHubProfile = {
  id: string | number;
  login: string;
  bio?: string | null;
};

type ExtendedToken = JWT & { id?: string };
type ExtendedSession = Session & { id?: string };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile?: unknown }) {
      if (!profile) return false;
      const { id, login, bio } = profile as GitHubProfile;
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: String(id) });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: String(id),
          name: user.name ?? "",
          username: login,
          email: user.email ?? "",
          bio: bio ?? "",
          image: user.image ?? "",
        });
      }
      return true;
    },

    async jwt({
      token,
      account,
      profile,
    }: {
      token: ExtendedToken;
      account?: Account | null;
      profile?: unknown;
    }) {
      if (account && profile) {
        const githubProfile = profile as GitHubProfile;
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: String(githubProfile.id) });
        token.id = user._id;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: ExtendedToken;
    }) {
      session.id = token.id;
      return session;
    },
  },
});