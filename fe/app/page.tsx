"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ input: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkPalindrome = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);

    if (!input.trim()) {
      setError("Por favor, ingresa una palabra.");

      return;
    }

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const resp = await axios.post(`${baseUrl}/api/palindrome`, { input });
      if (resp?.data?.isPalindrome) {
        toast.success(`La palabra ${resp.data.input} es un palíndromo`);
      } else {
        toast.error(`La palabra ${resp.data.input} no es un palíndromo`);
      }

      setInput("");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Error al conectar con el servidor"
      );
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const historyResponse = await axios.get(`${baseUrl}/api/history`);
        setHistory(historyResponse.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Error al conectar con el servidor"
        );
        console.error("Error:", error);
      }
    };

    fetchHistory();
  }, [input]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl flex flex-col gap-6">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8" onSubmit={checkPalindrome}>
              <div className="grid gap-2 mb-2">
                <Input
                  id="palabra"
                  type="text"
                  placeholder="Ingresa una palabra"
                  value={input}
                  required
                  onChange={(e) => setInput(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <Button type="submit">Verificar</Button>
            </form>

            <div className="relative  bg-muted md:block">
              <Table>
                <TableCaption>Lista de palíndromos.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Palabras</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.input}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    </div>
  );
}
