import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Meal from "@models/meal";
import Ingredient from "@models/ingredient";

export async function GET(req, _) {
    try {
        const id = req.nextUrl.searchParams.get('id');
        await connectToDatabase();

        // get all meals that match the School ID
        const meals = await Meal.find({ school: id });

        // update the ingredients array of Meal with the intire Ingredient object
        for (const meal of meals) {
            const ingredients = [];
            for (const ingredientId of meal.ingredients) {
                const ingredient = await Ingredient.findById(ingredientId);
                ingredients.push(ingredient);
            }
            meal.ingredients = ingredients;
        }

        return NextResponse.json(meals, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}