import { Autocomplete, TextField } from '@mui/material'
import { feedbackRatings } from '../assets/data/Relationship.'

const FeedbackModalComponent = () => {
  return (
    <div className='w-[500px] min-h-[200px] max-h-[300px] p-3 rounded-lg bg-white flex flex-col justify-between'>
      <div className='h-[45px] font-medium ml-2 text-lwPurple flex justify-start items-center'>
        Send Feedback
      </div>
      <div className='border-t border-b border-b-silver border-t-silver flex-1 flex flex-wrap gap-3 p-2'>
        <TextField
          id='outlined-password-input'
          label='Enrolee Name'
          type='text'
          autoComplete='current-password'
          size={'small'}
          // onChange={(e) => handledependantInfo(e, 'surname')}
          // key={inputState}
        />
        <div className='w-[223px]'>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={feedbackRatings}
            // key={inputState}
            getOptionLabel={(option) => `${option.ratingDescription}`}
            // onChange={(e, option) => handledependantInfo(e, 'sex', option)}
            size={'small'}
            renderInput={(params) => <TextField {...params} label='Rating' />}
          />
        </div>
        <div className='w-[100%]'>
          <TextField
            id='outlined-password-input'
            label='Feedback'
            type='text'
            autoComplete='current-password'
            multiline
            rows={4}
            maxRows={6}
            fullWidth
            size='small'
            // onChange={(e) => handledependantInfo(e, 'surname')}
            // key={inputState}
          />
        </div>
      </div>
      <div className=' h-[60px] flex justify-end'>
        <button className='py-1 px-4 font-medium text-lwPurple rounded-md hover:bg-slate-50'>
          Cancel
        </button>
        <button className='py-1 px-4 font-medium text-lwPurple rounded-md hover:bg-slate-50 '>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default FeedbackModalComponent