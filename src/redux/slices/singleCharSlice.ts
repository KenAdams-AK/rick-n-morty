import { Character } from './../../models/responseModel';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiRouts } from '../../routs/apiRouts';

type InitialStateT = {
  isLoading: boolean,
  singleChar: Character | null,
  error: string | null
}

const initialState: InitialStateT = {
  isLoading: false,
  singleChar: null,
  error: null
}

export const fetchSingleChar = createAsyncThunk('singleChar/fetchSingleChar', async (id: string, { signal }): Promise<Character> => {
  
  const source = axios.CancelToken.source()
  signal.addEventListener('abort', () => {
    source.cancel()
  })

  const response = await axios.get<Character>(`${ApiRouts.GET_CHARACTERS_URL}/${id}`, {
    cancelToken: source.token
  })

  return response.data
})

const singleCharSlice = createSlice({
  name: 'singeChar',
  initialState,
  reducers: {
    setSingleChar: (state, action: PayloadAction<Character>) => {
      state.singleChar = action.payload
    }
  },
  extraReducers(builder) {

    builder.addCase(fetchSingleChar.pending, (state) => {
      state.error = null
      state.isLoading = true
    })

    builder.addCase(fetchSingleChar.fulfilled, (state, action: PayloadAction<Character>) => {
      state.isLoading = false
      state.singleChar = action.payload
    })

    builder.addCase(fetchSingleChar.rejected, ((state, action) => {
      state.isLoading = false
      state.error = action.error.message || 'Something went wrong. Try again later.'
    }))
  }
})

export const {setSingleChar} = singleCharSlice.actions
export default singleCharSlice.reducer