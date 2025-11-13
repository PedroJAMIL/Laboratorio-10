let rmCurrentPage = 1;
let pkCurrentOffset = 0;
let explorers = [];

const ranks = ["Capitán Dimensional", "Explorador Elite", "Guardián del Portal", "Viajero Temporal", "Cazador de Anomalías"];
const descriptions = ["Experto en navegación entre dimensiones", "Mantiene el equilibrio entre universos", "Detecta fracturas dimensionales", "Registra nuevas especies", "Veterano de 500+ misiones"];

$(document).ready(function() {
    loadRickAndMorty();
    loadPokemon();
    loadExplorers(10);
    
    $('#rmSearchBtn').click(function() {
        rmCurrentPage = 1;
        loadRickAndMorty();
    });
    
    $('#rmNameFilter').keypress(function(e) {
        if (e.which === 13) {
            rmCurrentPage = 1;
            loadRickAndMorty();
        }
    });
    
    $('#pkSearchBtn').click(function() {
        loadPokemon();
    });
    
    $('#pkNameFilter').keypress(function(e) {
        if (e.which === 13) {
            loadPokemon();
        }
    });
    
    $('#recruitBtn').click(function() {
        loadExplorers(1);
    });
    
    $('#recruitMultipleBtn').click(function() {
        loadExplorers(5);
    });
});

function loadRickAndMorty() {
    $('#rmLoading').show();
    $('#rmCharacters').hide();
    
    let url = 'https://rickandmortyapi.com/api/character/?page=' + rmCurrentPage;
    let name = $('#rmNameFilter').val();
    let status = $('#rmStatusFilter').val();
    
    if (name) url += '&name=' + name;
    if (status) url += '&status=' + status;
    
    $.get(url, function(data) {
        $('#rmTotal').text(data.info.count);
        $('#rmCharacters').empty();
        
        $.each(data.results, function(index, character) {
            let card = '<div class="col"><div class="card character-card h-100">' +
                '<img src="' + character.image + '" class="card-img-top">' +
                '<div class="card-body">' +
                '<h5>' + character.name + '</h5>' +
                '<p><small>Universo: Rick and Morty</small></p>' +
                '</div></div></div>';
            
            let $card = $(card);
            $card.click(function() {
                showModal(character, 'Rick and Morty');
            });
            $('#rmCharacters').append($card);
        });
        
        renderRMPagination(data.info);
        $('#rmLoading').hide();
        $('#rmCharacters').show();
    }).fail(function() {
        $('#rmLoading').hide();
        alert('Error al cargar personajes');
    });
}

function renderRMPagination(info) {
    $('#rmPagination').empty();
    
    if (info.prev) {
        $('#rmPagination').append('<li class="page-item"><a class="page-link" href="#" onclick="rmCurrentPage--; loadRickAndMorty(); return false;">Anterior</a></li>');
    }
    
    $('#rmPagination').append('<li class="page-item active"><span class="page-link">' + rmCurrentPage + '</span></li>');
    
    if (info.next) {
        $('#rmPagination').append('<li class="page-item"><a class="page-link" href="#" onclick="rmCurrentPage++; loadRickAndMorty(); return false;">Siguiente</a></li>');
    }
}

function loadPokemon() {
    $('#pkLoading').show();
    $('#pkCharacters').hide();
    
    let name = $('#pkNameFilter').val().toLowerCase();
    
    if (name) {
        $.get('https://pokeapi.co/api/v2/pokemon/' + name, function(pokemon) {
            $('#pkTotal').text('1');
            $('#pkCharacters').empty();
            showPokemon(pokemon);
            $('#pkPagination').empty();
            $('#pkLoading').hide();
            $('#pkCharacters').show();
        }).fail(function() {
            alert('Pokémon no encontrado');
            $('#pkLoading').hide();
        });
    } else {
        $.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=' + pkCurrentOffset, function(data) {
            $('#pkTotal').text(data.count);
            $('#pkCharacters').empty();
            
            $.each(data.results, function(index, pokemon) {
                $.get(pokemon.url, function(details) {
                    showPokemon(details);
                });
            });
            
            renderPKPagination(data);
            $('#pkLoading').hide();
            $('#pkCharacters').show();
        });
    }
}

function showPokemon(pokemon) {
    let imgUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    let card = '<div class="col"><div class="card character-card h-100">' +
        '<img src="' + imgUrl + '" class="card-img-top">' +
        '<div class="card-body">' +
        '<h5>' + name + '</h5>' +
        '<p><small>Universo: Pokémon</small></p>' +
        '</div></div></div>';
    
    let $card = $(card);
    $card.click(function() {
        showModal(pokemon, 'Pokémon');
    });
    $('#pkCharacters').append($card);
}

function renderPKPagination(data) {
    $('#pkPagination').empty();
    
    if (data.previous) {
        $('#pkPagination').append('<li class="page-item"><a class="page-link" href="#" onclick="pkCurrentOffset -= 20; loadPokemon(); return false;">Anterior</a></li>');
    }
    
    let page = (pkCurrentOffset / 20) + 1;
    $('#pkPagination').append('<li class="page-item active"><span class="page-link">' + page + '</span></li>');
    
    if (data.next) {
        $('#pkPagination').append('<li class="page-item"><a class="page-link" href="#" onclick="pkCurrentOffset += 20; loadPokemon(); return false;">Siguiente</a></li>');
    }
}

function loadExplorers(count) {
    $('#explorerLoading').show();
    
    $.get('https://randomuser.me/api/?results=' + count, function(data) {
        $.each(data.results, function(index, user) {
            let rank = ranks[Math.floor(Math.random() * ranks.length)];
            let desc = descriptions[Math.floor(Math.random() * descriptions.length)];
            
            let agent = {
                id: user.login.uuid,
                photo: user.picture.large,
                name: user.name.first + ' ' + user.name.last,
                country: user.location.country,
                email: user.email,
                rank: rank,
                description: desc,
                data: user
            };
            
            explorers.push(agent);
            
            let card = '<div class="col" id="agent-' + agent.id + '">' +
                '<div class="card agent-card h-100">' +
                '<div class="card-body text-center">' +
                '<img src="' + agent.photo + '" class="mb-3">' +
                '<h5>' + agent.name + '</h5>' +
                '<p><strong class="text-primary">' + agent.rank + '</strong><br>' +
                '<small>' + agent.description + '</small></p>' +
                '<hr><p><i class="fas fa-flag"></i> ' + agent.country + '<br>' +
                '<i class="fas fa-envelope"></i> ' + agent.email + '</p>' +
                '<button class="btn btn-sm btn-danger" onclick="removeAgent(\'' + agent.id + '\')">Eliminar</button>' +
                '</div></div></div>';
            
            let $card = $(card);
            $card.find('.card').click(function(e) {
                if (!$(e.target).is('button')) {
                    showAgentModal(agent);
                }
            });
            
            $('#explorerAgents').append($card);
        });
        
        $('#explorerTotal').text(explorers.length);
        $('#explorerLoading').hide();
    });
}

function removeAgent(id) {
    explorers = explorers.filter(function(a) {
        return a.id !== id;
    });
    $('#agent-' + id).fadeOut(300, function() {
        $(this).remove();
        $('#explorerTotal').text(explorers.length);
    });
}

function showModal(data, universe) {
    $('#modalTitle').text(data.name + ' - ' + universe);
    $('#modalBody').html('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
    new bootstrap.Modal($('#detailModal')).show();
}

function showAgentModal(agent) {
    let user = agent.data;
    $('#modalTitle').text('Explorador - ' + agent.name);
    
    let html = '<div class="row">' +
        '<div class="col-md-4 text-center">' +
        '<img src="' + user.picture.large + '" class="img-fluid rounded-circle mb-3">' +
        '<h4>' + agent.name + '</h4>' +
        '<p class="text-primary"><strong>' + agent.rank + '</strong></p>' +
        '</div>' +
        '<div class="col-md-8">' +
        '<h5>Información</h5>' +
        '<p><strong>Edad:</strong> ' + user.dob.age + ' años</p>' +
        '<p><strong>Género:</strong> ' + (user.gender === 'male' ? 'Masculino' : 'Femenino') + '</p>' +
        '<p><strong>Email:</strong> ' + user.email + '</p>' +
        '<p><strong>Teléfono:</strong> ' + user.phone + '</p>' +
        '<h5 class="mt-3">Ubicación</h5>' +
        '<p><strong>País:</strong> ' + user.location.country + '</p>' +
        '<p><strong>Ciudad:</strong> ' + user.location.city + '</p>' +
        '<p><strong>Dirección:</strong> ' + user.location.street.number + ' ' + user.location.street.name + '</p>' +
        '<h5 class="mt-3">Explorador</h5>' +
        '<p>' + agent.description + '</p>' +
        '</div></div>';
    
    $('#modalBody').html(html);
    new bootstrap.Modal($('#detailModal')).show();
}
