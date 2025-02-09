import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Channel, Category } from '../../types';

interface ChannelState {
  items: Channel[];
  categories: Category[];
  activeChannelId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChannelState = {
  items: [],
  categories: [],
  activeChannelId: null,
  loading: false,
  error: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.items = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setActiveChannel: (state, action: PayloadAction<string>) => {
      state.activeChannelId = action.payload;
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.items.push(action.payload);
    },
    updateChannel: (state, action: PayloadAction<Channel>) => {
      const index = state.items.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
});

export const {
  setChannels,
  setCategories,
  setActiveChannel,
  addChannel,
  updateChannel,
  removeChannel,
} = channelSlice.actions;

export default channelSlice.reducer;