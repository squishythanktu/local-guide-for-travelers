import { lighten } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import guideApi from 'src/apis/guide.api'
import { GuideApplication } from 'src/types/guide.type'
import GuideDetailsDialog from './components/GuideDetailsDialog/GuideDetailsDialog'

const GuideConfirmation: React.FC = () => {
  const {
    data: guideApplicationsData,
    isLoading,
    refetch
  } = useQuery({ queryKey: [`get guide applications`], queryFn: () => guideApi.getGuideApplications() })

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const columns = useMemo<MRT_ColumnDef<GuideApplication>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        size: 10
      },
      {
        accessorKey: 'user.fullName',
        header: 'Name',
        size: 20
      },
      {
        accessorKey: 'user.email',
        header: 'Email',
        size: 20
      },
      {
        accessorKey: 'user.address',
        header: 'Address',
        size: 20
      },
      {
        accessorKey: 'yearsOfExperience',
        header: 'Experience',
        size: 20
      },
      {
        accessorKey: 'transportation',
        header: 'Transportation',
        size: 30
      }
    ],
    []
  )

  const [displayData, setDisplayData] = useState<GuideApplication[]>([])
  useEffect(() => {
    setDisplayData(guideApplicationsData?.data.data.filter((item) => item.status === 'PENDING') || [])
  }, [guideApplicationsData])

  const table = useMaterialReactTable<GuideApplication>({
    columns,
    data: displayData,
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setSelectedId(row.original.id)
      },
      sx: {
        cursor: 'pointer'
      }
    }),
    renderTopToolbarCustomActions: () => <h2 className='pt-3 text-xl'>Guide Confirmation</h2>
  })

  return (
    <>
      <MaterialReactTable table={table} />
      {selectedId && <GuideDetailsDialog selectedId={selectedId} refetch={refetch} setSelectedId={setSelectedId} />}
    </>
  )
}
export default GuideConfirmation
