import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Server } from '../../types';

interface ServerState {
  items: Server[];
  activeServerId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServerState = {
  items: [],
  activeServerId: null,
  loading: false,
  error: null,
};

const serverSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    setServers: (state, action: PayloadAction<Server[]>) => {
      state.items = action.payload;
    },
    setActiveServer: (state, action: PayloadAction<string>) => {
      state.activeServerId = action.payload;
    },
    addServer: (state, action: PayloadAction<Server>) => {
      state.items.push(action.payload);
    },
    updateServer: (state, action: PayloadAction<Server>) => {
      const index = state.items.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeServer: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(s => s.id !== action.payload);
    },
  },
});

export const {
  setServers,
  setActiveServer,
  addServer,
  updateServer,
  removeServer,
} = serverSlice.actions;

export default serverSlice.reducer;