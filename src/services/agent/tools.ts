// src/services/agent/tools.ts
import type { ChatCompletionTool } from "openai/resources/chat/completions";

/**
 * Definición de las herramientas disponibles para el agente
 */
export const agentTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "obtenerInmueblesActivos",
      description:
        "Obtiene una lista de todos los inmuebles que están activos y disponibles para venta, compra o alquiler. Puede filtrar por tipo de inmueble, tipo de transacción, ubicación, precio y características.",
      parameters: {
        type: "object",
        properties: {
          tipoInmueble: {
            type: "string",
            description:
              "Tipo de inmueble a buscar: Casa, Apartamento, Chalet, Dúplex, Piso, o vacío para todos",
          },
          tipoTransaccion: {
            type: "string",
            description: "Tipo de transacción: Venta, Alquiler, o vacío para todos",
          },
          ubicacionQuery: {
            type: "string",
            description: "Ciudad o zona a buscar, ej: Madrid, Salamanca",
          },
          precioMax: {
            type: "number",
            description: "Precio máximo en la moneda local",
          },
          habitacionesMin: {
            type: "number",
            description: "Número mínimo de habitaciones",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "obtenerDetalleInmueble",
      description:
        "Obtiene los detalles completos de un inmueble específico por su ID, incluyendo características, imágenes y ubicación exacta.",
      parameters: {
        type: "object",
        properties: {
          inmuebleId: {
            type: "string",
            description: "El ID del inmueble a consultar",
          },
        },
        required: ["inmuebleId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calcularROI",
      description:
        "Calcula el Retorno de la Inversión (ROI) para un inmueble. Útil para determinar la ganancia potencial de una inversión inmobiliaria.",
      parameters: {
        type: "object",
        properties: {
          precioCompra: {
            type: "number",
            description: "El precio de compra original del inmueble",
          },
          precioVenta: {
            type: "number",
            description: "El precio de venta actual o estimado del inmueble",
          },
        },
        required: ["precioCompra", "precioVenta"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "calcularHipoteca",
      description:
        "Calcula la cuota mensual estimada de una hipoteca dado el precio del inmueble, entrada inicial, tasa de interés y plazo.",
      parameters: {
        type: "object",
        properties: {
          precioInmueble: {
            type: "number",
            description: "Precio total del inmueble",
          },
          entradaInicial: {
            type: "number",
            description: "Cantidad de entrada inicial (enganche)",
          },
          tasaInteresAnual: {
            type: "number",
            description: "Tasa de interés anual en porcentaje (ej: 3.5 para 3.5%)",
          },
          plazoAnios: {
            type: "number",
            description: "Plazo del préstamo en años",
          },
        },
        required: ["precioInmueble", "entradaInicial", "tasaInteresAnual", "plazoAnios"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "obtenerTiposDisponibles",
      description:
        "Obtiene los tipos de inmuebles y tipos de transacciones disponibles en el sistema para informar al usuario qué opciones tiene.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];

/**
 * System prompt para el agente inmobiliario
 */
export const AGENT_SYSTEM_PROMPT = `Eres Laura, una agente de bienes raíces experta y muy profesional de CasaIdeal Inmobiliaria.

PERSONALIDAD:
- Eres amable, profesional y empática
- Tienes amplio conocimiento del mercado inmobiliario
- Te expresas de forma clara y concisa
- Usas un tono cálido pero profesional

REGLAS DE CONVERSACIÓN:
1. En tu primer mensaje, preséntate brevemente y pregunta cómo puedes ayudar
2. Pregunta el nombre del usuario para personalizar la conversación
3. Mantén el contexto y la intención del usuario durante toda la conversación
4. Usa las herramientas disponibles para dar información precisa y actualizada
5. No menciones aspectos técnicos como "herramientas" o "funciones" al usuario
6. No uses asteriscos ni markdown excesivo, usa lenguaje natural
7. Si el usuario pregunta por propiedades, usa obtenerInmueblesActivos con los filtros apropiados
8. Si necesitas detalles de una propiedad específica, usa obtenerDetalleInmueble
9. Ofrece calcular ROI o hipoteca cuando sea relevante para ayudar en la decisión

CAPACIDADES:
- Buscar inmuebles con filtros (tipo, ubicación, precio, habitaciones)
- Ver detalles completos de propiedades
- Calcular ROI de inversiones
- Estimar cuotas de hipoteca
- Asesorar sobre el mercado inmobiliario

Responde siempre en español.`;
