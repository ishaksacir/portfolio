import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { RetroScrollbar } from "./components/RetroScrollbar/RetroScrollbar";
import { useHashRoute } from "./hooks/useHashRoute";
import { PAGE_COMPONENTS, PAGE_IDS, type PageId } from "./routes/routes";

export default function App() {
  const page = useHashRoute<PageId>(PAGE_IDS, "home");
  const Page = PAGE_COMPONENTS[page];

  return (
    <div className="shell">
      <Header currentPage={page} />
      <Page />
      <Footer />
      <RetroScrollbar />
    </div>
  );
}
