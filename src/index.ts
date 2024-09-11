import { app } from "./app";
import { CONFIG } from "./config";

app.listen(CONFIG.PORT, () => {
    console.log("App listening on port ", CONFIG.PORT);
})

