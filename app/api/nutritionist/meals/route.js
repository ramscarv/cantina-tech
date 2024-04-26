import { connectToDatabase } from '@utils/database';
import { NextResponse } from 'next/server';
import NutriMeal from '@models/nutriMeal';

export async function GET() {
    try {
        await connectToDatabase();

        const meals = await NutriMeal.find();

        return NextResponse.json(meals, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}

export async function POST(req, _) {
    try {
        const { name, description, neededIngredients, madeUpFor } = await req.json();

        await connectToDatabase();

        const newMeal = new NutriMeal({
            name,
            description,
            neededIngredients: neededIngredients,
            madeUpFor,
        });

        await newMeal.save();

        return NextResponse.json({ message: 'Refeição registrada com sucesso' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}

export async function DELETE(req, _) {
    try {
        const { id } = await req.json();

        await connectToDatabase();

        await NutriMeal.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Refeição deletada com sucesso' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}