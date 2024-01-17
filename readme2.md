# Notas de comandos node.js
- npm init --> Inicia un proyecto de Node.JS
- npm install "nombredelmodulo" --save --> Instala y guarda el módulo de Node.JS
- instalar el módulo de nodemon para que se actualizen los cambios que realizemos en el momento sin necesidad de relanzar el server:
    npm install nodemon --save-dev

        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "start": "node nombredelarchivo.js",
            "dev": "nodemon --watch . nombredelarchivo.js"
        },
    npm run dev --> para ejecutar el modo dev y que se actualize de manera automatica