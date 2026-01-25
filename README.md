# Projeto

- Desafio
- Partidas
- Jogador
- Categorias

# Microsserviços

- Os microsserviços permitem a facilidade para implementação de novas features dentro de um domínio e forma exclusiva, separado por domínios.
- Autonomia para os componentes de modo que seja possível evoluir e publicar os serviços de forma independente
- Aumentar a capacidade de escalabilidade horizontal (capacidade de adição de mais nós/componentes) e balaceamento de carga
-

## Preocupações relevantes

- Agilidade no processo de CI CD
- Monitoramento de logs
- DevOps

## Outros tópicos para serem explorados

- Como centralizar os logs
- Como controlar todas as configurações de sistemas e ambientes
- Como monitorar os erros

## Transporters

Transporters: permite o transporte via HTTP request/response das informações dos microsservicos no nest

O nest abstrai a implementaçaõ do transporter, deixando invisível a implementação e liberando apenas umas intereface para implementação

### Tipos de nest transporters

Broker-based: redis, nats, rabbitMq, mqtt e kafka (integração com IOT)
point-to-point: tcp e gRPC

#### Broker-based:

desacoplar os componentes, eles se comunicam apenas com o broker e não tem conhecimento da implementação de outros componentes.
A única parte que é compartilhada entre eles é o protocolo de mensagens.

- Broker

- Broker Server: processo responsável para gerenciar PUBLICAÇÃO, assintura e entrega das mensagens para o componente específico (comunicação via interface)
- Broker client API: interface pelo qual é feita a comunicação com o Broker

#### Nomenclatura

Publish/Subscribe

- Event: tipos de mensagens que serão trocadas nesse modelo;
- Event emitter: componente que publica a mensagem - message publisher
- Event subscriber: componente registra interesse em um tópico
  Request/Response
- Requestor: componente que publica uma mensagem que pode ser registrada pelos outros componentes
- Responder: componente que se increve em um topic e será tratado como incoming request

# Arquitetura

api-gateway: resposável por fazer o roteamento das requests, authentication, cache, throttling e rate limiting

- RabbitMQ: broker
- Single Process:
  -> micro-admin-backend: categorias, jogadores
  -> micro-desafios: desafios, partidas
  -> micro-rankings: ranking
  -> micro-notificacoes
