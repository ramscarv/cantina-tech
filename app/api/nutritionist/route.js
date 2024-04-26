import { connectToDatabase } from '@utils/database';
import Nutritionist from '@models/nutritionist';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDatabase();

        const nutritionists = await Nutritionist.find();

        return NextResponse.json(nutritionists, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}