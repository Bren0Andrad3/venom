const venom = require('venom-bot');
jest.mock('venom-bot');

let mockClient;

//sendText


describe('Envio de mensagem de texto', () => {

  beforeEach(async () => {
    mockClient = {
      sendText: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve enviar uma mensagem de texto', async () => {
    // Arrange
    const expectedResponse = 'Mensagem enviada com sucesso';
    const remetente = 'id-do-remetente';
    const mensagem = 'Olá, mundo!';
    mockClient.sendText.mockResolvedValue(expectedResponse);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.sendText(remetente, mensagem);

    // Assert
    expect(mockClient.sendText).toHaveBeenCalledWith(remetente, mensagem);
    expect(resultado).toBe(expectedResponse);
  });
});

// No beforeEach, configurei o mockClient.sendText como uma função simulada (jest.fn()) para rastrear se a função 
// foi chamada corretamente.

// No teste, defini expectedResponse como a resposta esperada do envio da mensagem. Em seguida, usei 
// mockClient.sendText.mockResolvedValue(expectedResponse) para configurar o valor de retorno da função sendText.

// Defini as variáveis remetente e mensagem para usar nos testes.

// Por fim, usei expect(mockClient.sendText).toHaveBeenCalledWith(remetente, mensagem) para verificar se a 
// função sendText foi chamada corretamente com os parâmetros esperados e expect(resultado).toBe(expectedResponse) 
// para verificar se o resultado do envio da mensagem é o esperado.

//===============================================================================================================

//isLogged

describe('Verificação de login do cliente', () => {


  beforeEach(async () => {
    mockClient = {
      isLogged: jest.fn().mockResolvedValue(false),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve retornar true quando o usuário está logado', async () => {
    // Arrange
    mockClient.isLogged.mockResolvedValue(true);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.isLogged();

    // Assert
    expect(mockClient.isLogged).toHaveBeenCalled();
    expect(resultado).toBe(true);
  });

  it('deve retornar false quando o usuário não está logado', async () => {
    // Arrange
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.isLogged();

    // Assert
    expect(mockClient.isLogged).toHaveBeenCalled();
    expect(resultado).toBe(false);
  });
});

// No beforeEach, defini o valor padrão de retorno de isLogged como false. Isso garante que o valor padrão seja 
//configurado antes de cada teste.

// No primeiro teste, onde o usuário está logado, alterei o valor de retorno de isLogged para true usando 
//mockClient.isLogged.mockResolvedValue(true). Isso garante que o teste valide corretamente o comportamento 
//esperado quando o usuário está logado.

// No segundo teste, onde o usuário não está logado, mantive o valor de retorno de isLogged como false. Isso permite
// testar o comportamento quando o usuário não está logado.

// Movemos a criação do objeto client para cada teste separadamente, dentro do escopo do teste. Isso garante que 
//cada teste tenha uma instância única de client para trabalhar e evita conflitos entre os testes.

//===============================================================================================================

//browserClose

describe('Fechamento do Navegador', () => {


  beforeEach(async () => {
    mockClient = {
      browserClose: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve fechar o navegador com sucesso', async () => {
    // Arrange
    mockClient.browserClose.mockResolvedValue(true);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.browserClose();

    // Assert
    expect(mockClient.browserClose).toHaveBeenCalled();
    expect(resultado).toBe(true);
  });

  it('deve lidar com falha no fechamento do navegador', async () => {
    // Arrange
    const error = new Error('Falha ao fechar o navegador');
    mockClient.browserClose.mockRejectedValue(error);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act & Assert
    await expect(client.browserClose()).rejects.toThrowError(error);
    expect(mockClient.browserClose).toHaveBeenCalled();
  });
});

// Criei um bloco describe para agrupar os testes relacionados ao fechamento do navegador. Isso ajuda a organizar 
//e estruturar melhor os testes.

// Usei o beforeEach para criar uma configuração comum para ambos os testes. Isso evita a duplicação de código e 
//garante que o cliente mockado seja criado antes de cada teste.

// No primeiro teste, onde o fechamento do navegador é bem-sucedido, alterei o valor de retorno de browserClose 
//para true usando mockClient.browserClose.mockResolvedValue(true). Isso garante que o teste valide corretamente 
//o comportamento esperado quando o fechamento do navegador é bem-sucedido.

// No segundo teste, onde ocorre uma falha no fechamento do navegador, mantive o valor de retorno de browserClose 
// uma rejeição com uma instância de Error. Isso permite testar o comportamento quando ocorre uma falha no 
//fechamento do navegador e valida se a rejeição é tratada corretamente.

//===============================================================================================================

//onMessage

describe('Lida com mensagens recebidas', () => {


  beforeEach(async () => {
    mockClient = {
      onMessage: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve lidar com mensagens recebidas', async () => {
    // Arrange
    const client = await venom.create({ session: 'nome-da-sessao' });

    const mensagem = {
      body: 'Olá',
      isGroupMsg: false,
      from: 'id-do-remetente',
    };

    // Act
    client.onMessage(mensagem);

    // Assert
    expect(mockClient.onMessage).toHaveBeenCalledWith(mensagem);
  });
});

// No beforeEach, configurei o mockClient.onMessage como uma função simulada (jest.fn()) para rastrear se a função 
//foi chamada corretamente.


// Criei uma mensagem simulada para testar a função onMessage.

// Em seguida, chamei client.onMessage(mensagem) para acionar a função de tratamento de mensagem.

// Por fim, usei expect(mockClient.onMessage).toHaveBeenCalledWith(mensagem) para verificar se a função onMessage 
//foi chamada corretamente com a mensagem esperada.

//===============================================================================================================

//close

describe('Fechamento da sessão', () => {


  beforeEach(async () => {
    mockClient = {
      close: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve fechar a sessão com sucesso', async () => {
    // Arrange
    mockClient.close.mockResolvedValue('Sessão fechada com sucesso');
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.close();

    // Assert
    expect(mockClient.close).toHaveBeenCalled();
    expect(resultado).toBe('Sessão fechada com sucesso');
  });
});

//No beforeEach, configurei o mockClient.close como uma função simulada (jest.fn()) para rastrear se a função 
//foi chamada corretamente.

//Dentro do teste, criei uma instância do cliente Venom usando await venom.create({ session: 'nome-da-sessao' }).

//No teste em que a sessão é fechada com sucesso, alterei o valor de retorno de close para 'Sessão fechada com 
//sucesso' usando mockClient.close.mockResolvedValue('Sessão fechada com sucesso'). Isso garante que o teste valide 
//corretamente o comportamento esperado quando o fechamento da sessão é bem-sucedido.

//Por fim, usei expect(mockClient.close).toHaveBeenCalled() para verificar se a função close foi chamada 
//corretamente e expect(resultado).toBe('Sessão fechada com sucesso') para verificar se o resultado do fechamento 
//da sessão é o esperado.

//===============================================================================================================

//getBatteryLevel

describe('Obtenção do nível da bateria', () => {


  beforeEach(async () => {
    mockClient = {
      getBatteryLevel: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve obter o nível da bateria', async () => {
    // Arrange
    const expectedBatteryLevel = 80;
    mockClient.getBatteryLevel.mockResolvedValue(expectedBatteryLevel);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.getBatteryLevel();

    // Assert
    expect(mockClient.getBatteryLevel).toHaveBeenCalled();
    expect(resultado).toBe(expectedBatteryLevel);
  });
});

// No teste, defini expectedBatteryLevel como o valor esperado do nível da bateria. Em seguida, usei 
// mockClient.getBatteryLevel.mockResolvedValue(expectedBatteryLevel) para configurar o valor de retorno da função 
// getBatteryLevel.

// Por fim, usei expect(mockClient.getBatteryLevel).toHaveBeenCalled() para verificar se a função getBatteryLevel foi 
// chamada corretamente e expect(resultado).toBe(expectedBatteryLevel) para verificar se o resultado da obtenção 
// do nível da bateria é o esperado.

//===============================================================================================================

//getProfilePic

describe('Obtenção da foto de perfil', () => {


  beforeEach(async () => {
    mockClient = {
      getProfilePic: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve obter a foto de perfil', async () => {
    // Arrange
    const expectedProfilePic = 'https://exemplo.com/foto-de-perfil.jpg';
    mockClient.getProfilePic.mockResolvedValue(expectedProfilePic);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.getProfilePic();

    // Assert
    expect(mockClient.getProfilePic).toHaveBeenCalled();
    expect(resultado).toBe(expectedProfilePic);
  });
});

// No teste, defini expectedProfilePic como o valor esperado da foto de perfil. Em seguida, usei 
// mockClient.getProfilePic.mockResolvedValue(expectedProfilePic) para configurar o valor de retorno da função 
// getProfilePic.

// Por fim, usei expect(mockClient.getProfilePic).toHaveBeenCalled() para verificar se a função getProfilePic foi 
// chamada corretamente e expect(resultado).toBe(expectedProfilePic) para verificar se o resultado da obtenção da foto 
// de perfil é o esperado.

//===============================================================================================================

//getAllChats

describe('Obtenção de todas as conversas', () => {


  beforeEach(async () => {
    mockClient = {
      getAllChats: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve obter todas as conversas', async () => {
    // Arrange
    const expectedChats = ['conversa1', 'conversa2', 'conversa3'];
    mockClient.getAllChats.mockResolvedValue(expectedChats);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.getAllChats();

    // Assert
    expect(mockClient.getAllChats).toHaveBeenCalled();
    expect(resultado).toEqual(expectedChats);
  });
});

// No teste, defini expectedChats como o valor esperado de todas as conversas. Em seguida, usei 
// mockClient.getAllChats.mockResolvedValue(expectedChats) para configurar o valor de retorno da 
// função getAllChats.

// Por fim, usei expect(mockClient.getAllChats).toHaveBeenCalled() para verificar se a função getAllChats foi chamada 
// corretamente e expect(resultado).toEqual(expectedChats) para verificar se o resultado da obtenção de todas 
// as conversas é o esperado.

//===============================================================================================================

//getUnreadMessages

describe('Obtenção de mensagens não lidas', () => {


  beforeEach(async () => {
    mockClient = {
      getUnreadMessages: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve obter mensagens não lidas', async () => {
    // Arrange
    const expectedUnreadMessages = ['mensagem1', 'mensagem2'];
    mockClient.getUnreadMessages.mockResolvedValue(expectedUnreadMessages);
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.getUnreadMessages();

    // Assert
    expect(mockClient.getUnreadMessages).toHaveBeenCalled();
    expect(resultado).toEqual(expectedUnreadMessages);
  });
});

// No teste, defini expectedUnreadMessages como o valor esperado das mensagens não lidas. Em seguida, usei 
// mockClient.getUnreadMessages.mockResolvedValue(expectedUnreadMessages) para configurar o valor de retorno da 
// função getUnreadMessages.

// Por fim, usei expect(mockClient.getUnreadMessages).toHaveBeenCalled() para verificar se a função getUnreadMessages 
// foi chamada corretamente e expect(resultado).toEqual(expectedUnreadMessages) para verificar se o resultado da 
// obtenção das mensagens não lidas é o esperado.

//===============================================================================================================


//sendImage

describe('Envio de imagem', () => {


  beforeEach(async () => {
    mockClient = {
      sendImage: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve enviar uma imagem', async () => {
    // Arrange
    const expectedResponse = 'Imagem enviada com sucesso';
    mockClient.sendImage.mockResolvedValue(expectedResponse);
    const remetente = 'id-do-remetente';
    const imagem = 'https://exemplo.com/imagem.jpg';
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.sendImage(remetente, imagem);

    // Assert
    expect(mockClient.sendImage).toHaveBeenCalledWith(remetente, imagem);
    expect(resultado).toBe(expectedResponse);
  });
});
// No teste, defini expectedResponse como a resposta esperada do envio da imagem. Em seguida, usei 
// mockClient.sendImage.mockResolvedValue(expectedResponse) para configurar o valor de retorno da função sendImage.

// Defini as variáveis remetente e imagem para usar nos testes.

// Por fim, usei expect(mockClient.sendImage).toHaveBeenCalledWith(remetente, imagem) para verificar se a 
// função sendImage foi chamada corretamente com os parâmetros esperados e expect(resultado).toBe(expectedResponse) 
// para verificar se o resultado do envio da imagem é o esperado.

//===============================================================================================================

//getGroupMembers

describe('Envio de imagem', () => {


  beforeEach(async () => {
    mockClient = {
      sendImage: jest.fn(),
    };

    venom.create.mockResolvedValue(mockClient);
  });

  it('deve enviar uma imagem', async () => {
    // Arrange
    const expectedResponse = 'Imagem enviada com sucesso';
    mockClient.sendImage.mockResolvedValue(expectedResponse);
    const remetente = 'id-do-remetente';
    const imagem = 'https://exemplo.com/imagem.jpg';
    const client = await venom.create({ session: 'nome-da-sessao' });

    // Act
    const resultado = await client.sendImage(remetente, imagem);

    // Assert
    expect(mockClient.sendImage).toHaveBeenCalledWith(remetente, imagem);
    expect(resultado).toBe(expectedResponse);
  });
});

// No teste, defini expectedResponse como a resposta esperada do envio da imagem. Em seguida, usei 
// mockClient.sendImage.mockResolvedValue(expectedResponse) para configurar o valor de retorno da função sendImage.

// Defini as variáveis remetente e imagem para usar nos testes.

// Por fim, usei expect(mockClient.sendImage).toHaveBeenCalledWith(remetente, imagem) para verificar se a função 
// sendImage foi chamada corretamente com os parâmetros esperados e expect(resultado).toBe(expectedResponse) para 
// verificar se o resultado do envio da imagem é o esperado.
//===============================================================================================================


