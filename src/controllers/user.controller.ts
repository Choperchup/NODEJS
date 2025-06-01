import { Request, Response } from "express";
import { getAllRoles, getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.service";
import { name } from "ejs";

const getHomePage = async (req: Request, res: Response) => {

    return res.render("client/home/show.ejs")
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    return res.render("admin/user/create.ejs", {
        roles: roles
    })
}

const postCreateUser = async (req: Request, res: Response) => {

    // Object detructuring
    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    // // handle create user

    await handleCreateUser(fullName, username, address, phone, avatar, role);

    return res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const a = await handleDeleteUser(id);
    return res.redirect("/admin/user")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Get user by ID
    const user = await getUserById(id);
    const roles = await getAllRoles()
    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles
    });
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(id, fullName, phone, role, address, avatar);

    return res.redirect("/admin/user");
}
postUpdateUser

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser, updateUserById };