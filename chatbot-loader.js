
/* =========================================
   FR4K3D ASSISTANT
   CHATBOT LOADER
========================================= */

(async function loadFR4K3DChatbot() {

    try {

        // 1. CARGAR CSS
        const css = document.createElement("link");

        css.rel = "stylesheet";
        css.href = "./chatbot.css";

        document.head.appendChild(css);


        // 2. CARGAR HTML
        const response = await fetch("./chatbot.html");

        if (!response.ok) {
            throw new Error(
                "No se pudo cargar chatbot.html. Estado: " + response.status
            );
        }

        const html = await response.text();


        // 3. INSERTAR HTML EN LA PÁGINA
        const container = document.createElement("div");

        container.innerHTML = html;

        document.body.appendChild(container);


        // 4. CARGAR JAVASCRIPT
        const script = document.createElement("script");

        script.src = "./chatbot.js";
        script.onload = function () {
            console.log("FR4K3D Assistant: JavaScript cargado.");
        };

        script.onerror = function () {
            console.error("FR4K3D Assistant: Error al cargar chatbot.js.");
        };

        document.body.appendChild(script);


        console.log("FR4K3D Assistant: HTML y CSS cargados correctamente.");

    } catch (error) {

        console.error("FR4K3D Assistant: ", error);

    }

})();
