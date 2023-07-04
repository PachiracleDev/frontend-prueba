import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASEURL } from ".";

const getCategories = async () => {
	const { data } = await axios.get(`${BASEURL}/products/categories`);
	return data;
};

export const useGetCategories = () => {
	return useQuery({
		queryFn: getCategories,
		queryKey: ["categories"],
	});
};
