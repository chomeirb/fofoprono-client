import { Header, Games, Standing } from "../../components";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-row w-full justify-center">
        <div className="flex flex-row max-w-7xl w-full justify-between">
          <Games />
          <Standing />
        </div>
      </main>
    </>
    );
}