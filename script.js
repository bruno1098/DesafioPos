document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const names = [];
        for (let i = 1; i <= 5; i++) {
            const nameValue = document.querySelector(`#nome${i}`).value.trim();
            if (nameValue) {
                names.push(nameValue);
            }
        }
        
        const message = document.querySelector('#historia').value.trim();
        
        if (names.length === 0 || !message) {
            alert('Por favor, preencha pelo menos um nome e a história do grupo.');
            return;
        }

        const dados = {
            names,
            message
        };
        
        console.log('Dados que serão enviados:', dados);
        
        try {
            console.log('Iniciando envio...');
            const response = await fetch('https://fsdt-contact.onrender.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            
            const responseData = await response.json();
            console.log('Resposta do servidor:', responseData);
            
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            
            for (let i = 1; i <= 5; i++) {
                document.querySelector(`#nome${i}`).value = '';
            }
            document.querySelector('#historia').value = '';
            
            alert('Informações enviadas com sucesso!');
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Ocorreu um erro ao enviar as informações. Por favor, tente novamente.');
        }
    });
});
