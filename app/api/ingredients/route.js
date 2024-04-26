import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Ingredient from "@models/ingredient";
import School from '@models/school';

export async function GET() {
    try {
        await connectToDatabase();

        const ingredients = await Ingredient.find();

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}

export async function POST(req, _) {
    try {
        // must be always an array of ingredients to avoid too many requests
        const arrayOfIngredients = await req.json();
        await connectToDatabase();

        for (const ingredient of arrayOfIngredients) {
            const { name, quantity, stock, quality, validity, schoolId } = ingredient;
            const schoolObj = await School.findById(schoolId);
            console.log(schoolObj._id.toString());

            const newIngredient = new Ingredient({
                name,
                quantity,
                stock,
                quality,
                validity,
                school: schoolObj._id
            });
            await newIngredient.save();
        }

        console.log('Ingrediente registrado com sucesso');
        return NextResponse.json({ message: 'Ingrediente registrado com sucesso' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
