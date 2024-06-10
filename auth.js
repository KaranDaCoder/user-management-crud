import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDb } from './src/lib/dbConnect';
import User from './src/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDb();
      const currentSession = await User.findOne({
        email: session?.user?.email,
      });
      if (!currentSession) {
        return;
      }
      session.user._id = currentSession._id.toString();
      session.user.username = currentSession.username.toString();
      session.user.isAdmin = currentSession.isAdmin;
      return session;
    },
    async signIn({ profile }) {
      const { email, name, picture, given_name, family_name } = profile;
      const firstName = given_name.toLowerCase();
      const lastName = family_name.toLowerCase();
      const username = email.toLowerCase().split('@')[0];
      await connectDb();
      try {
        const UserExist = await User.findOne({ email: email });
        if (!UserExist) {
          const create_user = await User.create({
            username: username,
            firstName,
            lastName,
            email,
            name,
            picture,
          });

          await create_user.save();

          console.log(
            `User with email : ${email} is registered via google provider`
          );
          return true;
        } else {
          console.log(`User with email : ${email} is exists in db!`);
          return true;
        }
      } catch (error) {
        console.log(error);
        console.log(`Something went wrong!`);
      }
    },
  },
});
