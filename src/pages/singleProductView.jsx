import { Link, useNavigate, useParams } from "react-router";
import { useGetProductQuery } from "../services/productApi";
import { useDeleteProductMutation } from "../services/deleteApi";

const SingleProductView = () => {
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
      navigate("/");
    } catch {
      alert("This product could not be deleted right now.");
    }
  };

  if (!product) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <nav className="mb-8 text-sm font-semibold text-slate-500">
        <Link to="/" className="hover:text-cyan-600">
          Electrohub
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="flex flex-col gap-10 md:flex-row">
        <div className="overflow-hidden rounded-2xl bg-white p-5 md:w-1/2">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="h-105 w-full rounded-xl object-cover mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col justify-center md:w-1/2">
          <p className="eyebrow">{product.category?.replaceAll("-", " ")}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-amber-500">★ {product.rating} rating</span>
          </div>

          <p className="mt-5 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <p className="mt-7 text-3xl font-black text-slate-950">
            ${product.price}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="primary-button flex-1">
              Buy Now
            </button>
            <button className="secondary-button flex-1">
              Add to Cart
            </button>
            <button
              className="rounded-full bg-rose-100 px-6 py-3 font-bold text-rose-700 transition hover:bg-rose-200"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
