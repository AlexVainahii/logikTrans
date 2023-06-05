import { Links, Main } from "../components/SharedLayout.styled";

const Home = () => {
  return (
    <Main>
      <div className="container">
        <h2>Ласкаво просимо до "LOGICTRANS"!</h2>
        <p>
          Ми є провідною логістичною компанією, яка забезпечує широкий спектр
          послуг у сфері перевезень та логістики.
        </p>
        <p>
          Наша команда професіоналів готова вирішувати найскладніші завдання з
          перевезення вантажів по всьому світу.
        </p>
        <p>З нами ваші вантажі доставляться швидко, безпечно і вчасно.</p>
        <h3>Наші послуги</h3>
        <ul>
          <li>Міжнародні перевезення</li>
          <li>Експрес-доставка</li>
          <li>Складські послуги</li>
        </ul>
        <Links to="/order">
          <button
            style={{
              backgroundColor: "orangered",
              borderRadius: "4px",
              padding: "10px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Замовити перевезення
          </button>
        </Links>
        <h3>Наші клієнти</h3>
        <p>Ми співпрацюємо з різними клієнтами, включаючи:</p>
        <ul>
          <li>Малий та середній бізнес</li>
          <li>Великі корпорації</li>
          <li>Електронна комерція</li>
          <li>Галузеві лідери</li>
        </ul>
      </div>
      <style>{`
        main {
          background-size: cover;
          background-position: center;
          padding: 50px;
          color: black;
          text-align: center;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        h2 {
          font-size: 32px;
          margin-bottom: 20px;
        }

        p {
          margin-bottom: 10px;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin-bottom: 20px;
        }

        li {
          margin-bottom: 5px;
        }
      `}</style>
    </Main>
  );
};
export default Home;
