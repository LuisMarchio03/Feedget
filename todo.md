1. [server-feedget] Envia o feedback criado, para o serviço [server-view-feedback] via RabbitMQ

2. [server-view-feedback] Recebe o feedback criado, pelo [server-feedget] é da um push desse feedback no banco de dados do [server-view-feedback] (Cria o mesmo feedback, porem em outro DB)

3. [server-view-feedback] => Faz todas as leituras necessárias

4. [server-view-feedback-WEB] => Um mini painel de controle, para gerenciar os feedbacks (como se a equipe responsável pelos feedbacks, estivesse monitorando-os a todo o momento)

5. [server-view-feedback-WEB] => Tailwind / Acessibilidade / Responsividade / Next.js
