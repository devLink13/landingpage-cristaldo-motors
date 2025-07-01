//esperar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // pega o formulario de contato
    const formContato = document.getElementById('formContato');

    // se o formulario de contato existir
    if (formContato) {
        formContato.addEventListener('submit', (event) => {
            event.preventDefault(); // previne o envio padrão do formulário

            // Remove alertas anteriores
            const alertasAnteriores = formContato.querySelectorAll('.alert');
            alertasAnteriores.forEach(alerta => alerta.remove());

            // pegar os campos do formulario
            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // validação básica
            if (!nome || !telefone || !mensagem) {
                // inserir um alerta embaixo do botao de enviar mensagem
                const btnEnviar = document.getElementById('btnEnviar');
                const div_alert = document.createElement('div');
                div_alert.className = 'alert alert-danger mt-3 p-3 text-center';
                div_alert.innerHTML = `
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <span>Por favor preencha todos os campos obrigatórios.</span>
                `;
                btnEnviar.parentElement.insertAdjacentElement('afterend', div_alert);
                return;
            }

            // constrói a mensagem para o WhatsApp
            let textoWhatsApp = `🏍️ *NOVO CONTATO - CRISTALDO MOTORS*\n\n`;
            textoWhatsApp += `👤 *Nome:* ${nome}\n`;
            textoWhatsApp += `📱 *Telefone:* ${telefone}\n`;

            if (email) {
                textoWhatsApp += `📧 *E-mail:* ${email}\n`;
            }

            if (servico) {
                textoWhatsApp += `⚙️ *Serviço de Interesse:* ${servico}\n`;
            }

            textoWhatsApp += `\n💬 *Mensagem:*\n${mensagem}\n\n`;
            textoWhatsApp += `_Mensagem enviada através do site da Cristaldo Motors_`;

            // objeto de informações do contato da cristaldo motors
            const contatoCristaldo = {
                numeroWhatsApp: '5567996631209',
                urlWhatsApp: `https://wa.me/5567996631209?text=${encodeURIComponent(textoWhatsApp)}`
            }

            try { // tenta abrir o whatsapp com a mensagem

                const btnEnviar = document.getElementById('btnEnviar');
                const btnOriginal = btnEnviar.innerHTML;

                // feedback visual para o usuário
                btnEnviar.innerHTML = `
                    <div class="spinner-border spinner-border-sm me-2" role="status">
                        <span class="visually-hidden">Enviando...</span>
                    </div>
                `;
                btnEnviar.disabled = true;


                // feedback de sucesso após 1 segundo
                setTimeout(() => {
                    btnEnviar.innerHTML = `
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ABRINDO WHATSAPP!
                    `;
                    btnEnviar.classList.remove('btn-dark');
                    btnEnviar.classList.add('btn-success');

                    // observa o botão com a mensagem enviado e só depois de 500ms abre o whatsapp
                    setTimeout(() => {
                        // abre o whatsapp com a mensagem
                        window.open(contatoCristaldo.urlWhatsApp, '_blank');
                    }, 1000);

                }, 1000);

                // restaura o botão após 5 segundos
                setTimeout(() => {

                    btnEnviar.innerHTML = btnOriginal;
                    btnEnviar.classList.remove('btn-success');
                    btnEnviar.classList.add('btn-dark');
                    btnEnviar.disabled = false;
                }, 5000);



                // limpa o formulário após o envio
                formContato.reset();

            } catch (e) {
                // se houver um erro, exibe um alerta
                const btnEnviar = document.getElementById('btnEnviar');
                const div_alert = document.createElement('div');
                div_alert.className = 'alert alert-danger mt-3 p-3 text-center';
                div_alert.innerHTML = `
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <span>Erro ao abrir o WhatsApp. Por favor, tente novamente.</span>
                `;
                btnEnviar.parentElement.insertAdjacentElement('afterend', div_alert);

                // restaura o botão em caso de erro
                btnEnviar.innerHTML = `
                    <i class="bi bi-send-fill me-2"></i>
                    Enviar Mensagem
                `;
                btnEnviar.disabled = false;
            }

        })
    }
})