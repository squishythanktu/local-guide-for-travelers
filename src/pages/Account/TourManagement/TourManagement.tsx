/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Button from '@mui/material/Button'
import { lighten } from '@mui/material/styles'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MRT_Cell, MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import tourApi from 'src/apis/tour.api'
import { AppContext } from 'src/contexts/app.context'
import { Tour } from 'src/types/tour.type'
import { TourSchema } from 'src/utils/rules'
import TourForm from '../components/TourForm'
import UpdateForm from '../components/TourForm/UpdateForm'
import ConfirmDialog from './components/ConfirmDialog'

type TourFormData = TourSchema
export type UpdateTourFormData = TourSchema & {
  id: number
}

interface Props {
  guideId?: string
}

export default function TourManagement({ guideId }: Props) {
  const { profile } = useContext(AppContext)
  const isOwner = guideId ? false : true
  const [createMode, setCreateMode] = useState<boolean>(false)
  const [updateMode, setUpdateMode] = useState<boolean>(false)
  const [deleteMode, setDeleteMode] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string>('')
  const navigate = useNavigate()
  const {
    data: guideToursData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: [`tours of guide ${guideId ? guideId : profile?.id}`],
    queryFn: () => tourApi.getToursOfGuide(guideId ? guideId : profile?.id ? profile.id : ''),
    staleTime: 6 * 1000
  })
  const createTourMutation = useMutation({
    mutationFn: (body: TourFormData) => tourApi.createTour(body)
  })
  const deleteTourMutation = useMutation({
    mutationFn: (selectedId: string) => tourApi.deleteTour(selectedId)
  })

  const handleCreateTourForm = (tourForm: TourFormData) => {
    const formattedTourForm = {
      ...tourForm,
      startTimes: tourForm.startTimes?.map((time) => time?.toLocaleTimeString('en-US', { hour12: false })),
      guide: {
        id: profile!.id
      }
    }
    console.log('form: ', formattedTourForm)

    // createTourMutation.mutate(formattedTourForm, {
    //   onSuccess: () => {
    //     setCreateMode(false)
    //     refetch()
    //     toast.success('Create the tour successfully.')
    //   },
    //   onError: (error) => {
    //     toast.error(error.message)
    //   }
    // })
  }

  const handleCancelTourForm = () => {
    setCreateMode(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleUpdateTourForm = (id: string) => {
    setSelectedId(id)
    setUpdateMode(true)
  }

  const handleDelete = (id: string) => {
    setSelectedId(id)
    setDeleteMode(true)
  }

  const handleCloseDialog = () => {
    setDeleteMode(false)
  }

  const handleConfirmDelete = () => {
    deleteTourMutation.mutate(selectedId, {
      onSuccess: () => {
        setDeleteMode(false)
        refetch()
        toast.success('Delete the tour successfully.')
      },
      onError: (error) => {
        setDeleteMode(false)
        toast.error(error.message)
      }
    })
  }

  const baseColumns = useMemo<MRT_ColumnDef<Tour>[]>(
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
        accessorKey: 'address',
        header: 'Address',
        size: 200
      },
      {
        accessorKey: 'transportation',
        header: 'Transportation',
        size: 50
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

  const actionColumn = {
    accessorKey: 'action',
    header: 'Action',
    size: 100,
    Cell: ({ cell }: { cell: MRT_Cell<Tour> }) => (
      <>
        <ModeEditOutlineOutlinedIcon
          onClick={(event) => {
            event.stopPropagation(), handleUpdateTourForm(cell.row.original.id.toString())
          }}
        />
        <DeleteOutlinedIcon
          onClick={(event) => {
            event.stopPropagation(), handleDelete(cell.row.original.id.toString())
          }}
        />
      </>
    )
  }

  const columns = useMemo<MRT_ColumnDef<Tour>[]>(() => {
    if (isOwner) {
      return [...baseColumns, actionColumn]
    }
    return baseColumns
  }, [isOwner])

  const table = useMaterialReactTable<Tour>({
    columns,
    data: guideToursData?.data.data ?? [],
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
        navigate(`/tours/${row.original.id}`)
      }
    }),
    renderTopToolbarCustomActions: () =>
      isOwner ? (
        <Button startIcon={<AddIcon />} variant='contained' className='w-fit' onClick={() => setCreateMode(true)}>
          Create Tour
        </Button>
      ) : (
        ''
      )
  })

  return (
    <div className='flex h-full w-full flex-col'>
      {!createMode && !updateMode && (
        <>
          {isOwner && (
            <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
              Tour Management
            </h2>
          )}
          <MaterialReactTable table={table} />
        </>
      )}
      {createMode && (
        <>
          <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Create Tour
          </h2>
          <TourForm
            onSubmit={handleCreateTourForm}
            onCancel={handleCancelTourForm}
            isMutation={createTourMutation.isPending}
          />
        </>
      )}
      {updateMode && (
        <>
          <h2 className='account-profile__header border-b-1 mb-6 border-b-[0.5px] border-solid border-[var(--border-primary)] pb-1'>
            Update Tour
          </h2>
          <UpdateForm
            tourId={selectedId}
            onCancel={() => {
              setUpdateMode(false), setSelectedId('')
            }}
            setUpdateMode={setUpdateMode}
            refetch={refetch}
          />
        </>
      )}
      {deleteMode && (
        <ConfirmDialog
          title='Delete Confirm'
          handleCloseDialog={handleCloseDialog}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
