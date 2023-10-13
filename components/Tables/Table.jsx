import Box from '@mui/material/Box'
import * as locales from '@mui/material/locale'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Image from 'next/image'

function descendingComparator(a, b, orderBy) {
  if (
    (typeof b[orderBy] === 'string' || b[orderBy] instanceof String) &&
    orderBy != 'Almacenamiento' &&
    orderBy != 'Tamaño Memoria' &&
    orderBy != 'Potencia' &&
    orderBy != 'Cantidad Memoria' &&
    orderBy != 'Altura máxima CPU' &&
    orderBy != 'Longitud máxima GPU' &&
    orderBy != 'Altura (ventilador incluido)'
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  } else {
    let valueA = a[orderBy]
    let valueB = b[orderBy]

    if (
      orderBy === 'Tamaño Memoria' ||
      orderBy === 'Almacenamiento' ||
      orderBy === 'Cantidad Memoria'
    ) {
      if (valueA.indexOf('GB') != -1) {
        valueA = valueA.replace(' GB', '')
      } else {
        valueA = valueA.replace(' TB', '')
        valueA = parseFloat(valueA) * 1000
      }

      if (valueB.indexOf(' GB') != -1) {
        valueB = valueB.replace(' GB', '')
      } else {
        valueB = valueB.replace(' TB', '')
        valueB = parseFloat(valueB) * 1000
      }
    } else if (orderBy === 'Potencia') {
      valueA = valueA.replace('W', '')
      valueB = valueB.replace('W', '')
    }

    if (parseFloat(valueB) < parseFloat(valueA)) {
      return -1
    }
    if (parseFloat(valueB) > parseFloat(valueA)) {
      return 1
    }
    return 0
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

export default function EnhancedTable({
  data,
  headCells,
  failOverImage = '',
  categoryBuild = ''
}) {
  const customBorder = {
    borderBottom: 1,
    borderBottomWidth: '1px',
    borderColor: '#AFAFAF'
  }
  const router = useRouter()

  function EnhancedTableHead(props) {
    const { order, orderBy, rowCount, onRequestSort } = props
    const createSortHandler = property => event => {
      onRequestSort(event, property)
    }

    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              className="table-text-xs"
              key={headCell.id}
              align={headCell.numeric ? 'left' : 'left'}
              padding={headCell.disablePadding ? 'normal' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    color: 'white !important'
                  }
                }}
              >
                <p className="text-white hover:text-blue-500">
                  {headCell.label}
                </p>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
    )
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  }
  /////////////////
  /////////////////
  /////////////////
  /////////////////

  const rows = Object.keys(data).map(key => {
    return data[key]
  })

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)

  const [locale, setLocale] = React.useState('esES')
  const theme = useTheme()
  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  )

  useEffect(() => {
    if (rows.length < rowsPerPage * page && page > 0) {
      setPage(0)
    }
  }, [data])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function getRemainingCells(row, labelId) {
    var Obj
    var index = 1
    for (var item in headCells) {
      let item_key = headCells[item]['id']
      if (item_key === 'name' || item_key === 'stock') continue

      let item_data = row[item_key]
      if (item_key === 'price')
        item_data = item_data.toLocaleString('es-ES', {
          style: 'currency',
          currency: 'EUR'
        })

      let string_value = item_data
      if (
        (item_key === 'Conexiones' || item_key === 'Soporte Procesador') &&
        item_data.length > 1
      ) {
        string_value = ''
        if (typeof item_data === 'object') {
          for (index in item_data) string_value += item_data.at(index) + ', '
        }
        string_value = string_value.slice(0, -2)
      }

      let labelItem = labelId + `-item-${index}`
      let color = row['stock'] === true ? 'bg-green-500' : 'bg-red-500'
      let colum_data
      if (item_key === 'price') {
        colum_data = (
          <TableCell
            sx={customBorder}
            key={labelItem}
            align="left"
            padding="normal"
            component="th"
            scope="row"
          >
            <div className="flex flex-nowrap gap-2">
              <p className="table-text-xxs">{string_value}</p>
              {item_key === 'price' && (
                <div className={`h-2 w-2 rounded-lg ${color} my-auto`}></div>
              )}
            </div>
          </TableCell>
        )
      } else {
        colum_data = (
          <TableCell
            sx={customBorder}
            key={labelItem}
            align="left"
            padding="normal"
            component="th"
            scope="row"
          >
            <p className="table-text-xxs">{string_value}</p>
          </TableCell>
        )
      }

      index += 1
      Obj = [Obj, colum_data]
    }

    return Obj
  }

  function getBuildCell(row) {
    if (categoryBuild == '' || categoryBuild == null)
      return <TableCell sx={customBorder}></TableCell>
    return (
      <TableCell sx={customBorder} className="text-center">
        <a
          type="button"
          className="btn-small cursor-pointer text-xxs"
          onClick={e => onButtonPressed(e, { ...row, category: categoryBuild })}
        >
          Añadir
        </a>
      </TableCell>
    )
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [displayIMG, setDisplayIMG] = React.useState(null)

  const handlePopoverOpen = event => {
    setDisplayIMG(event.target.src)
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const onImageNotLoadedError = event => {
    const image = event.target
    image.src = `/images/placeholder/${failOverImage}.webp`
    image.classList.add('bg-zinc-200', 'p-2')
  }

  const open = Boolean(anchorEl)

  const SELECTED_SOCKET_KEY = 'selectedSocket'
  const BUILD_IN_PROGRES_KEY = 'addProductToBuild'

  function addProduct2Build(productToBeAdded) {
    if (!productToBeAdded.category || productToBeAdded.category === '')
      return false
    if (productToBeAdded['Tipo Socket']) {
      let socket = productToBeAdded['Tipo Socket']
        .replace('Intel', 'Socket')
        .replace('AMD', 'Socket')
      localStorage.setItem(SELECTED_SOCKET_KEY, socket)
    }

    const products = JSON.parse(
      localStorage.getItem(BUILD_IN_PROGRES_KEY) || '{}'
    )

    const newProducts = {
      ...products,
      [productToBeAdded.category]: {
        uuid: productToBeAdded.uuid,
        price: productToBeAdded.price
      }
    }
    localStorage.setItem(BUILD_IN_PROGRES_KEY, JSON.stringify(newProducts))
    return true
  }

  async function onButtonPressed(e, productToBeAdded) {
    e.preventDefault()

    const alert = withReactContent(
      Swal.mixin({
        customClass: {
          confirmButton: 'btn primary mx-1',
          cancelButton: 'btn primary mx-1'
        },
        buttonsStyling: false
      })
    )
    alert
      .fire({
        title: <p>¿Qué desea hacer?</p>,
        icon: 'question',
        // text: "Puedes añadir el producto a una configuración o crear una alerta personalizada",
        text: 'Puedes añadir el producto a una configuración',
        showCancelButton: true,
        confirmButtonText: 'Añadir al configurador',
        // cancelButtonText: 'Crear nueva alerta',
        cancelButtonText: 'Cancelar'
      })
      .then(result => {
        if (result.isConfirmed) {
          console.log('Añadido al configurador')
          let result = addProduct2Build(productToBeAdded)
          if (result) router.push('/builder')
        } else if (result.isDismissed && result.dismiss == 'cancel') {
          console.log('Cancel')
        }
      })
  }

  return (
    <Box
      sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}
    >
      <ThemeProvider theme={themeWithLocale}>
        <Paper
          sx={{
            width: '100%',
            mb: 2,
            borderRadius: 3,
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }}
        >
          <TableContainer>
            <Table
              sx={{
                borderRadius: 3,
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody
                sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
              >
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {/* {stableSort(rows, getComparator(order, orderBy)) */}

                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-row-${index}`
                    const key = `row-data-table-${index}`
                    const url = '/producto/' + row['uuid']
                    // Si hay más de una imagen para el producto, seleccionamos la primera. Si ponemos simplemente el atributo "images",
                    // corremos el riesgo de que la función onError no se llame porque el img.src es un array
                    const imageUrl =
                      row['images'].length > 0
                        ? `https://images.stockfinder.tech${row['images']}`
                        : `/images/placeholder/${failOverImage}.webp`
                    return (
                      <TableRow hover tabIndex={labelId} key={key}>
                        <TableCell
                          sx={customBorder}
                          component="th"
                          id={`row-data-cell-${index}`}
                          scope="row"
                          padding="normal"
                        >
                          <div className="flex">
                            <Image
                              aria-owns={
                                open ? 'mouse-over-popover' : undefined
                              }
                              src={imageUrl}
                              width={300}
                              height={300}
                              style={{ width: 'auto', height: 'auto' }}
                              alt={row['uuid']}
                              className="h-8 w-8 rounded-md"
                              aria-haspopup="true"
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose}
                              onError={onImageNotLoadedError}
                            />
                            <Popover
                              id="mouse-over-popover"
                              sx={{
                                pointerEvents: 'none',
                                margin: 1,
                                bgcolor: 'transparent'
                              }}
                              open={open}
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right'
                              }}
                              transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left'
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                              elevation={0}
                            >
                              <Image
                                width={300}
                                height={300}
                                style={{ width: 'auto', height: 'auto' }}
                                alt={row['uuid']}
                                src={displayIMG}
                                onError={onImageNotLoadedError}
                                className="max-h-44	max-w-xs rounded-xl"
                              />
                            </Popover>

                            <div className="flex items-center">
                              <Link
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-5 hover:text-blue-300 hover:underline hover:decoration-blue-300 table-text-xs"
                              >
                                {row.name}
                              </Link>
                            </div>
                          </div>
                        </TableCell>

                        {getRemainingCells(row, labelId)}

                        {getBuildCell(row)}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            className="table-pagination"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page > 0 && rows.length < rowsPerPage * page ? 0 : page}
            // page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
    </Box>
  )
}
