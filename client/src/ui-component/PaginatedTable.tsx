import * as React from 'react'
import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination
} from '@mui/material'

interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'right'
    format?: (value: any) => any
}

interface Props<T> {
    columns: Column[]
    rows: T[]
}

const PaginatedTable = <T, >({columns, rows}: Props<T>) => {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    return (
        <>
            <TableContainer sx={{maxHeight: 500}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rows.length === 0 &&
                                <TableRow>
                                    <TableCell align={"center"} colSpan={columns.length}>
                                        No data
                                    </TableCell>
                                </TableRow>)
                            || rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: T, index: number) =>
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value: any = row[column.id as keyof typeof row]
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event: any, page: number) => {
                    setPage(page)
                }}
                onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setRowsPerPage(+event.target.value)
                    setPage(0)
                }}
            />
        </>
    )
}

export default PaginatedTable