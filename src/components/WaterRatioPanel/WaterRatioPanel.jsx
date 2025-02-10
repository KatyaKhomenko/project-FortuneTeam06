import styles from './WaterRatioPanel.module.css';

const WaterRatioPanel = () => {
  return (
    <div className={styles.waterRatioPanelBox}>
      <h3 className={styles.addWaterTitle}>Today</h3>
      <button className={styles.addWaterBtn} type="button">
        <svg className={styles.addIcon} width="24" height="24">
          <use
            className={styles.add}
            href="/src/assets/icons/sprite.svg#icon-plus-circle"
          ></use>
        </svg>
        Add Water
      </button>
    </div>
  );
};

export default WaterRatioPanel;
