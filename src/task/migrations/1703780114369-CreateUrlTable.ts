import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUrlTable1703780114369 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
            new Table({
              name: 'url',
              columns:   [{
                name: 'url_id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },

              {
                name: 'url_original',
                type:'varchar',
                length:'100',

              },

              {
                name: 'url_shortened',
                type: 'varchar',
                length: '100',
              },
              {
                name: 'counter',
                type: 'int',
                length: '50',

              },
                  {
                      name: 'title',
                      type: 'varchar',
                      length: '100',

                  },
              {
                name: 'createdAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
              },
              {
                name: 'updatedAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
              },
              ],

              uniques: [{
                columnNames: ['url_original'],
              }],

            }),

        );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('url')
  }

}
