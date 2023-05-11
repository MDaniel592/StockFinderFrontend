import Box from "@mui/material/Box";
import * as locales from "@mui/material/locale";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from 'next/link';
import React, { useEffect, useRef } from "react";


export default function EnhancedTable({ data, headCells }) {
    const REFER = "";

    function EnhancedTableHead() {
        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <TableCell
                            className="table-text-xs text-neutral-300"
                            key={headCell.id}
                            align={headCell.numeric ? "left" : "left"}
                            padding={headCell.disablePadding ? "normal" : "normal"}
                        >
                            <p className="">{headCell.label}</p>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }


    const rows = Object.keys(data).map((key) => {
        return data[key];
    });


    const [locale, setLocale] = React.useState("esES");
    const theme = useTheme();
    const themeWithLocale = React.useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);


    const buttonRef = useRef(null); // useRef<HTMLButtonElement>(null)


    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            event.stopPropagation();
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [displayIMG, setDisplayIMG] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setDisplayIMG(event.target.src);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const onImageNotLoadedError = (event) => {
        const image = event.target;
        image.src = `/images/placeholder/no_photo.webp`;
        image.classList.add("bg-zinc-200", "p-2");
    };

    const open = Boolean(anchorEl);
    var total_original_price = 0
    var total_actual_price = 0
    return (
        <Box sx={{ width: "100%", backgroundColor: "transparent", boxShadow: "none" }}>
            <ThemeProvider theme={themeWithLocale}>
                <Paper sx={{ width: "100%", borderRadius: 3, backgroundColor: "transparent", boxShadow: "none" }}>
                    <TableContainer>
                        <Table
                            sx={{ borderRadius: 3, backgroundColor: "transparent", boxShadow: "none" }}
                            aria-labelledby="tableTitle"
                            size={true ? "small" : "medium"}
                        >
                            <EnhancedTableHead />
                            <TableBody sx={{ backgroundColor: "transparent", boxShadow: "none" }}>

                                {rows.map((row, index) => {
                                    total_original_price += row["original_price"]
                                    total_actual_price += row["actual_price"]
                                    const labelId = `enhanced-table-row-${index}`;
                                    const key = `row-data-table-${index}`;
                                    const product_url = "/producto/" + row["uuid"];
                                    const availability_url = row["url"].indexOf("pccomponentes.com") !== -1 ? REFER + row["url"] : row["url"];
                                    const imageUrl = row["image"] ? `https://images.stockfinder.tech${row["image"]}` : `/images/placeholder/${row["category"]}.webp`;
                                    let text_color = ""
                                    if (row["actual_price"] > row["original_price"]) {
                                        text_color = 'text-red-500'
                                    } else if (row["actual_price"] < row["original_price"]) {
                                        text_color = 'text-blue-500'
                                    } else {
                                        text_color = 'text-neutral-300'
                                    }

                                    return (

                                        <TableRow tabIndex={labelId} key={key} className="hover:bg-zinc-700">

                                            <TableCell
                                                className="table-text-xs  rounded-l-lg"
                                                component="th"
                                                id={`row-data-cell-${index}`}
                                                scope="row"
                                                padding="normal"
                                            >
                                                <div className="flex">
                                                    <img
                                                        aria-owns={open ? "mouse-over-popover" : undefined}
                                                        src={imageUrl}
                                                        className="h-12 w-12 rounded-md"
                                                        aria-haspopup="true"
                                                        onMouseEnter={handlePopoverOpen}
                                                        onMouseLeave={handlePopoverClose}
                                                        onError={onImageNotLoadedError}
                                                        loading="lazy"
                                                    />
                                                    <Popover
                                                        id="mouse-over-popover"
                                                        sx={{
                                                            pointerEvents: "none",
                                                        }}
                                                        open={open}
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{ vertical: "center", horizontal: "right" }}
                                                        transformOrigin={{ vertical: "center", horizontal: "left" }}
                                                        onClose={handlePopoverClose}
                                                        disableRestoreFocus
                                                    >
                                                        <img src={displayIMG} onError={onImageNotLoadedError} className="h-64 w-64 rounded-lg" />
                                                    </Popover>

                                                    <div className="flex items-center">
                                                        <a href={product_url} className="ml-5 hover:text-blue-500 hover:underline hover:decoration-blue-500">
                                                            {row.name}
                                                        </a>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="table-text-xs"
                                                component="th"
                                                id={`row-data-cell-original_price-${index}`}
                                                scope="row"
                                                padding="normal">
                                                {row.original_price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                                            </TableCell>
                                            <TableCell className={`${text_color} table-text-xs`}
                                                component="th"
                                                id={`row-data-cell-actual_price-${index}`}
                                                scope="row"
                                                padding="normal">
                                                {row.actual_price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                                            </TableCell>
                                            <TableCell
                                                className="rounded-r-lg"
                                                component="th"
                                                id={`row-data-cell-shop-${index}`}
                                                scope="row"
                                                padding="normal"
                                            >
                                                <Link href={availability_url} >
                                                    <img src={`/images/logos/shops/${row.shop}.png`} className='max-h-8 w-auto'></img>
                                                </Link>

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow tabIndex='enhanced-table-row-price' key='total_price' sx={{ 'borderBottom': 'hidden' }}>
                                    <TableCell></TableCell>
                                    <TableCell className="text-neutral-300 font-semibold">{total_original_price.toFixed(2) + " €"}</TableCell>
                                    <TableCell className={`${total_actual_price > total_original_price ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'}`}>{total_actual_price.toFixed(2) + " €"}</TableCell>
                                    <TableCell className={`${total_actual_price > total_original_price ? 'text-red-500 font-semibold' : 'text-blue-500 font-semibold'}`}>{total_actual_price > total_original_price ? '+' : ''}{(total_actual_price - total_original_price).toFixed(2)} €</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </ThemeProvider>
        </Box >
    );
}
