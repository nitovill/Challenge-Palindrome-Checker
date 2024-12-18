import { Router, Request, Response } from "express";

const router = Router();

const history: { input: string }[] = [];

// Función para verificar si una cadena es un palíndromo
const isPalindrome = (str: string): boolean => {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanStr === cleanStr.split("").reverse().join("");
};

// Controlador para /palindrome
const palindromeController = (req: Request, res: Response): any => {
  try {
    const { input } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({ error: "Invalid input" });
    }

    const result = isPalindrome(input);
    result && history.push({ input });

    return res.status(200).json({ input, isPalindrome: result });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controlador para /history
const historyController = (_: Request, res: Response): void => {
  res.json(history);
};

// Ruta para verificar palíndromos
router.post("/palindrome", palindromeController);
// Ruta para obtener lista de palíndromos
router.get("/history", historyController);

export default router;
