/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import Paper from '@mui/material/Card'
import { lighten } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useMemo } from 'react'
import statisticApi from 'src/apis/statistic.api'
import { Tour } from 'src/types/tour.type'

const SalesReportOfTour: React.FC = () => {
  const { data: statisticsData, isLoading } = useQuery({
    queryKey: [`sales report of tour`],
    queryFn: () => statisticApi.getStatisticOfTour(),
    staleTime: 3 * 1000
  })

  const columns = useMemo<MRT_ColumnDef<Tour>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 10
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200
      },
      {
        accessorKey: 'pricePerTraveler',
        header: 'Price',
        size: 30,
        Cell: ({ cell }) => <span>${cell.getValue<number>()?.toLocaleString()}</span>
      },
      {
        accessorKey: 'limitTraveler',
        header: 'Limit traveler(s)',
        size: 30
      },
      {
        accessorKey: 'extraPrice',
        header: 'Extra price',
        size: 30
      },
      {
        accessorKey: 'overallRating',
        header: 'Overall rating',
        size: 30
      },
      {
        accessorKey: 'totalTravelerNumber',
        header: 'Total booked',
        size: 30
      },
      {
        accessorKey: 'totalRevenue',
        header: 'Total revenue',
        size: 30
      }
    ],
    []
  )

  const table = useMaterialReactTable<Tour>({
    columns,
    data: statisticsData?.data.data.tourDTOS ?? [],
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
    }
  })

  return (
    <Paper elevation={0} className='sales-report-tour__container h-screen p-4'>
      <h2 className='mb-2 text-xl'>Sales Report of Tour</h2>
      <MaterialReactTable table={table} />
    </Paper>
  )
}

export default SalesReportOfTour
