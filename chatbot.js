
/* =========================================
   FR4K3D ASSISTANT
   Chatbot Logic
========================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
} else {
    initChatbot();
}

function initChatbot() {

    // ELEMENTOS
    const toggle = document.getElementById("chatbot-toggle");
    const close = document.getElementById("chatbot-close");
    const windowChat = document.getElementById("chatbot-window");

    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");
    const messages = document.getElementById("chatbot-messages");

    const quickOptions = document.querySelector(".chatbot-quick-options");


    // COMPROBAR QUE EXISTAN LOS ELEMENTOS
    if (!toggle || !close || !windowChat || !form || !input || !messages) {
        console.error("FR4K3D Assistant: No se encontraron todos los elementos.");
        return;
    }


    // =========================================
    // ABRIR Y CERRAR CHATBOT
    // =========================================

    toggle.addEventListener("click", () => {
        windowChat.classList.remove("chatbot-hidden");
        input.focus();
    });

    close.addEventListener("click", () => {
        windowChat.classList.add("chatbot-hidden");
    });


    // =========================================
    // NORMALIZAR TEXTO
    // =========================================

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }


    // =========================================
    // AGREGAR MENSAJES
    // =========================================

    function addMessage(text, sender = "bot", actions = []) {

        const message = document.createElement("div");

        message.classList.add(
            "chatbot-message",
            sender === "user" ? "user-message" : "bot-message",
            "chatbot-new-message"
        );

        message.textContent = text;

        messages.appendChild(message);


        // BOTONES DE ACCIÓN
        if (actions.length > 0) {

            const actionContainer = document.createElement("div");
            actionContainer.classList.add("chatbot-navigation");

            actions.forEach(action => {

                const button = document.createElement("button");

                button.type = "button";
                button.textContent = action.label;

                button.addEventListener("click", () => {

                    if (action.type === "section") {
                        navigateToSection(action.target);
                    }

                    if (action.type === "page") {
                        window.location.href = action.target;
                    }

                    if (action.type === "external") {
                        window.open(action.target, "_blank", "noopener,noreferrer");
                    }

                });

                actionContainer.appendChild(button);

            });

            messages.appendChild(actionContainer);
        }


        // DESPLAZAR HACIA EL ÚLTIMO MENSAJE
        messages.scrollTop = messages.scrollHeight;
    }


    // =========================================
    // NAVEGACIÓN DEL PORTAFOLIO
    // =========================================

    function navigateToSection(sectionId) {

        const section = document.getElementById(sectionId);

        const onHomePage =
            window.location.pathname.endsWith("index.html") ||
            window.location.pathname.endsWith("/");

        if (section && onHomePage) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        } else {

            window.location.href = "./index.html#" + sectionId;

        }

    }


    // =========================================
    // RESPUESTAS DEL CHATBOT
    // =========================================

    function getBotResponse(userText) {

        const text = normalizeText(userText);


        // SALUDOS
        if (
            /\b(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|que tal)\b/.test(text)
        ) {

            return {
                text: "¡Hey! 👋 Qué gusto tenerte por aquí. ¿Qué te gustaría explorar de FR4K3D?",
                actions: [
                    { label: "Ver proyectos", type: "section", target: "proyectos" },
                    { label: "Sobre mí", type: "page", target: "./sobremi.html" }
                ]
            };

        }


        // CAINE
        if (text.includes("caine") || text.includes("digital circus")) {

            return {
                text: "¡Caine! 🎩 Es uno de los proyectos de modelado y creación de personajes 3D que encontrarás en mi portafolio. Puedes explorar el proyecto completo aquí.",
                actions: [
                    {
                        label: "Ver proyecto de Caine ↗",
                        type: "external",
                        target: "https://www.behance.net/gallery/246871469/Caine-Digital-Circus"
                    }
                ]
            };

        }


        // HALCÓN MILENARIO
        if (
            text.includes("halcon") ||
            text.includes("milenario") ||
            text.includes("millennium falcon")
        ) {

            return {
                text: "¡El Millennium Falcon! 🚀 Este proyecto explora el modelado 3D de una nave espacial, con especial atención a sus formas y detalles de hard surface.",
                actions: [
                    { label: "Ver proyectos", type: "section", target: "proyectos" },
                    {
                        label: "Visitar Behance ↗",
                        type: "external",
                        target: "https://www.behance.net/carlorodrigu1"
                    }
                ]
            };

        }


        // LUFFY
        if (text.includes("luffy") || text.includes("gear 5")) {

            return {
                text: "¡Luffy Gear 5! ☀️ Es uno de mis trabajos de ilustración y fan art. Puedes encontrarlo en la sección de proyectos destacados.",
                actions: [
                    { label: "Ver proyectos", type: "section", target: "proyectos" },
                    {
                        label: "Visitar Behance ↗",
                        type: "external",
                        target: "https://www.behance.net/carlorodrigu1"
                    }
                ]
            };

        }


        // NOVA PLAYER
        if (
            text.includes("nova") ||
            text.includes("reproductor") ||
            text.includes("music player")
        ) {

            return {
                text: "¡Nova Player! 🎧 Es un proyecto de diseño de interfaz y desarrollo de una aplicación de escritorio para reproducir música. Combina exploración visual con programación.",
                actions: [
                    {
                        label: "Ver Nova Player ↗",
                        type: "external",
                        target: "https://www.behance.net/gallery/251133911/NOVA-PLAYER-EN-PROCESO"
                    }
                ]
            };

        }


        // UX/UI
        if (
            text.includes("ux") ||
            text.includes("ui") ||
            text.includes("experiencia de usuario") ||
            text.includes("interfaz")
        ) {

            return {
                text: "También exploro el diseño UX/UI. Me interesa crear interfaces visuales que sean atractivas, claras y fáciles de utilizar.",
                actions: [
                    {
                        label: "Ver proyecto UX/UI ↗",
                        type: "external",
                        target: "https://www.behance.net/gallery/251042941/PORTFOLIO-UXUI"
                    },
                    { label: "Ver experimentos", type: "section", target: "experimentos" }
                ]
            };

        }


        // PROYECTOS 3D
        if (
            text.includes("3d") ||
            text.includes("modelado") ||
            text.includes("modelar") ||
            text.includes("personajes") ||
            text.includes("hard surface")
        ) {

            return {
                text: "¡El 3D es una de las áreas que más me interesa explorar! 🎨 En mis proyectos encontrarás trabajos de modelado de personajes y objetos, además de experimentación visual.",
                actions: [
                    { label: "Explorar proyectos 3D", type: "section", target: "proyectos" }
                ]
            };

        }


        // ANIMACIÓN 2D
        if (
            text.includes("animacion") ||
            text.includes("2d") ||
            text.includes("motion graphics")
        ) {

            return {
                text: "La animación y el movimiento son parte importante de mis intereses creativos. Me gusta explorar cómo dar vida a ideas mediante recursos visuales y narrativos. Puedes conocer más sobre mi trabajo en el portafolio.",
                actions: [
                    { label: "Explorar proyectos", type: "section", target: "proyectos" },
                    { label: "Conocerme", type: "page", target: "./sobremi.html" }
                ]
            };

        }


        // CONCEPT ART E ILUSTRACIÓN
        if (
            text.includes("concept art") ||
            text.includes("ilustracion") ||
            text.includes("dibujo") ||
            text.includes("arte")
        ) {

            return {
                text: "¡La exploración artística también forma parte de FR4K3D! ✏️ Me interesa desarrollar ideas mediante ilustración, diseño de personajes y exploración visual.",
                actions: [
                    { label: "Ver proyectos", type: "section", target: "proyectos" }
                ]
            };

        }


        // PROGRAMAS Y HERRAMIENTAS
        if (
            text.includes("programas") ||
            text.includes("herramientas") ||
            text.includes("software") ||
            text.includes("que utilizas") ||
            text.includes("que usas") ||
            text.includes("maya") ||
            text.includes("blender") ||
            text.includes("adobe")
        ) {

            return {
                text: "Estas son algunas de las herramientas con las que trabajo y experimento:\n\n• Blender\n• Autodesk Maya\n• Adobe Photoshop\n• Adobe Illustrator\n• Adobe After Effects\n• Adobe Premiere Pro\n• Visual Studio Code\n• HTML y CSS\n\n¡Siempre estoy buscando aprender algo nuevo!",
                actions: [
                    { label: "Más sobre mí", type: "page", target: "./sobremi.html" }
                ]
            };

        }


        // PROGRAMACIÓN
        if (
            text.includes("programacion") ||
            text.includes("codigo") ||
            text.includes("desarrollo web") ||
            text.includes("pagina web") ||
            text.includes("web")
        ) {

            return {
                text: "Además del diseño y la animación, me gusta experimentar con programación y desarrollo web. He trabajado con HTML, CSS y JavaScript, y también he desarrollado proyectos como Nova Player.",
                actions: [
                    { label: "Ver experimentos", type: "section", target: "experimentos" }
                ]
            };

        }


        // SOBRE MÍ
        if (
            text.includes("sobre ti") ||
            text.includes("sobre mi") ||
            text.includes("quien eres") ||
            text.includes("quien es") ||
            text.includes("conocerte") ||
            text.includes("tu perfil")
        ) {

            return {
                text: "¡Claro! Soy un estudiante de Diseño Gráfico y Animación interesado en el modelado 3D, la animación, la ilustración y las experiencias digitales. Me gusta experimentar y transformar ideas en proyectos visuales.",
                actions: [
                    { label: "Conocer más sobre mí ↗", type: "page", target: "./sobremi.html" }
                ]
            };

        }


        // CONTACTO
        if (
            text.includes("contacto") ||
            text.includes("contactar") ||
            text.includes("correo") ||
            text.includes("email") ||
            text.includes("colaboracion") ||
            text.includes("trabajar contigo")
        ) {

            return {
                text: "¡Me encantaría conocer tu propuesta! Puedes dirigirte a la sección de contacto del portafolio para encontrar la forma de comunicarte conmigo.",
                actions: [
                    { label: "Ir a contacto", type: "section", target: "contacto" }
                ]
            };

        }


        // BEHANCE
        if (text.includes("behance") || text.includes("portafolio") || text.includes("portfolio")) {

            return {
                text: "¡Por supuesto! Puedes explorar más de mis trabajos y proyectos en Behance.",
                actions: [
                    {
                        label: "Visitar Behance ↗",
                        type: "external",
                        target: "https://www.behance.net/carlorodrigu1"
                    },
                    { label: "Ver proyectos destacados", type: "section", target: "proyectos" }
                ]
            };

        }


        // AGRADECIMIENTOS
        if (
            text.includes("gracias") ||
            text.includes("muchas gracias")
        ) {

            return {
                text: "¡No hay de qué! 😎 Gracias por visitar FR4K3D. ¿Hay algo más que quieras conocer?",
                actions: [
                    { label: "Ver proyectos", type: "section", target: "proyectos" },
                    { label: "Contacto", type: "section", target: "contacto" }
                ]
            };

        }


        // RESPUESTA POR DEFECTO
        return {
            text: "¡Hmm! 🤔 Todavía no tengo una respuesta para eso. Pero puedo ayudarte a conocer mis proyectos, herramientas, habilidades y más sobre FR4K3D.",
            actions: [
                { label: "Proyectos 3D", type: "section", target: "proyectos" },
                { label: "Experimentos", type: "section", target: "experimentos" },
                { label: "Sobre mí", type: "page", target: "./sobremi.html" },
                { label: "Contacto", type: "section", target: "contacto" }
            ]
        };

    }


    // =========================================
    // ENVIAR MENSAJE
    // =========================================

    function sendMessage(text) {

        if (!text.trim()) return;

        // MOSTRAR MENSAJE DEL VISITANTE
        addMessage(text, "user");

        // OCULTAR OPCIONES INICIALES
        if (quickOptions) {
            quickOptions.style.display = "none";
        }

        // OBTENER RESPUESTA
        const response = getBotResponse(text);

        // PEQUEÑA PAUSA ANTES DE RESPONDER
        setTimeout(() => {
            addMessage(response.text, "bot", response.actions);
        }, 450);

    }


    // =========================================
    // FORMULARIO
    // =========================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const text = input.value.trim();

        if (!text) return;

        sendMessage(text);

        input.value = "";
        input.focus();

    });


    // =========================================
    // BOTONES RÁPIDOS
    // =========================================

    document.querySelectorAll(".quick-option").forEach(button => {

        button.addEventListener("click", () => {

            const message = button.dataset.message;

            if (message) {
                sendMessage(message);
            }

        });

    });


    console.log("FR4K3D Assistant iniciado correctamente.");

}
