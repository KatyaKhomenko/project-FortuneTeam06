import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectTodayWater } from '../../redux/todayWater/selectors';

import {
  deleteWater,
  getAllTodayWater,
} from '../../redux/todayWater/operations';

const TodayWaterList = () => {
  const dispatch = useDispatch();
  const water = useSelector(selectTodayWater);

  useEffect(() => {
    dispatch(getAllTodayWater());
  }, [dispatch]);

  const handleDeleteWater = id => {
    dispatch(deleteWater(id));
  };

  return (
    <div>
      <h3>Today</h3>
      <ul>
        {water?.length > 0
          ? water.map(entry => (
              <li key={entry.id}>
                {entry.amount} ml {entry.time}
                <button onClick={() => handleDeleteWater(entry.id)}>
                  Delete
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TodayWaterList;