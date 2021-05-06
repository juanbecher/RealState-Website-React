import { jsx } from "@emotion/react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";

export default function Tasaciones() {
  return (
    <div>
      <Layout>
        <div className="classPadding">
          <h4>Tasaciones</h4>
        </div>
      </Layout>
    </div>
  );
}
