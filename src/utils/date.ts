export function formatFullDate(timestamp: number): string | null {
  const date = new Date(timestamp);
  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0");
  const anio = date.getFullYear();
  const hora = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  return `${dia}/${mes}/${anio}, ${hora}:${minutos} hs`;
}
