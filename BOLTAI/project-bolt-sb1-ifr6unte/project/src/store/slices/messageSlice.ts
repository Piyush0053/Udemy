import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '../../types';

interface MessageState {
  items: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  items: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.items = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.items.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const index = state.items.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(m => m.id !== action.payload);
    },
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} = messageSlice.actions;

export default messageSlice.reducer;