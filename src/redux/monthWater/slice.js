import { createSlice } from '@reduxjs/toolkit';
import { fetchMonthWater, fetchDayWater } from './operations';

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.toISOString().slice(0, 7);

const initialState = {
  dailyNorma: 2000,
  selectedMonth: currentMonth,
  isCurrentMonth: true,
  daysInMonth: [],
  selectedDay: null,
  selectedDayData: null,
  isModalOpen: false,
  isLoading: false,
  error: null,
};

const monthWaterSlice = createSlice({
  name: 'monthWater',
  initialState,
  reducers: {
    setDailyNorma: (state, action) => {
      state.dailyNorma = action.payload;
    },
    changeMonth(state, action) {
      const [year, month] = state.selectedMonth.split('-').map(Number);
      const newDate = new Date(year, month - 1 + action.payload, 1);

      const updatedMonth = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, '0')}`;

      state.selectedMonth = updatedMonth;
      state.isCurrentMonth = updatedMonth === currentMonth;
    },
    generateDaysInMonth(state) {
      const selectedDate = new Date(state.selectedMonth);
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const daysCount = new Date(year, month + 1, 0).getDate();

      state.daysInMonth = Array.from({ length: daysCount }, (_, i) => {
        const day = i + 1;
        return {
          day,
          month: state.selectedMonth.toLocaleString('default', {
            month: 'long',
          }),
          dailyNorma: null,
          isFuture:
            state.selectedMonth > currentMonth ||
            (state.selectedMonth === currentMonth && day > currentDay),
        };
      });
    },
    setSelectedDay: (state, action) => {
      if (action.payload) {
        const { day, month, top, left, positionClass } = action.payload;
        state.selectedDay = { day, month, top, left, positionClass };
      } else {
        state.selectedDay = null;
      }
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.isModalOpen = false;
      state.selectedDay = null;
      state.selectedDayData = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchMonthWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMonthWater.fulfilled, (state, action) => {
        state.isLoading = false;
        const waterMonthData = action.payload.data;

        const groupedWaterData = waterMonthData.reduce((acc, item) => {
          const drinkDay = new Date(item.drinkTime).getDate();
          acc[drinkDay] = (acc[drinkDay] || 0) + item.drinkedWater;
          return acc;
        }, {});

        state.daysInMonth = state.daysInMonth.map(day => {
          const totalDrinkedWater = groupedWaterData[day.day] || 0;
          return {
            ...day,
            drinkedWater: totalDrinkedWater,
            dailyNorma: Math.min(
              100,
              Math.round((totalDrinkedWater / state.dailyNorma) * 100)
            ),
          };
        });
      })
      .addCase(fetchMonthWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchDayWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDayWater.fulfilled, (state, action) => {
        state.isLoading = false;
        const dayData = action.payload.data || []; // Якщо даних немає, встановлюємо порожній масив

        const totalDrinkedWater = dayData.reduce(
          (sum, entry) => sum + entry.drinkedWater,
          0
        );
        const servings = dayData.length || 0; // Якщо записів немає, буде 0
        const fulfillment = Math.min(
          100,
          dayData.length > 0
            ? Math.round((totalDrinkedWater / state.dailyNorma) * 100)
            : 0 // Якщо немає даних, показуємо 0%
        );

        state.selectedDayData = {
          'Daily norma': `${state.dailyNorma / 1000} L`,
          'Fulfillment of the daily norm': `${fulfillment}%`,
          'How many servings of water': `${servings}`,
        };
      })
      .addCase(fetchDayWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  changeMonth,
  generateDaysInMonth,
  setSelectedDay,
  closeModal,
  setDailyNorma,
} = monthWaterSlice.actions;
export const monthWaterReducer = monthWaterSlice.reducer;
