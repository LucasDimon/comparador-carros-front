# Usa uma imagem leve do Node
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o resto do código do frontend
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Inicia o Vite expondo para a rede do Docker
CMD ["npm", "run", "dev", "--", "--host"]