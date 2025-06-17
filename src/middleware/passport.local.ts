import { prisma } from "config/client";
import { name } from "ejs";
import passport, { use } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/client/auth.service";
import { comparePassword, getUserById } from "services/user.service";

const configPassprotLocal = () => {
    passport.use(new LocalStrategy({
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {

        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }

        console.log(">>> check username/password", username, password);
        // Check user exist in database
        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            // throw error
            // throw new Error(`Username: ${username} not found`);
            return callback(null, false, { message: `Username/password invalid` });
        }

        // compare password
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            // throw new Error(`Invalid password`);
            return callback(null, false, { message: `Username/password invalid` });
        }

        return callback(null, user as any);

    }));

    passport.serializeUser(function (user: any, callback) {
        return callback(null, {
            id: user.id,
            username: user.username,
        });
    });

    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user;
        // query top database
        const userInDB: any = await getUserWithRoleById(id);
        const sumCart = await getUserSumCart(id);

        return callback(null, { ...userInDB, sumCart: sumCart });
    });
}

export default configPassprotLocal;