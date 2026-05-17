# Imagem leve do Node
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos e instala dependências
COPY package*.json ./
RUN npm install

# Copia o código fonte
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# O Vite precisa da flag --host para rodar no Docker
CMD ["npm", "run", "dev", "--", "--host"]