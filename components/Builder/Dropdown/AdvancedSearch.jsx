
export default function AdvancedSearch({
  name,
  handleSearch,
  onProductRemoved,
  toggleListContainer,
  openListContainer,
  isOpen,
  productUUID,
}) {
  return (
    <>
      <input
        className="w-full rounded-lg px-2 bg-white text-black font-sans font-semibold text-sm h-8"
        label={"Buscador"}
        value={name}
        placeholder=""
        onClick={openListContainer}
        onChange={handleSearch}
      />
      {isOpen && productUUID === "" && (
        <button
          className="text-sm font-sansantialiased btn secondary-small"
          onClick={toggleListContainer}
        >
          Cerrar
        </button>
      )}

      {productUUID !== "" && (
        <button
          className="text-sm font-sansantialiased btn error-small w-1/3 sm:w-fit mx-auto"
          onClick={(e) => onProductRemoved(e)}
        >
          Eliminar
        </button>
      )}
    </>
  );
}
