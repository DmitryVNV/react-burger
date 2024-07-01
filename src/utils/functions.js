import { selectedIngredientIds, selectedBunId } from './properties';

export const constructorDataPrepare = (data) => {
	const bunItem = data.find(ingredient => ingredient._id === selectedBunId);
	const ingredientItems = data.filter(ingredient => selectedIngredientIds.includes(ingredient._id))
	return {
		bun: bunItem,
		ingredients: ingredientItems
	};
}