import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterData } from './operations';

const initialState = {
  selectedMonth: new Date().toISOString().slice(0, 7),
  isCurrentMonth: true,
  daysInMonth: [],
  selectedDay: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

const monthWaterSlice = createSlice({
  name: 'monthWater',
  initialState,
  reducers: {
    changeMonth(state, action) {
      const newMonth = new Date(state.selectedMonth + '-01');
      newMonth.setMonth(newMonth.getMonth() + action.payload);

      const updatedMonth = newMonth.toISOString().slice(0, 7);
      state.selectedMonth = updatedMonth;

      state.isCurrentMonth =
        updatedMonth === new Date().toISOString().slice(0, 7);
    },
    generateDaysInMonth(state) {
      const selectedDate = new Date(state.selectedMonth);
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const daysCount = new Date(year, month + 1, 0).getDate();

      state.daysInMonth = Array.from({ length: daysCount }, (_, i) => ({
        day: i + 1,
        month: state.selectedMonth.toLocaleString('default', { month: 'long' }),
        dailyNorma: null,
      }));
    },
    setSelectedDay: (state, action) => {
      if (action.payload) {
        const { day, month } = action.payload;
        state.selectedDay = { day, month };
      } else {
        state.selectedDay = null;
      }
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.isModalOpen = false;
      state.selectedDay = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchWaterData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWaterData.fulfilled, (state, action) => {
        state.isLoading = false;
        const waterMonthData = action.payload;

        state.daysInMonth = state.daysInMonth.map(day => {
          const found = waterMonthData.find(item =>
            item.Day.startsWith(day.day)
          );
          return found
            ? {
                ...day,
                dailyNorma: found['Daily norma'],
              }
            : day;
        });
      })
      .addCase(fetchWaterData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { changeMonth, generateDaysInMonth, setSelectedDay, closeModal } =
  monthWaterSlice.actions;
export const monthWaterReducer = monthWaterSlice.reducer;
