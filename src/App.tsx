import ColumnDnd from "./ColumnDnd";
import { ClickProvider } from "./Context/ClickContext";

import Editor from "./Editor/container";
function App() {
  return (
    <ClickProvider>
    <Editor />
    <ColumnDnd/>
    {/* <test/> */}
    </ClickProvider>
  );
}

export default App;
