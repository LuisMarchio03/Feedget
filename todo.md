1.[OK] [server-feedget] Envia o feedback criado, para o serviço [server-view-feedback] via RabbitMQ

2.[OK] [server-view-feedback] Recebe o feedback criado, pelo [server-feedget] é da um push desse feedback no banco de dados do [server-view-feedback] (Cria o mesmo feedback, porem em outro DB)

3.[OK] [server-view-feedback] => Faz todas as leituras necessárias

4.[OK] [server] => 100% Coverage

5. [server-view-feedback-WEB] => Um mini painel de controle, para gerenciar os feedbacks (como se a equipe responsável pelos feedbacks, estivesse monitorando-os a todo o momento)

6. [server-view-feedback-WEB] => Tailwind / Acessibilidade / Responsividade / Next.js
