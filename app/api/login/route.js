// pages/api/login.js
import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Nutritionist from "@models/nutritionist";
import School from '@models/school';
const bcrypt = require('bcrypt');

const Role = {
    regular: 'regular',
    admin: 'admin'
};

export async function POST(req, res) {
    try {
        const { email, password, role } = await req.json();

        await connectToDatabase();
        let existingUser;
        if (role === Role.admin) {
            existingUser = await Nutritionist.findOne({ email });
        } else {
            existingUser = await School.findOne({ email });
        }

        if (!existingUser) {
            return NextResponse.json({ error: 'Usuário não encontrado', statusCode: 404 }, { status: 404 });
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
            return NextResponse.json({ error: 'Senha inválida', statusCode: 401 }, { status: 401 });
        }

        // if the credentials are valid, return the user
        return NextResponse.json(existingUser, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
