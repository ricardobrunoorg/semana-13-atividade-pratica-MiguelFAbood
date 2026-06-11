const apiUrl = 'http://localhost:3000/comunidades';

async function fetchItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Falha ao buscar os dados da API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro no fetchItems:", error);
        return [];
    }
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${item.imagem}" alt="${item.titulo}" class="card-img">
        <div class="card-content">
            <span class="badge">${item.categoria}</span>
            <span class="badge access">${item.acesso}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descricaoCurta}</p>
            <a href="details.html?id=${item.id}" class="btn-detalhes">Ver detalhes</a>
        </div>
    `;
    
    return card;
}

function renderCards(items) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; 

    if (items.length === 0) {
        container.innerHTML = '<p>Nenhuma comunidade encontrada ou erro no servidor.</p>';
        return;
    }

    items.forEach(item => {
        const cardElement = createCard(item);
        container.appendChild(cardElement);
    });
}

async function init() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '<p>Carregando comunidades...</p>';
    
    const items = await fetchItems();
    renderCards(items);
}

document.addEventListener('DOMContentLoaded', init);