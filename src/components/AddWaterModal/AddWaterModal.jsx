import { useState } from "react";
import module from "./AddWaterModal.module.css";

const AddWaterModal = () => {
    const [amountWater, setAmountWater] = useState(0);

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
                        <input
                            className={module.Input}
                            min="0"
                            name="weight"
                            type="text"
                        // onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </div>
                    <div className={module.label2}>
                        <p className={module.secondText}>Enter the value of the water used:</p>
                        <input
                            className={module.Input}
                            min="0"
                            name="weight"
                            type="number"
                        // onChange={(e) => setWeight(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className={module.submitDiv}>
                    <p className={module.answer}>{amountWater}<span>ml</span></p>
                    <button className={module.submitBtn}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddWaterModal;
