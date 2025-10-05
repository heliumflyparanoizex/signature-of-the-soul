import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { calculateVibrationalSignature } from '@/lib/numerology.js'
import { generatePoeticText } from '@/lib/poeticTextGenerator.js'
import { VibrationalVisualization } from '@/components/VibrationalVisualization.jsx'
import logoColor from './assets/logo-color.png'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    day: '',
    month: '',
    year: ''
  })
  
  const [result, setResult] = useState(null)
  const [poeticText, setPoeticText] = useState("")
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido'
    }
    
    const day = parseInt(formData.day, 10)
    if (!formData.day || isNaN(day) || day < 1 || day > 31) {
      newErrors.day = 'Día inválido (1-31)'
    }
    
    const month = parseInt(formData.month, 10)
    if (!formData.month || isNaN(month) || month < 1 || month > 12) {
      newErrors.month = 'Mes inválido (1-12)'
    }
    
    const year = parseInt(formData.year, 10)
    if (!formData.year || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      newErrors.year = `Año inválido (1900-${new Date().getFullYear()})`
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const signature = calculateVibrationalSignature(
        formData.firstName,
        formData.lastName,
        parseInt(formData.day, 10),
        parseInt(formData.month, 10),
        parseInt(formData.year, 10)
      )
      setResult(signature)

      // Generar texto poético (usando placeholders por ahora)
      const generatedPoeticText = generatePoeticText(
        signature,
        `el ${formData.firstName.trim()}`, // Placeholder para significado del nombre
        `el ${formData.lastName.trim()}`, // Placeholder para significado del apellido
        `tu búsqueda de ${signature.lifePathNumber === 7 ? 'la verdad' : 'tu propósito'}` // Placeholder para significado de ruta de vida
      )
      setPoeticText(generatedPoeticText)

    } catch (error) {
      console.error('Error calculating signature:', error)
      setErrors({ general: 'Error al calcular la firma vibracional. Por favor, verifica los datos.' })
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      day: '',
      month: '',
      year: ''
    })
    setResult(null)
    setPoeticText("")
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header con Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <img 
            src={logoColor} 
            alt="Signature of the Soul" 
            className="w-48 h-48 mx-auto mb-4 drop-shadow-2xl"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">
            Signature of the Soul
          </h1>
          <p className="text-purple-200 text-lg">
            Descubre tu Firma Vibracional
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulario */}
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Datos Personales</CardTitle>
              <CardDescription className="text-purple-200">
                Ingresa tu información para calcular tu firma vibracional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">Primer Nombre</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ej: Ana"
                    className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                  />
                  {errors.firstName && (
                    <p className="text-red-300 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Apellido</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Ej: Torres"
                    className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                  />
                  {errors.lastName && (
                    <p className="text-red-300 text-sm">{errors.lastName}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="day" className="text-white">Día</Label>
                    <Input
                      id="day"
                      name="day"
                      type="number"
                      min="1"
                      max="31"
                      value={formData.day}
                      onChange={handleInputChange}
                      placeholder="23"
                      className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                    />
                    {errors.day && (
                      <p className="text-red-300 text-xs">{errors.day}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="month" className="text-white">Mes</Label>
                    <Input
                      id="month"
                      name="month"
                      type="number"
                      min="1"
                      max="12"
                      value={formData.month}
                      onChange={handleInputChange}
                      placeholder="10"
                      className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                    />
                    {errors.month && (
                      <p className="text-red-300 text-xs">{errors.month}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-white">Año</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="1990"
                      className="bg-white/20 border-white/30 text-white placeholder:text-purple-200"
                    />
                    {errors.year && (
                      <p className="text-red-300 text-xs">{errors.year}</p>
                    )}
                  </div>
                </div>

                {errors.general && (
                  <p className="text-red-300 text-sm">{errors.general}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  >
                    Calcular Firma
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleReset}
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Limpiar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Resultado */}
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Tu Firma Vibracional</CardTitle>
              <CardDescription className="text-purple-200">
                {result ? 'Números de tu esencia' : 'Los resultados aparecerán aquí'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center p-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg border border-white/20">
                    <p className="text-purple-200 text-sm mb-2">Firma Vibracional</p>
                    <p className="text-7xl font-bold text-white mb-2">
                      {result.finalVibrationalSignature}
                    </p>
                    <p className="text-purple-200 text-sm">Número de Esencia</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-3xl font-bold text-white">{result.nameNumber}</p>
                      <p className="text-purple-200 text-xs mt-1">Nombre</p>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-3xl font-bold text-white">{result.surnameNumber}</p>
                      <p className="text-purple-200 text-xs mt-1">Apellido</p>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-3xl font-bold text-white">{result.lifePathNumber}</p>
                      <p className="text-purple-200 text-xs mt-1">Ruta de Vida</p>
                    </div>
                  </div>

                  {/* Visualización Artística */}
                  <div className="mt-6">
                    <VibrationalVisualization signature={result} />
                  </div>

                  <div className="text-center text-purple-200 text-sm">
                    <p>Tu firma vibracional es única y representa la esencia de tu ser.</p>
                  </div>

                  {poeticText && (
                    <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20 text-purple-100 text-justify animate-fade-in">
                      <div dangerouslySetInnerHTML={{ __html: poeticText.replace(/\n/g, '<br/>') }} />
                    </div>
                  )}

                  <div className="text-center text-purple-200 text-sm mt-4">
                    <p>Próximamente: Significado completo, piedras, animales y elementos.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-purple-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p>Completa el formulario para descubrir tu firma vibracional</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-purple-200 text-sm">
          <p>© 2025 Signature of the Soul. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}

export default App
