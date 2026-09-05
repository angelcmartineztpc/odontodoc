# OdontoDoc · Sistema Clínico Odontológico UJAT DACS

> **Herramienta digital local-first para captura clínica de sillón dental y generación oficial de expedientes odontológicos de la Universidad Juárez Autónoma de Tabasco (División Académica de Ciencias de la Salud - DACS).**

---

## 📋 Resumen del Proyecto

**OdontoDoc** digitaliza el flujo clínico odontológico universitario de la UJAT, permitiendo a estudiantes, pasantes y docentes capturar historias clínicas, notas de evolución y seguimiento operatorio directamente desde el sillón dental en dispositivos móviles o estaciones de escritorio.

- **Arquitectura Local-First (Zero-Backend)**: La información del paciente nunca abandona el dispositivo del operador sin su consentimiento expreso. Cero bases de datos en la nube para máxima privacidad y cumplimiento bioético.
- **Portabilidad `.odonto`**: Exportación e importación de expedientes en un único archivo JSON validado (`.odonto`).
- **Diseño Mobile-First Material Design 3 (M3)**: Ergonomía táctil para captura ágil con guantes en sillón dental, iconografía vectorial oficial (`@mui/icons-material`) y estética institucional UJAT (Verde `#1C8443`, Oro `#FFCC00`, Azul Marino `#002B49`).
- **Formatos Oficiales 1:1 Listos para Impresión**: Réplica fidedigna tamaño Carta de la *Hoja para Notas Médicas de Evolución y Tratamiento* de la Clínica de Odontología UJAT DACS con maquetación de alta fidelidad, escudos vectoriales y campos de firma para docente y alumno.

---

## ✨ Características Principales

1. **Ficha de Identificación Institucional**:
   - Datos del paciente: Nombre completo, edad, sexo, ocupación, teléfono, tutor responsable.
   - Datos del alumno/operador: Nombre, matrícula, semestre, grupo, asignatura clínica y docente titular.

2. **Historia Clínica y Somatometría Dinámica**:
   - Monitoreo de signos vitales: Presión arterial, frecuencia cardíaca, frecuencia respiratoria, temperatura.
   - Medidas antropométricas con cálculo automático de **Índice de Masa Corporal (IMC)** y clasificación por colores de la OMS.
   - Antecedentes heredo-familiares, patológicos y no patológicos.

3. **Captura Fotográfica Clínica en Memoria**:
   - Disparador directo a cámara trasera en dispositivos móviles (`capture="environment"`).
   - Visor de encuadre clínico 16:9 con retículas guía.
   - Pipeline de compresión en Canvas HTML5 (`lib/compression.ts`) que reduce imágenes a máx 1000px y calidad JPEG 0.8 en memoria, liberando `Blob URLs` para evitar fugas de memoria (`URL.revokeObjectURL`).

4. **Diagnóstico y Plan de Tratamiento**:
   - Catálogo integrado de diagnósticos odontológicos CIE-10 y procedimientos dentales estandarizados CDT.
   - Diagnósticos múltiples con selector de certeza (Presuntivo, Confirmado).
   - Presupuesto estimado y desglose de fases clínicas.

5. **Bitácora de Tratamiento y Notas de Evolución**:
   - Registro cronológico de citas y actos operatorios.
   - Estado de pago y folio de recibo oficial.
   - Secciones de firma digital/manuscrita para el docente revisor y el alumno operador.

6. **Generador y Visualizador de Formatos UJAT DACS**:
   - Vista en pantalla idéntica a la hoja física de notas médicas.
   - Selector de modalidad: **Formato con Datos Rellenados** vs. **Formato en Blanco** (para impresión de plantillas físicas).
   - Reglas CSS de impresión (`@media print`) calibradas a escala 1:1 tamaño Carta sin cortes de cabecera ni saltos de página huérfanos.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 16.3.4](https://nextjs.org/) (App Router, Turbopack, `output: 'export'`)
- **Librería UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconografía**: [Material UI Icons (`@mui/icons-material`)](https://mui.com/material-ui/material-icons/)
- **Gestión de Estado**: React Context + Reducer con Single Source of Truth (SSoT)
- **Runtime**: [Bun](https://bun.sh/) / Node.js 20+

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/angelcmartineztpc/odontodoc.git
cd odontodoc

# 2. Instalar dependencias
bun install
# o con npm: npm install

# 3. Iniciar el servidor de desarrollo
bun run dev
# o con npm: npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador móvil o de escritorio.

### Compilación para Producción / PWA

```bash
# Generar la exportación estática en /out
bun run build
```

---

## 🏛️ Identidad Institucional UJAT

- **Institución**: Universidad Juárez Autónoma de Tabasco
- **División**: División Académica de Ciencias de la Salud (DACS)
- **Lema**: *"ESTUDIO EN LA DUDA. ACCIÓN EN LA FE"*
- **Colores Oficiales**:
  - Verde UJAT: `#1C8443`
  - Oro UJAT: `#FFCC00`
  - Marino UJAT: `#002B49`

---

## 📄 Licencia

Desarrollado para la comunidad odontológica y académica de la UJAT DACS.

