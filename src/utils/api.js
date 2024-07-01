export const ROOT_API_URL = 'https://norma.nomoreparties.space/api';

const checkSuccess = (data) => {
	if (data?.success)
		return data;
	else
		return Promise.reject(data);
}

const checkResponse = (response) => {
	return response.ok ? response.json() : response.json().then((err) => Promise.reject(err))
}

export const responseIngredients = async () => {
	const response = await fetch(ROOT_API_URL + '/ingredients');
	const data = await checkResponse(response);
	return (await checkSuccess(data)).data;
}

export const sendOrder = async (ingredientsId) => {
	const response = await fetch(ROOT_API_URL + "/orders", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			"ingredients": ingredientsId
		})
	});
	const returnData = await checkResponse(response);
	return await checkSuccess(returnData);
}