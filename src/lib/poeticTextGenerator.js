/**
 * Genera un texto poético personalizado basado en la firma vibracional y los significados.
 * 
 * @param {object} signatureData - Diccionario con los números de la firma vibracional (nameNumber, surnameNumber, lifePathNumber, finalVibrationalSignature).
 * @param {string} nameMeaning - Significado poético o clave del nombre.
 * @param {string} surnameMeaning - Significado poético o clave del apellido.
 * @param {string} lifePathMeaning - Significado poético o clave del número de ruta de vida.
 * @returns {string} - El texto poético generado.
 */
export function generatePoeticText(signatureData, nameMeaning, surnameMeaning, lifePathMeaning) {
  const finalSignature = signatureData.finalVibrationalSignature;
  const nameNum = signatureData.nameNumber;
  const surnameNum = signatureData.surnameNumber;
  const lifePathNum = signatureData.lifePathNumber;

  // Temas poéticos asociados a cada número de esencia
  const themes = {
    1: {
      title: "El Pionero Luminoso",
      essence: "Eres la chispa original, la voluntad que inicia, el faro que guía en la oscuridad. Tu esencia resuena con la individualidad, la valentía y el liderazgo innato. Naciste para abrir caminos y manifestar lo nuevo.",
      keywords: ["inicio", "liderazgo", "innovación", "independencia", "coraje", "voluntad"],
    },
    2: {
      title: "El Tejedor Armónico",
      essence: "Tu espíritu es un puente, un conector de almas y un buscador de equilibrio. La dualidad se armoniza en tu presencia, y tu don es la cooperación, la diplomacia y la sensibilidad. Eres el reflejo de la unión y la paz.",
      keywords: ["cooperación", "armonía", "diplomacia", "sensibilidad", "unión", "paz"],
    },
    3: {
      title: "El Creador Vibrante",
      essence: "La expresión de la alegría y la creatividad fluye a través de ti. Eres un canal de inspiración, un comunicador nato y un optimista incansable. Tu presencia irradia luz y tu propósito es embellecer el mundo con tu arte y tu entusiasmo.",
      keywords: ["creatividad", "expresión", "alegría", "comunicación", "optimismo", "inspiración"],
    },
    4: {
      title: "El Constructor Firme",
      essence: "Con cimientos sólidos y una visión clara, construyes el futuro con disciplina y dedicación. Eres la estabilidad, la organización y la perseverancia encarnada. Tu labor es fundamental para dar forma a la realidad y asegurar la estructura.",
      keywords: ["estabilidad", "orden", "trabajo duro", "disciplina", "fundamento", "seguridad"],
    },
    5: {
      title: "El Espíritu Libre",
      essence: "La aventura te llama y la libertad es tu bandera. Eres el cambio, la adaptabilidad y la búsqueda constante de nuevas experiencias. Tu energía es dinámica y tu misión es explorar, aprender y vivir sin ataduras.",
      keywords: ["libertad", "aventura", "cambio", "adaptabilidad", "exploración", "experiencia"],
    },
    6: {
      title: "El Guardián Compasivo",
      essence: "Tu corazón es un refugio de amor y responsabilidad. Eres el cuidador, el sanador y el protector de tu comunidad. La armonía familiar y el servicio desinteresado son tus guías. Tu alma nutre y embellece todo lo que toca.",
      keywords: ["amor", "responsabilidad", "servicio", "familia", "compasión", "sanación"],
    },
    7: {
      title: "El Buscador de la Verdad",
      essence: "La profundidad del conocimiento y la sabiduría interior te llaman. Eres el analista, el místico y el contemplativo. Tu mente busca la verdad más allá de lo aparente y tu camino es la introspección y el descubrimiento de los misterios del universo.",
      keywords: ["sabiduría", "conocimiento", "introspección", "misterio", "análisis", "verdad"],
    },
    8: {
      title: "El Maestro del Poder",
      essence: "La abundancia y el poder se manifiestan a través de tu visión y tu capacidad de gestión. Eres el líder natural, el estratega y el realizador de grandes proyectos. Tu propósito es materializar el éxito y usar tu influencia para el bien mayor.",
      keywords: ["poder", "abundancia", "éxito", "liderazgo", "gestión", "materialización"],
    },
    9: {
      title: "El Alma Universal",
      essence: "Tu espíritu abarca la compasión y el servicio a la humanidad. Eres el humanitario, el visionario y el que completa ciclos. Tu sabiduría es profunda y tu misión es inspirar a otros a través de tu ejemplo de amor incondicional y altruismo.",
      keywords: ["humanitarismo", "compasión", "altruismo", "sabiduría", "finalización", "universalidad"],
    },
  };

  const theme = themes[finalSignature] || themes[1]; // Fallback a 1 si el número no está mapeado

  const poeticText = `
**La Firma Vibracional de ${nameMeaning} ${surnameMeaning}**

En el tejido cósmico de la existencia, tu esencia resplandece con la vibración del número ${finalSignature}, el ${theme.title}.
${theme.essence}

Tu nombre, un eco de ${nameMeaning}, te imbuye de una cualidad de ${nameNum}. 
Tu linaje, resonando con ${surnameMeaning}, te otorga la fuerza de ${surnameNum}. 
Y tu sendero de vida, marcado por el número ${lifePathNum}, te guía hacia ${lifePathMeaning}.

Esta es la melodía de tu alma, una sinfonía de ${theme.keywords[0]}, ${theme.keywords[1]} y ${theme.keywords[2]}.
Que esta revelación te impulse a vivir en plena armonía con tu verdadero ser.
`;
  return poeticText;
}

