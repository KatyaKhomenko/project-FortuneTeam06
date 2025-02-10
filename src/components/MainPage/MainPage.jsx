import css from './MainPage.module.css';
import sprite from '../../assets/icons/sprite.svg';

const MainPage = () => {
  return (
    <div className={css['container']}>
      <main className={css['main']}>
        <div className={css['main-benefits']}>
          <h1 className={css['title']}>Water consumption tracker</h1>
          <p className={css['subtitle']}>Record daily water intake and track</p>

          <div className={css['benefits']}>
            <h2 className={css['benefitsTitle']}>Tracker Benefits</h2>
            <ul className={css['benefitsList']}>
              <li className={css['benefitItem']}>
                <svg className={css['icon']}>
                  <use href={`${sprite}#icon-calendar`}></use>
                </svg>
                Habit drive
              </li>
              <li className={css['benefitItem']}>
                <svg className={css['icon']}>
                  <use href={`${sprite}#icon-chart-bar`}></use>
                </svg>
                View statistics
              </li>
              <li className={css['benefitItem']}>
                <svg className={css['icon']}>
                  <use href={`${sprite}#icon-wrench-screwdriver`}></use>
                </svg>
                Personal rate setting
              </li>
            </ul>
            <button className={css['btn']}>Try tracker</button>
          </div>
        </div>
        <section className={css['info']}>
          <h2 className={css['infoTitle']}>Why drink water</h2>
          <ul className={css['infoList']}>
            <li className={css['infoItem']}>
              Supply of nutrients to all organs
            </li>
            <li className={css['infoItem']}> Providing oxygen to the lungs</li>
            <li className={css['infoItem']}>
              Maintaining the work of the heart
            </li>
            <li className={css['infoItem']}>Release of processed substances</li>
            <li className={css['infoItem']}>
              Ensuring the stability of the internal environment
            </li>
            <li className={css['infoItem']}>
              Maintaining within the normal temperature
            </li>
            <li className={css['infoItem']}>
              Maintaining an immune system capable of resisting disease
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
