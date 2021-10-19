import Head from "next/head";
import styles from "../styles/Home.module.css";
import { convert } from "../utils/convert";
import axios from "axios";
import { useRouter } from "next/router";

const BASE_URL = "https://eacp.energyaustralia.com.au/codingtest/api/v1";

const fetchData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/festivals`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error: error.response.data };
  }
};

export default function Home({ data, error }) {
  const router = useRouter();

  const refreshData = async () => {
    router.replace(router.asPath);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Energy Australia Coding Test</title>
        <meta name="description" content="Energy Australia Coding Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Energy Australia Coding Test</h1>

        <button className={styles.description} onClick={refreshData}>
          Refresh
        </button>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Festivals</h2>
            {error && <p className={styles.error}>{error}</p>}
            {/* {JSON.stringify(data)} */}
            <ul className={styles.topList}>
              {data &&
                data.map(({ name: festivalName, bands }, index) => (
                  <li key={String(festivalName)}>
                    <p className={styles.festival}>{festivalName}</p>

                    <ul>
                      {bands &&
                        bands.length > 0 &&
                        bands.map(({ name, recordLabel }) => (
                          <li key={name} className={styles.band}>
                            {name} - {recordLabel}
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Labels</h2>
            <ul className={styles.topList}>
              {data &&
                convert(data).map(
                  ({ name: labelName, bands }) =>
                    labelName && (
                      <li key={labelName} className={styles.label}>
                        {labelName}
                        <ul>
                          {bands &&
                            bands.length > 0 &&
                            bands.map(({ name: bandName, festivals }) => (
                              <li key={bandName} className={styles.band}>
                                {bandName}
                                <ul>
                                  {festivals &&
                                    festivals.length > 0 &&
                                    festivals.map(
                                      ({ name }) =>
                                        name && (
                                          <li
                                            key={name}
                                            className={styles.festival}
                                          >
                                            {name}
                                          </li>
                                        )
                                    )}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await fetchData();

  return {
    props: data,
  };
};
