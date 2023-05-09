import { UserModel } from '../model'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateLocalUsers1683562636793 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(UserModel)
        const users = await userRepository.find()
        for (const user of users) {
            if (
                !user.username.startsWith('tui:') &&
                !user.username.startsWith('local:')
            ) {
                user.username = `local:${user.username}`
                await userRepository.save(user)
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(UserModel)
        const users = await userRepository.find()
        for (const user of users) {
            if (user.username.startsWith('local:')) {
                user.username = user.username.replace('local:', '')
                await userRepository.save(user)
            }
        }
    }
}
