import axios from "axios"
import { Character, Info, Response } from "../../models/responseModel"
import { ApiRouts } from "../../routs/apiRouts"
import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';

type InitialStateT = {
  isLoading: boolean,
  responseInfo: Info | null,
  characters: Character[],
  error: string | null
}

const initialState: InitialStateT= {
  isLoading: false,
  responseInfo: null,
  characters: [],
  error: null
}

export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async (query: string | null, { signal }): Promise<Response> => {
  
  const source = axios.CancelToken.source()
  signal.addEventListener('abort', () => {
    source.cancel()
  })

  const params = query ? {
    name: query,
  } : null

  const response = await axios.get<Response>(ApiRouts.GET_CHARACTERS_URL, {
    params,
    cancelToken: source.token
  })
  
  return response.data
})

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload
    }
  },
  extraReducers(builder) {

    builder.addCase(fetchCharacters.pending, (state) => {
      state.error = null
      state.isLoading = true
    })

    builder.addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<Response>) => {
      state.isLoading = false
      state.responseInfo = action.payload.info
      state.characters = action.payload.results.sort((a, b) => a.name > b.name ? 1 : -1)
    })

    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.isLoading = false
      // Added "if" statement in order to handle 404 status code error which is thrown by the server in response to searching character request if there are no mathces
      if (action.error.code === 'ERR_BAD_REQUEST') {
        state.error = 'Not found'
        return
      }
      state.error = action.error.message || 'Something went wrong. Try again later'
    })
  }
})

export const {setCharacters} = charactersSlice.actions
export default charactersSlice.reducer