import {Header} from '../app/components/header/index'
//import BusinessStructure from "./components/businessStructure";
import SampleForm from "./components/sampleForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* <BusinessStructure /> */}
      <SampleForm />
    </main>
  );
}
