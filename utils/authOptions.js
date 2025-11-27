import GoogleProvidor from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
export const authOptions = {
  providers: [
    GoogleProvidor({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful signin
    async signIn({ profile }) {
      //1 connect to database
      await connectDB();
      //2. check if user exist
      const userExists = await User.findOne({ email: profile.email });

      //3. if not create user
      if (!userExists) {
        //turncate username if too long
        const username = profile.name.slice(0, 20);
    
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      //4. return true to allow signin
      return true;
    },
    //session call back function that modifies the session object
    async session({ session }) {
      //1.get user form db
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();

      //2.assign user id from db
      //3. return session
      return session;
    },
  },
};
