'use serve';

import prisma from "@/lib/prisma";
import bycrypt from 'bcryptjs';

export const RegisterAccountAcction = async (name: string, password: string, email: string) => {
    try {
        const createNewAccount = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bycrypt.hashSync(password)
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return {
            ok: true,
            user: createNewAccount,
            message: 'Usuario creado! '
        }

    } catch(error) {
        console.log("🚀 ~ RegisterAccountAcction ~ error:", error)
        
        return {
            ok: false,
            message: "Ocurrio un error! 💀 "
        }
    }
}