import usecart from "../../hooks/usecart";

export default function Cart() {

  const { data, isLoading, isError, error } = usecart();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <h2>Cart</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}