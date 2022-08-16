import { createConnection, getConnection, getConnectionManager, Connection } from 'typeorm';
import { GuessEntity, PlayerEntity } from '../../src/entities';
import { DbConnectionOptions } from './dbTesting.module';

export const initTestDataset = async () => {
  let connection: Connection;

  if (!getConnectionManager().has('default')) {
    connection = await createConnection(DbConnectionOptions);
  } else {
    connection = getConnection();
  }
  const entityManager = connection.createEntityManager();

  const playerOneScore = {
    value: 0,
  };
  const playerTwoScore = {
    value: 10,
  };

  const playerOneEntity = {
    id: 1,
    identifier: 'abc-123',
    score: playerOneScore,
  };

  const playerTwoEntity = {
    id: 2,
    identifier: 'def-123',
    score: playerTwoScore,
  };

  /* players */
  await entityManager.save(PlayerEntity, playerOneEntity);
  await entityManager.save(PlayerEntity, playerTwoEntity);

  /* player guesses */
  await entityManager.save(GuessEntity, {
    id: 1,
    guess: 1,
    player: playerOneEntity,
  });

  await entityManager.save(GuessEntity, {
    id: 2,
    guess: -1,
    player: playerOneEntity,
  });
};
