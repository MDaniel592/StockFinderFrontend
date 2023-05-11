import TextField from "@mui/material/TextField";

export default function Search({ name, handleSearch, onProductRemoved }) {

  return (
    <>
      <TextField
        fullWidth
        sx={{
          alignItems: "bottom",
          backgroundColor: "white",
          borderRadius: 2,
        }}
        color="success"
        variant="filled"
        label={name}
        placeholder=""
        onChange={handleSearch}
        size="small"
      />
    </>
  );
}
