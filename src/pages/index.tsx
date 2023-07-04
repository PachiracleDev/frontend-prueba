import { Field, Formik, Form } from "formik";
import { useGetCategories } from "@/api/categories";
import { useCreateProduct, useGetProducts } from "@/api/products";
import Loading from "react-loading";

export default function Home() {
	const { data: categories } = useGetCategories();
	const { data: products } = useGetProducts();
	const { isLoading: loadingInsert, mutate } = useCreateProduct();

	return (
		<div className="mx-auto max-w-2xl">
			<Formik
				initialValues={{
					codigoProducto: "",
					nombreProducto: "",
					precioProducto: "",
					categoria: "",
				}}
				onSubmit={(values, { setSubmitting }) => {
					const product = {
						codigo: values.codigoProducto,
						nombre: values.nombreProducto,
						precio: +values.precioProducto,
						categoria: +values.categoria,
					};

					mutate(product);
				}}
			>
				{({ handleChange, setFieldValue }) => (
					<Form className="flex p-2 border my-12 mx-1 flex-col gap-4  items-center">
						<h4 className="text-2xl font-bold text-center text-gray-700">
							Mantenimiento de Productos
						</h4>
						<div className="flex flex-col gap-2 w-full">
							<label htmlFor="">Código</label>
							<Field
								type="text"
								className="border-2 w-full border-gray-300 rounded-md p-2"
								placeholder="Codigo Producto"
								name="codigoProducto"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label htmlFor="">Nombre</label>
							<Field
								type="text"
								className="border-2 w-full border-gray-300 rounded-md p-2"
								placeholder="Nombre del Producto"
								name="nombreProducto"
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<label htmlFor="">Precio</label>
							<Field
								type="number"
								className="border-2 w-full border-gray-300 rounded-md p-2"
								placeholder="Precio del Producto"
								name="precioProducto"
							/>
						</div>

						<select
							onChange={(e) => setFieldValue("categoria", e.target.value)}
							className="border-2 w-full border-gray-300 rounded-md p-2"
						>
							{categories &&
								categories.map((ca: any) => (
									<option key={ca.Id + ca.Nombre} value={ca.Id}>
										{ca.Nombre}
									</option>
								))}
						</select>
						<div className="flex gap-3 items-center">
							<button
								type="submit"
								className="bg-green-500 flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
							>
								{loadingInsert ? (
									<Loading color="#fff" height={20} width={20} />
								) : (
									"AGREGAR"
								)}
							</button>
						</div>
					</Form>
				)}
			</Formik>

			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th>Codigo</th>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Categoria</th>
						</tr>
					</thead>
					<tbody>
						{products && products.length > 0 ? (
							products.map((item: any) => (
								<tr key={item.Id}>
									<td>{item.Codigo}</td>
									<td>{item.Nombre}</td>
									<td>{item.Precio}</td>
									<td>{item.Categoria.Nombre}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="text-center text-gray-500 py-4">
									No hay productos
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
