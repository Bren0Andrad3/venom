const venom = require('venom-bot');

jest.mock('venom-bot');

//sendText

it('should send a text message', async () => {
  const mockClient = {
    sendText: jest.fn().mockResolvedValue('Message sent successfully'),
  };

  venom.create.mockResolvedValue(mockClient);

  const sender = 'sender-id';
  const message = 'Hello, world!';

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.sendText(sender, message);

  expect(mockClient.sendText).toHaveBeenCalledWith(sender, message);
  expect(result).toBe('Message sent successfully');
});

//isLogged

it('should return true when user is logged in', async () => {
  const mockClient = {
    isLogged: jest.fn().mockResolvedValue(true),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.isLogged();

  expect(mockClient.isLogged).toHaveBeenCalled();
  expect(result).toBe(true);
});

it('should return false when user is not logged in', async () => {
  const mockClient = {
    isLogged: jest.fn().mockResolvedValue(false),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.isLogged();

  expect(mockClient.isLogged).toHaveBeenCalled();
  expect(result).toBe(false);
});

//browserClose

it('should close the browser', async () => {
  const mockClient = {
    browserClose: jest.fn().mockResolvedValue(true),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.browserClose();

  expect(mockClient.browserClose).toHaveBeenCalled();
  expect(result).toBe(true);
});

it('should handle browser close failure', async () => {
  const mockClient = {
    browserClose: jest.fn().mockRejectedValue(new Error('Failed to close browser')),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  await expect(client.browserClose()).rejects.toThrowError('Failed to close browser');
  expect(mockClient.browserClose).toHaveBeenCalled();
});

//onMessage

it('should handle incoming messages', async () => {
  const mockClient = {
    onMessage: jest.fn(),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const message = {
    body: 'Hello',
    isGroupMsg: false,
    from: 'sender-id',
  };

  client.onMessage(message);

  expect(mockClient.onMessage).toHaveBeenCalledWith(message);
});

//close

it('should close the session', async () => {
  const mockClient = {
    close: jest.fn().mockResolvedValue('Session closed successfully'),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.close();

  expect(mockClient.close).toHaveBeenCalled();
  expect(result).toBe('Session closed successfully');
});

//getBatteryLevel

it('should retrieve the battery level', async () => {
  const mockClient = {
    getBatteryLevel: jest.fn().mockResolvedValue(80),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.getBatteryLevel();

  expect(mockClient.getBatteryLevel).toHaveBeenCalled();
  expect(result).toBe(80);
});

//getProfilePic


it('should retrieve the profile picture', async () => {
  const mockClient = {
    getProfilePic: jest.fn().mockResolvedValue('https://example.com/profile-pic.jpg'),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.getProfilePic();

  expect(mockClient.getProfilePic).toHaveBeenCalled();
  expect(result).toBe('https://example.com/profile-pic.jpg');
});

//getAllChats


it('should retrieve all chats', async () => {
  const mockClient = {
    getAllChats: jest.fn().mockResolvedValue(['chat1', 'chat2', 'chat3']),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.getAllChats();

  expect(mockClient.getAllChats).toHaveBeenCalled();
  expect(result).toEqual(['chat1', 'chat2', 'chat3']);
});

//getAllChats


it('should retrieve unread messages', async () => {
  const mockClient = {
    getUnreadMessages: jest.fn().mockResolvedValue(['message1', 'message2']),
  };

  venom.create.mockResolvedValue(mockClient);

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.getUnreadMessages();

  expect(mockClient.getUnreadMessages).toHaveBeenCalled();
  expect(result).toEqual(['message1', 'message2']);
});

//sendImage

it('should send an image', async () => {
  const mockClient = {
    sendImage: jest.fn().mockResolvedValue('Image sent successfully'),
  };

  venom.create.mockResolvedValue(mockClient);

  const sender = 'sender-id';
  const image = 'https://example.com/image.jpg';

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.sendImage(sender, image);

  expect(mockClient.sendImage).toHaveBeenCalledWith(sender, image);
  expect(result).toBe('Image sent successfully');
});

//getGroupMembers


it('should retrieve group members', async () => {
  const mockClient = {
    getGroupMembers: jest.fn().mockResolvedValue(['member1', 'member2', 'member3']),
  };

  venom.create.mockResolvedValue(mockClient);

  const groupId = 'group-id';

  const client = await venom.create({
    session: 'session-name',
  });

  const result = await client.getGroupMembers(groupId);

  expect(mockClient.getGroupMembers).toHaveBeenCalledWith(groupId);
  expect(result).toEqual(['member1', 'member2', 'member3']);
});





