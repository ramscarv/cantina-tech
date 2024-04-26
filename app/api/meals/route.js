import { connectToDatabase } from "@utils/database";
import { NextResponse } from "next/server";
import Meal from "@models/meal";
import Ingredient from "@models/ingredient";
import School from '@models/school';

export async function GET(req, _) {
    try {
        await connectToDatabase();
        const meals = await Meal.find();
        
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

export async function POST(req, _) {
    try {
        const { name, description, ingredients, madeUpFor, schoolId } = await req.json();

        await connectToDatabase();
        const schoolToUpdate = await School.findById(schoolId);

        // Extract ingredient names
        const ingredientNames = ingredients.map(ingredient => ingredient[0]);

        // Find the ingredients by name and school ID
        const ingredientsIdArray = await Ingredient.find({ name: { $in: ingredientNames }, school: schoolToUpdate._id });

        // Update the quantity of the ingredients in stock
        for (let i = 0; i < ingredientsIdArray.length; i++) {
            const ingredient = ingredientsIdArray[i];
            const quantity = ingredients[i][1];

            // Check if the stock is sufficient before subtracting the quantity
            if (ingredient.stock < quantity) {
                return NextResponse.error({ error: 'Ingrediente sem estoque' }, { status: 400 });
            }

            ingredient.stock -= quantity;
            await ingredient.save();
        }

        // Create a new meal with the IDs of the ingredients
        const newMeal = new Meal({
            name,
            description,
            ingredients: ingredientsIdArray.map(ingredient => ingredient._id),
            madeUpFor,
            school: schoolToUpdate._id
        });

        await newMeal.save();

        console.log('Refeição registrada com sucesso');
        return NextResponse.json({ message: 'Refeição registrada com sucesso' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.error({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}