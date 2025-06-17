import { CONNREFUSED } from "dns";
import { Request, Response, NextFunction } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegisterChema } from "src/validation/register.schema";

const getLoginPage = async (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session?.messages ?? [];
    return res.render("client/auth/login.ejs", {
        messages: messages
    })
}

const getRegisterPage = async (req: Request, res: Response) => {
    const oldData = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const errors = [];
    return res.render("client/auth/register.ejs", {
        oldData, errors
    })
}

const postRegister = async (req: Request, res: Response) => {
    const { fullName, email, password, confirmPassword } = req.body as TRegisterChema;

    const validate = await RegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        // error
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.message} (${item.path[0]})`);

        const oldData = {
            fullName, email, password, confirmPassword
        }

        return res.render("client/auth/register.ejs", {
            errors: errors,
            oldData: oldData
        });
    }

    // success
    await registerNewUser(fullName, email, password);

    return res.redirect("/login")

}


const getSuccessRedirectPage = async (req: Request, res: Response) => {
    const user = req.user as any;

    if (user?.role?.name === "ADMIN") {
        res.redirect("/admin")
    } else {
        res.redirect("/")
    }
}

const postLogout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

export { getLoginPage, getRegisterPage, postRegister, getSuccessRedirectPage, postLogout }