import { useState } from 'react';
import module from './DailyNorma.module.css'

const DailyNorma = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  return (
    <div className={module.modal}>
      <div className={module.container}>
        <div className={module.headerDiv}>
          <h1 className={module.header}>My daily norma</h1>
          <button className={module.closeButton}>X</button>
        </div>
        <div className={module.contentDiv}>
          <div className={module.infoDiv}>
            <div className={module.formuls}>
              <p className={module.formula}>For girl: <span className={module.spanFormula}>V=(M*0,03) + (T*0,4)</span></p>
              <p className={module.formula2}>For man: <span className={module.spanFormula}>V=(M*0,04) + (T*0,6)</span></p>
            </div>
            <p className={module.infoParagraph}> <span className={module.infoParagraphSpan}>*</span> V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)</p>
          </div>
          <div className={module.calculateDiv}>
            <h2 className={module.calculateHeader}>Calculate your rate:</h2>
            <form id='Form' className={module.calculateForm}>
              <div className={module.checkBoxDiv}>
                <div className={module.radio1}>
                  <label>
                    <input type="radio" value="option1" className={module.radio} checked={selectedOption === "option1"}
                      onChange={() => setSelectedOption("option1")} />
                    For woman
                  </label>
                </div>
                <div className={module.radio2}>
                  <label>
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
                  name="weight"
                  type="text"
                />
              </label>
              <label className={module.timeField}>
                The time of active participation in sports or other activities with a high physical. load in hours:
                <input
                  className={module.Input}
                  name="time"
                  type="text"
                />
              </label>
              <p className={module.answer}>The required amount of water in liters per day: <span className={module.answerSpan}>2000</span></p>
            </form>
          </div>
          <label className={module.waterField}>
            Write down how much water you will drink:
            <input
              className={module.Input}
              name="water"
              type="text"
            />
          </label>
        </div>
        <button type='submit' form="Form" className={module.submitBtn}>Save</button>
      </div>
    </div>
  )
}

export default DailyNorma
