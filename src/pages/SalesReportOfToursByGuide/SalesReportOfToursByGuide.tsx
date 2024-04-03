/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import Pagination from '@mui/material/Pagination'
import { lighten } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import statisticApi from 'src/apis/statistic.api'
import path from 'src/constants/path.constant'
import { AppContext } from 'src/contexts/app.context'
import { PaginationParams } from 'src/types/pagination-params.type'
import { TourInStatistic } from 'src/types/statistic.type'

const SalesReportOfToursByGuide: React.FC = () => {
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 7
  })
  const { data: statisticsData, isLoading } = useQuery({
    queryKey: [`sales report of tour by guide with id ${profile?.id} in page ${pagination?.page}`, pagination],
    queryFn: () => statisticApi.getStatisticOfTourByGuide(pagination),
    staleTime: 10 * 1000
  })

  const columns = useMemo<MRT_ColumnDef<TourInStatistic>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 10
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200
      },
      {
        accessorKey: 'pricePerTraveler',
        header: 'Price per traveler',
        size: 30,
        Cell: ({ cell }) => <span>${cell.getValue<number>()?.toLocaleString()}</span>
      },
      {
        accessorKey: 'limitTraveler',
        header: 'Limit traveler(s)',
        size: 30
      },
      {
        accessorKey: 'totalRevenue',
        header: 'Total revenue',
        size: 30,
        Cell: ({ cell }) => <span>${cell.getValue<number>()?.toLocaleString()}</span>
      },
      {
        accessorKey: 'extraPrice',
        header: 'Extra price',
        size: 30,
        Cell: ({ cell }) => <span>${cell.getValue<number>()?.toLocaleString()}</span>
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
      }
    ],
    []
  )

  const table = useMaterialReactTable<TourInStatistic>({
    columns,
    data: statisticsData?.data.data.statisticalTourDTOS ?? [],
    state: {
      isLoading
    },
    enablePagination: false,
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`${path.tourDetail.replace(':id', row.original.id.toString())}`),

      sx: { cursor: 'pointer' }
    }),
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
    renderBottomToolbarCustomActions: () => (
      <Pagination
        className='absolute right-5 top-1/4'
        onChange={(_, page) => {
          setPagination((prevPagination) => ({
            ...prevPagination,
            page: page - 1
          }))
        }}
        page={(pagination.page || 0) + 1}
        count={statisticsData?.data.data.totalOfPage || 1}
        variant='outlined'
        shape='rounded'
      />
    )
  })

  return (
    <>
      <h2 className='border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
        Sales Report
      </h2>
      <MaterialReactTable table={table} />
    </>
  )
}

export default SalesReportOfToursByGuide
