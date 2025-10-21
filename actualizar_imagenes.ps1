$filePath = "semana02/index.html"

# Hacer una copia de seguridad
$backupPath = "$filePath.bak"
Copy-Item -Path $filePath -Destination $backupPath -Force

# Leer el contenido actual
$content = Get-Content -Path $filePath -Raw

# 1. Actualizar sección de retos
$retosSection = @"
            <!-- Retos Section -->
            <section class="content-section">
                <h2>Retos Propuestos</h2>
                <div class="retos-grid">
                    <div class="reto-card">
                        <img src="imagenes/retos/reto1-ergonomia.jpg" alt="Herramientas ergonómicas" class="reto-image">
                        <h3>Reto 1</h3>
                        <p>¿Cómo podríamos diseñar herramientas ergonómicas que reduzcan la fatiga y riesgo de lesiones en trabajos de manufactura?</p>
                    </div>
                    <div class="reto-card">
                        <img src="imagenes/retos/reto2-compostaje.jpg" alt="Compostaje en espacios reducidos" class="reto-image">
                        <h3>Reto 2</h3>
                        <p>¿Cómo podríamos incentivar la compostación de residuos orgánicos en espacios reducidos, promoviendo la reducción de desechos y el cuidado del medioambiente?</p>
                    </div>
                    <div class="reto-card">
                        <img src="imagenes/retos/reto3-realidad-mixta.jpg" alt="Entorno de realidad mixta" class="reto-image">
                        <h3>Reto 3</h3>
                        <p>¿Cómo podríamos crear un entorno de realidad mixta que permita a varios operadores, supervisores y mecánicos colaborar en tiempo real, entrenando conjuntamente en la operación y mantenimiento de grúas u otro equipo especializado?</p>
                    </div>
                    <div class="reto-card selected">
                        <img src="imagenes/retos/reto4-realidad-mixta-equipos.jpg" alt="Colaboración en tiempo real" class="reto-image">
                        <h3>Reto 4 - ELEGIDO</h3>
                        <p>¿Cómo podríamos crear un entorno de realidad mixta que permita a varios operadores, supervisores y mecánicos colaborar en tiempo real, entrenando conjuntamente en la operación y mantenimiento de grúas u otro equipo especializado?</p>
                        <div class="selected-badge"><i class="bi bi-check-circle-fill"></i> SELECCIONADO</div>
                    </div>
                </div>
            </section>
"@

# 2. Actualizar sección de equipo
$equipoSection = @"
            <!-- Team Section -->
            <section class="content-section">
                <h2>Integrantes del Equipo</h2>
                <div class="team-list">
                    <div class="team-member">
                        <img src="imagenes/equipo/equipo.jpg" alt="Equipo de trabajo" class="team-photo">
                        <div class="team-details">
                            <span class="member-name">Piero Fabrizzio De la Cruz Palpa</span>
                            <span class="member-role">Líder de Proyecto</span>
                        </div>
                    </div>
                    <div class="team-member">
                        <img src="imagenes/equipo/elver.jpg" alt="Elver Cholan" class="team-photo">
                        <div class="team-details">
                            <span class="member-name">Cholan Garcia Elver Antony</span>
                            <span class="member-role">Desarrollador Principal</span>
                        </div>
                    </div>
                    <div class="team-member">
                        <img src="imagenes/equipo/santiago.jpg" alt="Santiago Salas" class="team-photo">
                        <div class="team-details">
                            <span class="member-name">Salas Perez Santiago Agustin</span>
                            <span class="member-role">Especialista en Hardware</span>
                        </div>
                    </div>
                </div>
            </section>
"@

# 3. Actualizar sección de problema
$problemaSection = @"
            <!-- Problem Definition -->
            <section class="content-section">
                <h2>Problema y Contexto</h2>
                <div class="problem-content">
                    <div class="problem-images">
                        <img src="imagenes/problema/lesiones.jpg" alt="Lesiones por movimientos repetitivos" class="problem-image">
                        <img src="imagenes/problema/estadisticas.jpg" alt="Estadísticas de lesiones" class="problem-image">
                    </div>
                    <p>El uso repetitivo de ciertas actividades genera fatiga muscular y dolor, lo que aumenta el riesgo de desarrollar tendinitis y lesiones por movimientos repetitivos (LER). Esta situación no solo afecta la productividad del trabajador, sino también su calidad de vida. Por lo tanto, existe una necesidad urgente de implementar soluciones ergonómicas efectivas que mitiguen estos problemas.</p>
                    
                    <div class="statistics">
                        <div class="stat-item">
                            <img src="imagenes/problema/estadisticas-dolor.png" alt="Estadísticas de dolor" class="stat-image">
                            <span class="stat-number">68%</span>
                            <span class="stat-label">Jóvenes peruanos con dolor crónico</span>
                        </div>
                        <div class="stat-item">
                            <img src="imagenes/problema/horas-uso.png" alt="Horas de uso" class="stat-image">
                            <span class="stat-number">6+</span>
                            <span class="stat-label">Horas promedio frente al PC</span>
                        </div>
                    </div>
                </div>
            </section>
"@

# 4. Actualizar sección de ideas
$ideasSection = @"
            <!-- Brainstorming Section -->
            <section class="content-section">
                <h2>Ideas del Brainstorming</h2>
                <div class="ideas-grid">
                    <div class="idea-item">
                        <img src="imagenes/ideas/boceto1.jpg" alt="Boceto 1" class="idea-image">
                        <h4>Mango viscoelástico</h4>
                        <p>Para amortiguar presión</p>
                    </div>
                    <div class="idea-item">
                        <img src="imagenes/ideas/boceto2.jpg" alt="Boceto 2" class="idea-image">
                        <h4>Mango ajustable</h4>
                        <p>Con texturas antideslizantes</p>
                    </div>
                    <div class="idea-item">
                        <img src="imagenes/ideas/sensores.jpg" alt="Sensores" class="idea-image">
                        <h4>Sensores de alerta</h4>
                        <p>Sobre fuerza excesiva</p>
                    </div>
                    <div class="idea-item selected">
                        <img src="imagenes/ideas/motor-asistido.jpg" alt="Motor asistido" class="idea-image">
                        <h4>Motor asistido</h4>
                        <p>Para facilitar el giro (BioGrip Assist)</p>
                        <div class="selected-badge">✓ ELEGIDO</div>
                    </div>
                </div>
            </section>
"@

# 5. Actualizar sección de resultados
$resultadosSection = @"
            <!-- Resultados Section -->
            <section class="content-section">
                <h2>Resultados del Proceso</h2>
                <div class="results-gallery">
                    <div class="result-item">
                        <img src="imagenes/resultados/prototipo1.jpg" alt="Prototipo 1" class="result-image">
                        <p>Primer prototipo funcional</p>
                    </div>
                    <div class="result-item">
                        <img src="imagenes/resultados/pruebas.jpg" alt="Pruebas de usuario" class="result-image">
                        <p>Pruebas con usuarios finales</p>
                    </div>
                    <div class="result-item">
                        <img src="imagenes/resultados/resultados.jpg" alt="Resultados" class="result-image">
                        <p>Resultados del prototipo</p>
                    </div>
                </div>
            </section>
"@

# Reemplazar las secciones en el contenido
$content = $content -replace '(?s)<!-- Retos Section -->.*?<\/section>', $retosSection
$content = $content -replace '(?s)<!-- Team Section -->.*?<\/section>', $equipoSection
$content = $content -replace '(?s)<!-- Problem Definition -->.*?<\/section>', $problemaSection
$content = $content -replace '(?s)<!-- Brainstorming Section -->.*?<\/section>', $ideasSection

# Guardar los cambios
$content | Set-Content -Path $filePath -NoNewline

Write-Host "Archivo actualizado exitosamente. Se creó una copia de seguridad en $backupPath"
