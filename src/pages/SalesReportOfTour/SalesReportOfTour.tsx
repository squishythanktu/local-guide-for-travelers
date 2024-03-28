/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { lighten } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useMemo, useState } from 'react'
import statisticApi from 'src/apis/statistic.api'
import tourApi from 'src/apis/tour.api'
import { TourInStatistic } from 'src/types/statistic.type'
import { Tour } from 'src/types/tour.type'
import TourDetailsDialog from '../TourConfirmation/components/TourDetailsDialog/TourDetailsDialog'

const SalesReportOfTour: React.FC = () => {
  const [openTourDetailDialog, setOpenTourDetailDialog] = useState(false)
  const [selectedTourId, setSelectedTourId] = useState<number | undefined>(undefined)
  const { data: statisticsData, isLoading } = useQuery({
    queryKey: [`sales report of tour`],
    queryFn: () => statisticApi.getStatisticOfTour(),
    staleTime: 10 * 1000
  })
  const { data: pendingTourDetailsData, isPending: isPendingTourDetail } = useQuery({
    queryKey: [`tour details with id ${selectedTourId}`, selectedTourId],
    queryFn: () => tourApi.getTourById(selectedTourId as number),
    staleTime: 2 * 1000,
    enabled: selectedTourId != undefined
  })

  const handleCloseTourDetailDialog = () => {
    setSelectedTourId(undefined)
    setOpenTourDetailDialog(false)
  }

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
        header: 'Rating',
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

  const table = useMaterialReactTable<TourInStatistic>({
    columns,
    data: statisticsData?.data.data ?? [],
    state: {
      isLoading
    },
    enablePagination: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableHiding: false,
    muiSkeletonProps: {
      animation: 'pulse',
      height: '12px'
    },
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined'
    },
    paginationDisplayMode: 'pages',
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setOpenTourDetailDialog(true)
        setSelectedTourId(row.original.id)
      },
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
    renderTopToolbarCustomActions: () => <h2 className='pt-3 text-xl'>Sales Report of Tour</h2>
  })

  return (
    <Box className='h-screen'>
      <MaterialReactTable table={table} />
      {openTourDetailDialog && (
        <TourDetailsDialog
          tourData={pendingTourDetailsData?.data.data as Tour}
          isPendingTourDetail={isPendingTourDetail}
          handleCloseTourDetailDialog={handleCloseTourDetailDialog}
          readonly={true}
          refetch={() => {}}
        />
      )}
    </Box>
  )
}

export default SalesReportOfTour
