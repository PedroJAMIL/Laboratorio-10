# Documentación de APIs Seleccionadas - Lab 10

## APIs Seleccionadas

### 1. Rick and Morty API
### 2. Pokémon API (PokéAPI)

---

##  RICK AND MORTY API

###  Información General
- **Base URL**: `https://rickandmortyapi.com/api`
- **Tipo**: REST API
- **Autenticación**: No requiere autenticación
- **Formato**: JSON
- **Total de personajes**: 826+

###  Endpoints Principales

#### 1.1 Obtener todos los personajes
**Endpoint**: `GET https://rickandmortyapi.com/api/character`

**Parámetros REQUEST (Query Parameters - Opcionales)**:
- `page` (integer): Número de página (por defecto: 1)
- `name` (string): Filtrar por nombre
- `status` (string): Filtrar por estado (`alive`, `dead`, `unknown`)
- `species` (string): Filtrar por especie
- `type` (string): Filtrar por tipo
- `gender` (string): Filtrar por género (`female`, `male`, `genderless`, `unknown`)

**Ejemplo REQUEST**:
```javascript
// Todos los personajes (página 1)
GET https://rickandmortyapi.com/api/character

// Filtrado por nombre y estado
GET https://rickandmortyapi.com/api/character/?name=rick&status=alive

// Página específica
GET https://rickandmortyapi.com/api/character/?page=2
```

**Estructura RESPONSE**:
```json
{
  "info": {
    "count": 826,           // Total de personajes
    "pages": 42,            // Total de páginas
    "next": "https://rickandmortyapi.com/api/character/?page=2",  // URL siguiente página
    "prev": null            // URL página anterior
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",    // Alive, Dead, unknown
      "species": "Human",
      "type": "",
      "gender": "Male",     // Male, Female, Genderless, unknown
      "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Earth (Replacement Dimension)",
        "url": "https://rickandmortyapi.com/api/location/20"
      },
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2"
      ],
      "url": "https://rickandmortyapi.com/api/character/1",
      "created": "2017-11-04T18:48:46.250Z"
    }
  ]
}
```

#### 1.2 Obtener un personaje específico
**Endpoint**: `GET https://rickandmortyapi.com/api/character/{id}`

**Parámetros REQUEST**:
- `id` (integer): ID del personaje (en la URL)

**Ejemplo REQUEST**:
```javascript
GET https://rickandmortyapi.com/api/character/2
```

**Estructura RESPONSE**:
```json
{
  "id": 2,
  "name": "Morty Smith",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": { "name": "Earth", "url": "..." },
  "location": { "name": "Earth", "url": "..." },
  "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  "episode": ["..."],
  "url": "https://rickandmortyapi.com/api/character/2",
  "created": "2017-11-04T18:50:21.651Z"
}
```

#### 1.3 Obtener múltiples personajes
**Endpoint**: `GET https://rickandmortyapi.com/api/character/[1,2,3]`

**Parámetros REQUEST**:
- `ids` (array): Lista de IDs separados por coma en la URL

**Ejemplo REQUEST**:
```javascript
GET https://rickandmortyapi.com/api/character/1,2,3
```

**RESPONSE**: Array de objetos de personajes

---

##  POKÉMON API (PokéAPI)

###  Información General
- **Base URL**: `https://pokeapi.co/api/v2`
- **Tipo**: REST API
- **Autenticación**: No requiere autenticación
- **Formato**: JSON
- **Total de Pokémon**: 1000+

###  Endpoints Principales

#### 2.1 Obtener lista de Pokémon
**Endpoint**: `GET https://pokeapi.co/api/v2/pokemon`

**Parámetros REQUEST (Query Parameters - Opcionales)**:
- `limit` (integer): Cantidad de resultados por página (por defecto: 20)
- `offset` (integer): Offset para paginación (por defecto: 0)

**Ejemplo REQUEST**:
```javascript
// Primeros 20 Pokémon
GET https://pokeapi.co/api/v2/pokemon

// 50 Pokémon desde el offset 100
GET https://pokeapi.co/api/v2/pokemon?limit=50&offset=100

// Primeros 151 Pokémon (Generación 1)
GET https://pokeapi.co/api/v2/pokemon?limit=151
```

**Estructura RESPONSE**:
```json
{
  "count": 1281,          // Total de Pokémon
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }
  ]
}
```

#### 2.2 Obtener detalle completo de un Pokémon
**Endpoint**: `GET https://pokeapi.co/api/v2/pokemon/{id or name}`

**Parámetros REQUEST**:
- `id` (integer) o `name` (string): ID o nombre del Pokémon (en la URL)

**Ejemplo REQUEST**:
```javascript
// Por ID
GET https://pokeapi.co/api/v2/pokemon/25

// Por nombre
GET https://pokeapi.co/api/v2/pokemon/pikachu
```

**Estructura RESPONSE** (información más relevante):
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,              // En decímetros (0.4m)
  "weight": 60,             // En hectogramos (6.0kg)
  "base_experience": 112,
  "abilities": [
    {
      "ability": {
        "name": "static",
        "url": "https://pokeapi.co/api/v2/ability/9/"
      },
      "is_hidden": false,
      "slot": 1
    }
  ],
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    "back_default": "...",
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      }
    }
  },
  "stats": [
    {
      "base_stat": 35,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "..."
      }
    },
    {
      "base_stat": 55,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "..."
      }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "species": {
    "name": "pikachu",
    "url": "https://pokeapi.co/api/v2/pokemon-species/25/"
  }
}
```

#### 2.3 Obtener información de especies (para descripción)
**Endpoint**: `GET https://pokeapi.co/api/v2/pokemon-species/{id}`

**Parámetros REQUEST**:
- `id` (integer): ID del Pokémon

**Ejemplo REQUEST**:
```javascript
GET https://pokeapi.co/api/v2/pokemon-species/25
```

**Estructura RESPONSE** (información relevante):
```json
{
  "id": 25,
  "name": "pikachu",
  "flavor_text_entries": [
    {
      "flavor_text": "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
      "language": {
        "name": "en",
        "url": "..."
      },
      "version": {
        "name": "red",
        "url": "..."
      }
    }
  ],
  "genera": [
    {
      "genus": "Mouse Pokémon",
      "language": {
        "name": "en",
        "url": "..."
      }
    }
  ],
  "generation": {
    "name": "generation-i",
    "url": "..."
  }
}
```

---

##  Comparación de las APIs

| Característica | Rick and Morty API | Pokémon API |
|----------------|-------------------|-------------|
| Total de elementos | 826+ personajes | 1281+ Pokémon |
| Paginación | 20 por página | Configurable (limit) |
| Filtros |  Por nombre, status, species, gender |  Solo list/detail |
| Imágenes |  Directas en response |  Múltiples sprites |
| Información adicional | Location, episodes | Stats, abilities, types |
| Complejidad | Baja | Media |

---

##  Estrategia de Implementación

### Para Rick and Morty:
1. Crear función para obtener lista paginada con filtros
2. Mostrar cards con: imagen, nombre, especie, estado, ubicación
3. Implementar búsqueda por nombre
4. Implementar filtros por status y gender

### Para Pokémon:
1. Crear función para obtener lista inicial (primera generación)
2. Para cada Pokémon en la lista, hacer petición individual para obtener detalles
3. Mostrar cards con: imagen, nombre, tipos, stats básicos
4. Implementar paginación manual con limit/offset
5. (Opcional) Implementar búsqueda por nombre

### Tecnologías a usar:
- **jQuery**: Para manipulación del DOM y Ajax
- **Ajax ($.ajax o $.get)**: Para peticiones asíncronas
- **Bootstrap o CSS custom**: Para estilos responsivos
- **JavaScript vanilla**: Para lógica adicional

---

##  Ejemplos de código Ajax con jQuery

### Rick and Morty - Obtener personajes
```javascript
$.ajax({
    url: 'https://rickandmortyapi.com/api/character',
    method: 'GET',
    data: {
        page: 1,
        name: 'rick',
        status: 'alive'
    },
    success: function(data) {
        console.log(data.results);
        // Manipular DOM con data.results
    },
    error: function(error) {
        console.error('Error:', error);
    }
});
```

### Pokémon - Obtener lista y detalles
```javascript
// 1. Obtener lista
$.get('https://pokeapi.co/api/v2/pokemon?limit=20', function(data) {
    data.results.forEach(pokemon => {
        // 2. Obtener detalles de cada Pokémon
        $.get(pokemon.url, function(details) {
            console.log(details);
            // Manipular DOM con details
        });
    });
});
```

---

##  Checklist de Implementación

- [ ] Crear estructura HTML con secciones para cada API
- [ ] Incluir jQuery desde CDN
- [ ] Implementar función para Rick and Morty API
- [ ] Implementar función para Pokémon API
- [ ] Crear templates HTML dinámicos
- [ ] Agregar estilos CSS
- [ ] Implementar paginación
- [ ] Implementar filtros/búsqueda
- [ ] Agregar loading states
- [ ] Manejar errores
- [ ] Testing en navegador
