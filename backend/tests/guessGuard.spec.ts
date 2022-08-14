import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { GuessGuard } from '../src/guards/GuessGuard';
import { DatabaseService } from '../src/services/database.service';
import { createMock } from '@golevelup/nestjs-testing';

describe('Guards', () => {
  let guard: GuessGuard;
  let reflector: Reflector;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuessGuard,
        {
          provide: Reflector,
          useValue: {
            constructor: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: DatabaseService,
          useValue: {
            hasCurrentGuess: (playerId: number) => {
              const ids = {
                '1': true,
                '2': false,
              };
              return ids[playerId];
            },
          },
        },
      ],
    }).compile();

    guard = module.get<GuessGuard>(GuessGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it(`should throw GUESS_IN_PROGRESS for playerId 1`, async () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      body: {
        playerId: 1,
        guess: 1,
        initialPrice: 25000
      },
      path: '/guess',
      method: 'POST'
    });

    await expect(guard.canActivate(mockContext)).rejects.toThrowError('GUESS_IN_PROGRESS');
  });

  it(`should throw  for playerId null`, async () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      body: {
        playerId: null,
        guess: 1,
        initialPrice: 25000
      },
      path: '/guess',
      method: 'POST'
    });

    await expect(guard.canActivate(mockContext)).rejects.toThrowError('GUESS_REQUIRES_PLAYER_ID');
  });

  it(`should throw GUESS_IN_PROGRESS for invalid guess`, async () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      body: {
        playerId: 1,
        guess: null,
        initialPrice: 25000
      },
      path: '/guess',
      method: 'POST'
    });

    await expect(guard.canActivate(mockContext)).rejects.toThrowError('GUESS_INVALID');
  });

  it(`should throw GUESS_IN_PROGRESS for invalid initialPrice`, async () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      body: {
        initialPrice: 0,
        playerId: 1,
        guess: 1
      },
      path: '/guess',
      method: 'POST'
    });

    await expect(guard.canActivate(mockContext)).rejects.toThrowError('GUESS_INVALID_INITIAL_PRICE');
  });

  it(`should return true (ok) for playerId 2`, async () => {
    const mockContext = createMock<ExecutionContext>();
    mockContext.switchToHttp().getRequest.mockReturnValue({
      body: {
        playerId: 2,
        guess: 1,
        initialPrice: 25000
      },
      path: '/guess',
      method: 'POST'
    });

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
  });
});
