/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { lighten } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useMemo, useState } from 'react'
import { Tour } from 'src/types/tour.type'
import http from 'src/utils/http'
import TourForm from '../components/TourForm'

export default function TourManagement() {
  const [createMode, setCreateMode] = useState<boolean>(false)
  const { data: guideToursData, isLoading } = useQuery({
    queryKey: ['guideTours'],
    queryFn: () => http.get<any>('https://mocki.io/v1/0559052a-e5a4-41e4-8859-19d0d65917a3')
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmitTourForm = (_: any) => {}

  const columns = useMemo<MRT_ColumnDef<Tour>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 20
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200
      },
      {
        accessorKey: 'province',
        header: 'Province',
        size: 100
      },
      {
        accessorKey: 'transportation',
        header: 'Transportation',
        size: 100
      },

      {
        accessorKey: 'duration',
        header: 'Duration',
        size: 20
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        size: 20
      },
      {
        accessorKey: 'pricePerTraveler',
        header: 'Price',
        size: 100,
        Cell: ({ cell }) => <span>${cell.getValue<number>().toLocaleString()}</span>
      }
    ],
    []
  )

  const table = useMaterialReactTable<Tour>({
    columns,
    data: guideToursData?.data ?? [],
    state: {
      isLoading
    },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined'
    },
    paginationDisplayMode: 'pages',
    muiSkeletonProps: {
      animation: 'wave'
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '650px'
      }
    },
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: lighten(theme.palette.primary.main, 0.9)
        }
      })
    },
    renderTopToolbarCustomActions: () => (
      <Button startIcon={<AddIcon />} variant='contained' className='w-fit' onClick={() => setCreateMode(true)}>
        Create Tour
      </Button>
    )
  })

  return (
    <div className='flex h-full w-full flex-col'>
      {!createMode && (
        <>
          <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Tour Management
          </h2>
          <MaterialReactTable table={table} />
        </>
      )}
      {createMode && (
        <>
          <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Create Tour
          </h2>
          <TourForm onSubmit={handleSubmitTourForm} onCancel={() => setCreateMode(false)} />
        </>
      )}
    </div>
  )
}
