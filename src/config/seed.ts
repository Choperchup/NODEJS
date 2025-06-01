import { hashPassWord } from "services/user.service";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "config/constant";

const initDataBase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();

    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền "
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }
    if (countUser === 0) {
        const defaultPassWord = await hashPassWord("123456")
        const adminRole = await prisma.role.findFirst({
            where: {
                name: "ADMIN"
            }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [
                    {
                        fullName: "Truong",
                        username: "lnntruong200@gmail.com",
                        password: defaultPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    },
                    {
                        fullName: "ADMIN",
                        username: "admin@gmail.com",
                        password: defaultPassWord,
                        accountType: ACCOUNT_TYPE.SYSTEM,
                        roleId: adminRole.id
                    }
                ]
            })
    }
    if (countRole !== 0 && countUser !== 0) {
        console.log(">>> ALREADY INIT DATA...");
    }

}

export default initDataBase;