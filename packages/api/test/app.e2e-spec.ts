import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { RolesModule } from '../src/roles/roles.module';
import { StructuresModule } from '../src/structures/structures.module';
import { AreasModule } from '../src/areas/areas.module';
import { LevelsModule } from '../src/levels/levels.module';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';

describe('Setup Test Cases', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5432,
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Geo IAM!');
  });

  // Levels test records

  it('/POST levels: create L0', () => {
    const createLevel = {
      level: 0,
      name: 'suburb',
    };
    return request(app.getHttpServer())
      .post('/levels')
      .send(createLevel)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createLevel);
      });
  });

  it('/POST levels: create L1', () => {
    const createLevel = {
      level: 1,
      name: 'city',
    };
    return request(app.getHttpServer())
      .post('/levels')
      .send(createLevel)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createLevel);
      });
  });

  it('/POST levels: create L2', () => {
    const createLevel = {
      level: 2,
      name: 'national',
    };
    return request(app.getHttpServer())
      .post('/levels')
      .send(createLevel)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createLevel);
      });
  });

  // Areas test records

  it('/POST areas: create SA', () => {
    const createArea = {
      areaid: 1,
      level: 2,
      name: 'South Africa',
      code: 'RSA',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create CPT', () => {
    const createArea = {
      areaid: 2,
      level: 1,
      name: 'Cape Town',
      code: 'CPT',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create DBN', () => {
    const createArea = {
      areaid: 3,
      level: 1,
      name: 'Durban',
      code: 'DBN',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create JHB', () => {
    const createArea = {
      areaid: 4,
      level: 1,
      name: 'Johannesburg',
      code: 'JHB',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create Sea Point', () => {
    const createArea = {
      areaid: 5,
      level: 0,
      name: 'Sea Point',
      code: 'C1',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create Clifton', () => {
    const createArea = {
      areaid: 6,
      level: 0,
      name: 'Clifton',
      code: 'C2',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create Newlands', () => {
    const createArea = {
      areaid: 7,
      level: 0,
      name: 'Newlands',
      code: 'CPT',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create Sandton', () => {
    const createArea = {
      areaid: 8,
      level: 0,
      name: 'Sandton',
      code: 'J1',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  it('/POST areas: create Musgrave', () => {
    const createArea = {
      areaid: 9,
      level: 0,
      name: 'Musgrave',
      code: 'D1',
      coordinates: '',
    };
    return request(app.getHttpServer())
      .post('/areas')
      .send(createArea)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createArea);
      });
  });

  // Structures test case

  it('/POST structures: create Top-RSA', () => {
    const createStructure = {
      structureid: 1,
      parent: null,
      child: 1,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create RSA->CPT', () => {
    const createStructure = {
      structureid: 2,
      parent: 1,
      child: 2,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create RSA->CPT', () => {
    const createStructure = {
      structureid: 3,
      parent: 1,
      child: 2,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create RSA->DBN', () => {
    const createStructure = {
      structureid: 4,
      parent: 1,
      child: 3,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create RSA->JHB', () => {
    const createStructure = {
      structureid: 5,
      parent: 1,
      child: 4,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create CPT->C1', () => {
    const createStructure = {
      structureid: 6,
      parent: 2,
      child: 5,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create CPT->C2', () => {
    const createStructure = {
      structureid: 7,
      parent: 2,
      child: 6,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create CPT->C3', () => {
    const createStructure = {
      structureid: 8,
      parent: 2,
      child: 7,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create DBN->D1', () => {
    const createStructure = {
      structureid: 9,
      parent: 3,
      child: 9,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  it('/POST structures: create JHB->J1', () => {
    const createStructure = {
      structureid: 10,
      parent: 4,
      child: 8,
    };
    return request(app.getHttpServer())
      .post('/structures')
      .send(createStructure)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createStructure);
      });
  });

  // Users test case

  it('/POST users: create user A', () => {
    const createUser = {
      userid: 1,
      name: 'User A',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createUser);
      });
  });

  it('/POST users: create user B', () => {
    const createUser = {
      userid: 2,
      name: 'User B',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createUser);
      });
  });

  it('/POST users: create user C', () => {
    const createUser = {
      userid: 3,
      name: 'User C',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(createUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createUser);
      });
  });

  // Roles test case!

  it('/POST roles: create role user A -> CPT', () => {
    const createRole = {
      userid: 1,
      structureid: 2,
    };
    const createRoleResponse = {
      roleid: 1,
    };
    return request(app.getHttpServer())
      .post('/roles')
      .send(createRole)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createRoleResponse);
      });
  });

  it('/POST roles: create role user A -> DBN-D1', () => {
    const createRole = {
      userid: 1,
      structureid: 9,
    };
    const createRoleResponse = {
      roleid: 2,
    };
    return request(app.getHttpServer())
      .post('/roles')
      .send(createRole)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createRoleResponse);
      });
  });

  it('/POST roles: create role user B -> CPT-C2', () => {
    const createRole = {
      userid: 2,
      structureid: 7,
    };
    const createRoleResponse = {
      roleid: 3,
    };
    return request(app.getHttpServer())
      .post('/roles')
      .send(createRole)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createRoleResponse);
      });
  });

  it('/POST roles: create role user B -> DBN', () => {
    const createRole = {
      userid: 2,
      structureid: 4,
    };
    const createRoleResponse = {
      roleid: 4,
    };
    return request(app.getHttpServer())
      .post('/roles')
      .send(createRole)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createRoleResponse);
      });
  });

  it('/POST roles: create role user C -> RSA', () => {
    const createRole = {
      userid: 3,
      structureid: 1,
    };
    const createRoleResponse = {
      roleid: 5,
    };
    return request(app.getHttpServer())
      .post('/roles')
      .send(createRole)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual(createRoleResponse);
      });
  });
});
