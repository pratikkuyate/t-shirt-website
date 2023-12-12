import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CanvasModel from "../src/canvas";
import Customizer from "./Customizer";
import Hero from "./Home";

export default function Home() {
  return (
    <main className="app transition-all ease-in">
      <Hero />
      <CanvasModel />
      <Customizer />
    </main>
  );
}
