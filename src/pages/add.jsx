import { useForm } from "react-hook-form";
import { useGetProductADDMutation } from "../services/addApi";

const Add = () => {
  const { register, handleSubmit } = useForm();
  const [addProduct] = useGetProductADDMutation();

  const onSubmit = async (formData) => {
    try {
      await addProduct(formData).unwrap();
      alert("Product added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e8f8f5] px-4 py-16">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-7 shadow-xl shadow-slate-900/10">
        <p className="eyebrow">Electrohub marketplace</p>
        <h1 className="text-2xl font-black text-slate-950">List a new device</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Device name
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="e.g. Aurora X1 Smartphone"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Device description
            </label>
            <textarea
              {...register("description")}
              id="description"
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="Tell shoppers what makes it worth plugging in."
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Price in USD
            </label>
            <input
              {...register("price")}
              type="number"
              id="price"
              step="0.01"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="0.00"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Tech category
            </label>
            <input
              {...register("category")}
              type="text"
              id="category"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
              placeholder="e.g. smartphones"
            />
          </div>
          <button
            type="submit"
            className="primary-button w-full"
          >
            Publish device
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
