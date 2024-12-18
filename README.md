# Palindrome Checker Project

## **Instalación y Configuración**

### **Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/palindrome-checker.git
cd palindrome-checker
```

### **Configuración del Backend**
1. Accede al directorio del backend:
   ```bash
   cd BE
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea y configura el archivo `.env` en la carpeta del backend con las variables de entorno:
   ```bash
   PORT=3001
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```
   El servidor estará disponible en [http://localhost:3001](http://localhost:3001).

#### **Endpoints del Backend**
- **POST /palindrome**
  - **Body:** `{ "input": "palabra o frase" }`
  - **Respuesta:**
    ```json
    {
      "input": "palabra o frase",
      "isPalindrome": true/false
    }
    ```

- **GET /history**
  - **Respuesta:**
    ```json
    [
      { "input": "palabra o frase"},
      ...
    ]
    ```

### **Configuración del Frontend**
1. Accede al directorio del frontend:
   ```bash
   cd fe
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## **Tecnologías Utilizadas**

### **Backend**
- Node.js
- Express
- TypeScript

### **Frontend**
- Next.js
- React
- Tailwind
- shadcn/ui

