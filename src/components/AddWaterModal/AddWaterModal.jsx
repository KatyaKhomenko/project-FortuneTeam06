import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/todayWater/operations';
import module from "./AddWaterModal.module.css";

const AddWaterModal = () => {
    const dispatch = useDispatch();
    const [amountWater, setAmountWater] = useState(0);
    const [drinkTime, setDrinkTime] = useState('');

    const handleSubmit = () => {
        if (!amountWater || !drinkTime) {
            return;
        }
        dispatch(addWater({ drinkedWater: amountWater, drinkTime }));
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 5) {
                const hour = h.toString().padStart(2, '0');
                const minute = m.toString().padStart(2, '0');
                options.push(`${hour}:${minute}`);
            }
        }
        return options;
    };

    return (
        <div className={module.modal}>
            <div className={module.container}>
                <div className={module.headerDiv}>
                    <h1 className={module.header}>Add water</h1>
                    <button className={module.closeButton}>
                        <svg className={module.iconCloseButton}>
                            <use href="/src/assets/icons/sprite.svg#icon-outline"></use>
                        </svg>
                    </button>
                </div>
                <div className={module.contentDiv}>
                    <div className={module.amountWater}>
                        <h2 className={module.formHeader}>Choose a value:</h2>
                        <p className={module.waterText}>Amount of water:</p>
                        <div className={module.buttonDiv}>
                            <button
                                className={module.amountBtn}
                                onClick={() => setAmountWater((prev) => Math.max(prev - 10, 0))}
                            >
                                <svg className={module.icon}>
                                    <use href="/src/assets/icons/sprite.svg#icon-minus-small"></use>
                                </svg>
                            </button>
                            <p className={module.answerText}>{amountWater}<span>ml</span></p>
                            <button
                                className={module.amountBtn}
                                onClick={() => setAmountWater((prev) => prev + 10)}
                            >
                                <svg className={module.icon}>
                                    <use href="/src/assets/icons/sprite.svg#icon-plus-small"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={module.label}>
                        <p className={module.firstText}>Recording time:</p>
                        <select className={module.Input} value={drinkTime} onChange={e => setDrinkTime(e.target.value)}>
                            {generateTimeOptions().map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                    <div className={module.label2}>
                        <p className={module.secondText}>Enter the value of the water used:</p>
                        <input
                            className={module.Input}
                            min="0"
                            name="amountWater"
                            type="number"
                            value={amountWater}
                        // onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={module.submitDiv}>
                    <p className={module.answer}>{amountWater}<span>ml</span></p>
                    <button className={module.submitBtn} onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddWaterModal;
