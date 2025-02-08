import { useEffect, useState } from 'react';
import module from './DailyNormaModal.module.css'

const DailyNormaModal = ({ onClose, onWaterNormChange }) => {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [weight, setWeight] = useState(0);
    const [time, setTime] = useState(0);
    const [waterAmount, setWaterAmount] = useState(0);
    const [amountWaterDrunk, setAmountWaterDrunk] = useState(0);

    const handleEscape = event => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        const w = parseFloat(weight);
        const t = parseFloat(time);

        if (!isNaN(w) && w > 0 && !isNaN(t) && t >= 0) {
            const V = selectedOption === "option1"
                ? (w * 0.03) + (t * 0.4)
                : (w * 0.04) + (t * 0.6);
            setWaterAmount(V.toFixed(2));
        } else {
            setWaterAmount(0);
        }
    }, [weight, time, selectedOption]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onWaterNormChange(waterAmount);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);


    return (
        <div className={module.modal} onClick={onClose}>
            <div className={module.container} onClick={(e) => e.stopPropagation()}>
                <div className={module.headerDiv}>
                    <h1 className={module.header}>My daily norma</h1>
                    <button className={module.closeButton} onClick={onClose}>
                        <svg className={module.icon}>
                            <use href="/src/assets/icons/sprite.svg#icon-outline"></use>
                        </svg>
                    </button>
                </div>
                <div className={module.contentDiv}>
                    <div className={module.infoDiv}>
                        <div className={module.formuls}>
                            <p className={module.formula}>For girl: <span className={module.spanFormula}>V=(M*0.03) + (T*0.4)</span></p>
                            <p className={module.formula2}>For man: <span className={module.spanFormula}>V=(M*0.04) + (T*0.6)</span></p>
                        </div>
                        <p className={module.infoParagraph}> <span className={module.infoParagraphSpan}>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)</p>
                    </div>
                    <div className={module.calculateDiv}>
                        <h2 className={module.calculateHeader}>Calculate your rate:</h2>
                        <form id='Form' className={module.calculateForm} onSubmit={handleSubmit}>
                            <div className={module.checkBoxDiv}>
                                <div className={module.radio1}>
                                    <label className={module.label}>
                                        <input type="radio" value="option1" className={module.radio} checked={selectedOption === "option1"}
                                            onChange={() => setSelectedOption("option1")} />
                                        For woman
                                    </label>
                                </div>
                                <div className={module.radio2}>
                                    <label className={module.label}>
                                        <input type="radio" value="option2" className={module.radio} checked={selectedOption === "option2"}
                                            onChange={() => setSelectedOption("option2")} />
                                        For man
                                    </label>
                                </div>
                            </div>
                            <label className={module.weightField}>
                                Your weight in kilograms:
                                <input
                                    className={module.Input}
                                    min="0"
                                    name="weight"
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(Number(e.target.value))}
                                />
                            </label>
                            <label className={module.timeField}>
                                The time of active participation in sports or other activities with a high physical. load in hours:
                                <input
                                    className={module.Input}
                                    min="0"
                                    name="time"
                                    type="number"
                                    value={time}
                                    onChange={(e) => setTime(Number(e.target.value))}
                                />
                            </label>
                            <div className={module.answer}>
                                <p className={module.text}>The required amount of water in liters per day:</p>
                                <p className={module.answerSpan}>{waterAmount} L</p>
                            </div>

                        </form>
                    </div>
                    <label className={module.waterField}>
                        Write down how much water you will drink:
                        <input
                            className={module.Input}
                            name="water"
                            type="number"
                            value={amountWaterDrunk}
                            onChange={(e) => setAmountWaterDrunk(Number(e.target.value))}
                        />
                    </label>
                </div>
                <button type='submit' form="Form" className={module.submitBtn}>Save</button>
            </div>
        </div>
    )
}

export default DailyNormaModal