import { connectToDatabase } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Ingredient from "@models/ingredient";

export async function GET(req, _) {
    try {
        const id = req.nextUrl.searchParams.get('id');

        await connectToDatabase();

        const ingredients = await Ingredient.find({ school: id });

        return NextResponse.json(ingredients, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}