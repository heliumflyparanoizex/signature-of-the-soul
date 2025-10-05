import { useEffect, useRef } from 'react'

/**
 * Componente que visualiza la firma vibracional con geometría sagrada
 * basada en el número de esencia y los números componentes
 */
export function VibrationalVisualization({ signature }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!signature || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Mapeo de números a colores (basado en chakras y numerología)
    const numberColors = {
      1: { primary: '#FF0000', secondary: '#FF6B6B' }, // Rojo - Raíz
      2: { primary: '#FF7F00', secondary: '#FFB366' }, // Naranja - Sacro
      3: { primary: '#FFFF00', secondary: '#FFFF99' }, // Amarillo - Plexo Solar
      4: { primary: '#00FF00', secondary: '#90EE90' }, // Verde - Corazón
      5: { primary: '#0000FF', secondary: '#6B9BFF' }, // Azul - Garganta
      6: { primary: '#4B0082', secondary: '#9370DB' }, // Índigo - Tercer Ojo
      7: { primary: '#9400D3', secondary: '#DA70D6' }, // Violeta - Corona
      8: { primary: '#FF1493', secondary: '#FF69B4' }, // Rosa - Infinito
      9: { primary: '#FFD700', secondary: '#FFF8DC' }, // Dorado - Maestría
      11: { primary: '#C0C0C0', secondary: '#E8E8E8' }, // Plata - Maestro
      22: { primary: '#00CED1', secondary: '#AFEEEE' }, // Turquesa - Constructor
      33: { primary: '#FF00FF', secondary: '#FF77FF' }  // Magenta - Maestro Sanador
    }

    const colors = numberColors[signature.finalVibrationalSignature] || numberColors[1]

    // Dibujar círculos concéntricos (representando capas de la firma)
    const drawConcentricCircles = () => {
      const maxRadius = Math.min(centerX, centerY) - 20
      const numCircles = signature.finalVibrationalSignature

      for (let i = numCircles; i > 0; i--) {
        const radius = (maxRadius / numCircles) * i
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
        
        gradient.addColorStop(0, colors.primary + '40')
        gradient.addColorStop(0.5, colors.secondary + '60')
        gradient.addColorStop(1, colors.primary + '20')

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.strokeStyle = colors.primary + '80'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Dibujar geometría sagrada basada en el número
    const drawSacredGeometry = () => {
      const radius = Math.min(centerX, centerY) - 40
      const points = signature.finalVibrationalSignature

      // Dibujar polígono basado en el número de esencia
      ctx.beginPath()
      for (let i = 0; i <= points; i++) {
        const angle = (Math.PI * 2 * i) / points - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = colors.primary
      ctx.lineWidth = 3
      ctx.stroke()

      // Dibujar líneas internas conectando vértices
      for (let i = 0; i < points; i++) {
        for (let j = i + 1; j < points; j++) {
          const angle1 = (Math.PI * 2 * i) / points - Math.PI / 2
          const angle2 = (Math.PI * 2 * j) / points - Math.PI / 2
          
          const x1 = centerX + radius * Math.cos(angle1)
          const y1 = centerY + radius * Math.sin(angle1)
          const x2 = centerX + radius * Math.cos(angle2)
          const y2 = centerY + radius * Math.sin(angle2)

          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = colors.secondary + '30'
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Dibujar puntos en los vértices
      for (let i = 0; i < points; i++) {
        const angle = (Math.PI * 2 * i) / points - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)

        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = colors.primary
        ctx.fill()
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    // Dibujar círculo central con el número
    const drawCentralCircle = () => {
      const radius = 50

      // Gradiente radial para el círculo central
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, colors.primary)
      gradient.addColorStop(1, colors.secondary)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = 3
      ctx.stroke()

      // Dibujar el número de esencia
      ctx.font = 'bold 48px Arial'
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(signature.finalVibrationalSignature, centerX, centerY)
    }

    // Dibujar números componentes alrededor
    const drawComponentNumbers = () => {
      const components = [
        { label: 'N', value: signature.nameNumber },
        { label: 'A', value: signature.surnameNumber },
        { label: 'V', value: signature.lifePathNumber }
      ]

      const outerRadius = Math.min(centerX, centerY) - 20
      const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]

      components.forEach((comp, index) => {
        const angle = angles[index] - Math.PI / 2
        const x = centerX + outerRadius * Math.cos(angle)
        const y = centerY + outerRadius * Math.sin(angle)

        // Círculo para el número componente
        ctx.beginPath()
        ctx.arc(x, y, 25, 0, Math.PI * 2)
        ctx.fillStyle = colors.secondary + 'CC'
        ctx.fill()
        ctx.strokeStyle = colors.primary
        ctx.lineWidth = 2
        ctx.stroke()

        // Número
        ctx.font = 'bold 20px Arial'
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(comp.value, x, y)
      })
    }

    // Ejecutar las funciones de dibujo
    drawConcentricCircles()
    drawSacredGeometry()
    drawCentralCircle()
    drawComponentNumbers()

  }, [signature])

  if (!signature) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="rounded-lg shadow-2xl"
      />
      <p className="mt-4 text-purple-200 text-sm text-center">
        Geometría Sagrada de tu Firma Vibracional
      </p>
    </div>
  )
}
