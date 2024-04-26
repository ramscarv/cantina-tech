import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Nutritionist from "@models/nutritionist";
import School from '@models/school';
const bcrypt = require('bcrypt');

const Role = {
    regular: 'regular',
    admin: 'admin'
};

export async function POST(req, _) {
    try {
        const userData = await req.json();

        await connectToDatabase();

        if (userData.role === Role.admin) {
            const { name, email, password, cpf } = userData;
            const existingNutritionist = await Nutritionist.findOne({ email });

            if (existingNutritionist) {
                return NextResponse.json({ error: 'Admin já cadastrado', statusCode: 409 }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newNutritionist = new Nutritionist({
                name,
                email,
                password: hashedPassword,
                cpf,
                role: Role.admin,
            });

            await newNutritionist.save();
            
        } else {
            const { name, email, password, cnpj } = userData;

            const existingSchool = await School.findOne({ email });

            if (existingSchool) {
                return NextResponse.json({ error: 'Escola já cadastrada', statusCode: 409 }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newSchool = new School({
                name,
                email,
                password: hashedPassword,
                cnpj,
                role: Role.regular,
            });

            await newSchool.save();
        }

        console.log('Usuário registrado com sucesso');
        return NextResponse.json({ message: 'Usuário registrado com sucesso' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
