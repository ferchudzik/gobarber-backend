# Recuperação de Senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em ambiente de prod;
- O envio de e-mails deve acontecer em segundo plano;

**Regras de Negócio**

- O link enviado por e-mail para resetar senha deve expirar em 30min;
- O usuário precisa confirmar a nova senha ao resetar a senha antiga;

# Atualização de Perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**Requisitos Não Funcionais**

**Regras de Negócio**

- O usuário não pode alterar seu e-mail para um outro já utilizado;
- Para atualizar a senha, o usuário deve informar a antiga e confirmar a nova senha;

# Painel do Prestador de Serviços

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O usuário prestador de serviço deve receber uma notificação sempre que houver um novo agendamento;
- O usuário prestador de serviço deve poder visualizar as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do usuário prestador de serviço devem ser armazenados em cache;
- As notificações do usuário prestador de serviço devem ser armazenadas no MongoDB;
- As notificações do usuário prestador de serviço devem ser enviadas em tempo real utilizando o Socket.io;

**Regras de Negócio**

- A notificação deve ter um status de lida ou não lida para controle do usuário prestador de serviço;

# Agendamento de Serviços

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar todos os dias de um mês com pelo menos um horário disponível de um prestador de serviço;
- O usuário deve poder listar todos os horários disponíveis em um dia de um prestador de serviço;
- O usuário deve poder realizar um novo agendamento com um prestador de serviço;

**Requisitos Não Funcionais**

- A listagem de prestadores de serviços deve ser armazenada em cache;

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre às 8h e 18h (Primeiro 8h e último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário passado;
- O usuário não pode agendar serviços consigo mesmo;
