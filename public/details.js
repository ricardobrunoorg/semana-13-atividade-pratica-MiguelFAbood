const apiUrl = 'http://localhost:3000/comunidades';

async function fetchItemDetails() {
    const container = document.getElementById('detalhes-container');
    
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        container.innerHTML = '<h2>Erro: ID não fornecido na URL.</h2><p>Volte para a Home e clique em um card válido.</p>';
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`);
        
        if (!response.ok) {
            throw new Error('Comunidade não encontrada.');
        }

        const item = await response.json();
        renderItemDetails(item, container);

    } catch (error) {
        container.innerHTML = `<h2>Oops! Algo deu errado.</h2><p>${error.message}</p>`;
    }
}

function renderItemDetails(item, container) {
    const tagsHtml = item.tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('');

    container.innerHTML = `
        <div class="detail-header">
            <img src="${item.imagem}" alt="${item.titulo}" class="detail-img">
            <div class="detail-title-info">
                <h2>${item.titulo}</h2>
                <div class="detail-badges">
                    <span class="badge">${item.categoria}</span>
                    <span class="badge access">${item.acesso}</span>
                </div>
            </div>
        </div>
        <div class="detail-body">
            <h3>Sobre a Comunidade</h3>
            <p class="full-desc">${item.descricaoCompleta}</p>
            
            <h3>Tags</h3>
            <div class="tags-container">
                ${tagsHtml}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', fetchItemDetails);