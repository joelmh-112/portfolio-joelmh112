import type { Project } from "@/models/Project";

export const projects :Project[] = [
        {
          id: 1,
          title: "Olyverse",
          description:
            "Olyverse es una plataforma de contenido digital desarrollada con NextJS y Laravel. Esta plataforma trae estrellas de distintos ámbitos como Álvaro Morte, Kerem Bürsin, entre otros, para que compartan sus conocimientos con la comunidad.",
          longDescription: `<p>Olyverse es una plataforma de contenido digital desarrollada con NextJS y Laravel. Esta plataforma trae estrellas de distintos ámbitos como Álvaro Morte, Kerem Bürsin, entre otros, para que compartan sus conocimientos con la comunidad.</p>
            <p>Este proyecto está formado de "4 partes":</p>
            <ul class="list-disc list-inside ml-2"><li>La plataforma web + "api web" desarrolladas con NextJS y Typescript.</li>
                <li>La api real desarrollada con Laravel.</li>
                <li>Un scheduler para ayudar a la api con segun que tareas, también desarrollado con Laravel.</li>
                <li>Un backoffice para que el cliente pueda gestionar el contenido y algunos flujos de la plataforma, desarrollado con Laravel.</li>       
              `,
          tags: ["Typescript", "NextJS", "Laravel"],
          image: "/images/olyverse.webp",
          imageAlt: "Imagen donde se ve la página de inicio de olyverse.com",
          link: "https://olyverse.com",
        },
        {
          id: 2,
          title: "Navegamenorca",
          description:
            "Navegamenorca es una plataforma para reservar excursiones en barca en la isla de Menorca. Esta plataforma fue desarrollada completamente con NextJS.",
          longDescription:
            "Navegamenorca es una plataforma para reservar excursiones en barca en la isla de Menorca. Esta plataforma fue desarrollada completamente con NextJS.",
          tags: ["Typescript", "NextJS", "TailwindCSS"],
          image: "/images/navegamenorca.webp",
          imageAlt: "Imagen donde se ve la página de inicio de navegamenorca.com",
          link: "https://navegamenorca.com",
        },
        {
          id: 3,
          title: "ERPs",
          description:
            "He desarrollado varios ERPs para distintas empresas. Estos ERPs han utilizado Laravel y alguna integración con ReactJS. Entre ellos destacan, una asociación hotelera y una inmobiliaria/alquiler vacacional.",
          longDescription:
            "He desarrollado varios ERPs para distintas empresas. Estos ERPs han utilizado Laravel y alguna integración con ReactJS. Entre ellos destacan, una asociación hotelera y una inmobiliaria/alquiler vacacional.",
          tags: ["Laravel", "ReactJS"],
          image: "/images/erp.webp",
          imageAlt: "Imagen donde se ve la página de inicio de un ERP",
        },
      ];