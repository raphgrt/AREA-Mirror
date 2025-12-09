import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Workflow } from '../../types/workflow';

interface WorkflowsState {
  items: Workflow[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkflowsState = {
  items: [],
  isLoading: false,
  error: null,
};

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    setWorkflows: (state, action: PayloadAction<Workflow[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addWorkflow: (state, action: PayloadAction<Workflow>) => {
      state.items.push(action.payload);
    },
    updateWorkflow: (state, action: PayloadAction<Workflow>) => {
      const index = state.items.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((w) => w.id !== action.payload);
    },
  },
});

export const { 
  setWorkflows, 
  setLoading, 
  setError, 
  addWorkflow, 
  updateWorkflow, 
  deleteWorkflow 
} = workflowsSlice.actions;

export default workflowsSlice.reducer;
