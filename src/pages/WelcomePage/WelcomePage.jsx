import css from './WelcomePage.module.css';

const WelcomePage = () => {
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
                <img
                  src="/icons/habit.svg"
                  alt="Habit"
                  className={css['icon']}
                />
                Habit drive
              </li>
              <li className={css['benefitItem']}>
                <img
                  src="/icons/stats.svg"
                  alt="Statistics"
                  className={css['icon']}
                />
                View statistics
              </li>
              <li className={css['benefitItem']}>
                <img
                  src="/icons/settings.svg"
                  alt="Settings"
                  className={css['icon']}
                />
                Personal rate setting
              </li>
            </ul>
          </div>
          <button className={css['btn']}>Try tracker</button>
        </div>
        <section className={css['info']}>
          <h2 className={css['infoTitle']}>Why drink water</h2>
          <ul className={css['infoList']}>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span>
              Supply of nutrients to all organs
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Providing oxygen to
              the lungs
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Maintaining the work
              of the heart
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Release of processed
              substances
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Ensuring the stability
              of the internal environment
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Maintaining within the
              normal temperature
            </li>
            <li className={css['infoItem']}>
              <span className={css['green-icon']}></span> Maintaining an immune
              system capable of resisting disease
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default WelcomePage;
