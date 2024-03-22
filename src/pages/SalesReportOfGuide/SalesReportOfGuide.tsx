/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { Box, Pagination } from '@mui/material'
import { lighten } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import statisticApi from 'src/apis/statistic.api'
import { PaginationParams } from 'src/types/pagination-params.type'
import { GuideInStatistic } from 'src/types/statistic.type'

const SalesReportOfGuide: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 7
  })

  const { data: statisticsData, isLoading } = useQuery({
    queryKey: [`sales report of guide`, pagination],
    queryFn: () => statisticApi.getStatisticOfGuide(pagination),
    staleTime: 3 * 1000
  })

  const columns = useMemo<MRT_ColumnDef<GuideInStatistic>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 10
      },
      {
        accessorKey: 'fullName',
        header: 'Name',
        size: 30
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 30
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 30
      },
      {
        accessorKey: 'overallRating',
        header: 'Rating',
        size: 30
      },
      {
        accessorKey: 'totalBooking',
        header: 'Total booking',
        size: 30
      },
      {
        accessorKey: 'totalTravelerNumber',
        header: 'Total travelers',
        size: 30
      },
      {
        accessorKey: 'totalRevenue',
        header: 'Revenue',
        size: 30
      }
    ],
    []
  )

  const table = useMaterialReactTable<GuideInStatistic>({
    enablePagination: false,
    columns,
    data: statisticsData?.data.data.statisticalGuideDTOS ?? [],
    state: {
      isLoading
    },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    muiSkeletonProps: {
      animation: 'pulse',
      height: '12px'
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
    ),
    renderTopToolbarCustomActions: () => <h2 className='pt-3 text-xl'>Sales Report of Guide</h2>
  })

  return (
    <Box className='h-screen'>
      <MaterialReactTable table={table} />
    </Box>
  )
}

export default SalesReportOfGuide
