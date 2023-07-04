import axios from "axios";
import { BASEURL } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
type CreateProductDto = {
	codigo: string;
	nombre: string;
	precio: number;
	categoria: number;
};

const createProduct = async (product: CreateProductDto) => {
	const { data } = await axios.post(`${BASEURL}/products`, product);
	return data;
};

const getProducts = async () => {
	const { data } = await axios.get(`${BASEURL}/products`);
	return data;
};

export const useCreateProduct = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: (variables: CreateProductDto) => createProduct(variables),
		mutationKey: ["createProduct"],
		onError(error: any) {
			toast.error(
				error.message.includes("400")
					? "El producto ya existe"
					: "Error al crear el producto"
			);
		},
		onSuccess: () => {
			client.invalidateQueries(["products"]);
			toast.success("Producto creado correctamente");
		},
	});
};

export const useGetProducts = () => {
	return useQuery({
		queryFn: getProducts,
		queryKey: ["products"],
	});
};
