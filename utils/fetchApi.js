import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
	const { data } = await axios.get(url, {
		headers: {
			'X-RapidAPI-Key': '60c036148fmsh437fc00e714919fp17e902jsnc28949099964',
			'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
		},
	});

	return data;
};
