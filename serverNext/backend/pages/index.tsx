import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { StatsCard } from "../components/StatsCard";
import { createStyles, Group } from "@mantine/core";
import { Props } from "next/script";
import { DataChart } from "../components/DataChart";

const useStyles = createStyles((theme) => ({
  StatsCard: {
    marginTop: "20px",
  },
}));

export const getServerSideProps = async () => {
  const resdata = await fetch("https://bio.niggli.software/api/v1/getdata");
  const data = await resdata.json();

  return {
    props: { waterdata: data },
  };
};

const Home: NextPage = (props) => {
  const wdata = JSON.parse(JSON.stringify(props));
  const parseNum = (str: any) => +str.replace(/[^.\d]/g, "");
  const { classes } = useStyles();

  return (
    <>
      <Group position="center" className={classes.StatsCard}>
        <StatsCard
          currentValue={parseNum(JSON.stringify(wdata.waterdata[0].level))}
          currentTime={wdata.waterdata[0].time}
        ></StatsCard>
      </Group>
    </>
  );
};

export default Home;
